import * as dotenv from "dotenv";
dotenv.config();

import Token from "../models/Tokens.js";

/**
 * Finds the token from the database
 */
export async function getToken(uid) {
	try {
		const token = await Token.findOne({ uid: uid });
		return token;
	} catch (err) {
		throw err;
	}
}

/**
 * Creates a token using uid of user
 * @param {*} uid
 */
export async function createToken(uid) {
	try {
		const token = await Token.create({
			uid: uid,
		});
	} catch (err) {
		throw err;
	}
}

/**
 * Delete token from the database
 * @param {string} myToken
 * @returns {Promise<null>}
 */
export async function deleteToken(uid) {
	try {
		await Token.findOneAndDelete({ uid: uid });
		return true;
	} catch (err) {
		throw err;
	}
}
