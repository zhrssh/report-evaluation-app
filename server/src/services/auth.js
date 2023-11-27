import * as dotenv from "dotenv";
dotenv.config();

import User from "../models/Users.js";
import { generateToken } from "../utils/jwt.js";

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

		// Preps payload
		const payload = { uid: user._id, name: user.info?.name };

		// Generates a new token
		const accessToken = generateToken(payload, "access");
		const refreshToken = generateToken(payload, "refresh");

		return { accessToken, refreshToken };
	} catch (err) {
		throw err;
	}
}
