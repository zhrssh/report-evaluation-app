import * as dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

/**
 *
 * @param {*} payload
 * @param {String} type
 * @returns
 */
export function generateToken(payload, type = "access") {
	switch (type) {
		case "access":
			return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
				expiresIn: "24h",
			});
		case "refresh":
			return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
				expiresIn: "7d",
			});
		default:
			return null;
	}
}
