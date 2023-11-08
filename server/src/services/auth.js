import * as dotenv from "dotenv";
dotenv.config();

import User from "../models/Users.js";
import Token from "../models/Tokens.js";

import jwt from "jsonwebtoken";

export function verifyToken(token, type = "access") {
	try {
		if (token === null) {
			throw new Error("Token is null.");
		}

		try {
			switch (type) {
				case "access":
					jwt.verify({
						jwtString: token,
						secretOrPublicKey: process.env.ACCESS_TOKEN_SECRET,
					});
					break;
				case "refresh":
					jwt.verify({
						jwtString: token,
						secretOrPublicKey: process.env.REFRESH_TOKEN_SECRET,
					});
					break;
			}

			return;
		} catch (err) {
			throw err;
		}
	} catch (err) {
		throw err;
	}
}

/**
 * Verifies authenticity of the user.
 */
export async function login(email, password) {
	try {
		const user = await User.findOne({ email: email });

		// Compares the candidate password to the actual password from the database.
		user.comparePassword(password, function (err, isMatch) {
			if (err) {
				throw err;
			}

			if (!isMatch) throw new Error("Password is not matching.");
		});

		// Generates a new token
		const token = await Token.create({ uid: user._id });
		return token;
	} catch (err) {
		throw err;
	}
}
