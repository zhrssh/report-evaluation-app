import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const tokenSchema = new mongoose.Schema({
	uid: {
		type: String,
		required: true,
		unique: true,
	},
	accessToken: {
		type: String,
		unique: true,
	},
	refreshToken: {
		type: String,
		unique: true,
	},
	tokenType: {
		type: String,
		default: "Bearer",
	},
});

tokenSchema.post("save", function () {
	const user = this;

	// Generates new refresh token when the entry is new or not modified
	if (!user.isModified("uid")) {
		this.generateRefreshToken(user.uid);
		this.generateAccessToken(user.uid);
	}
});

tokenSchema.methods.compareRefreshToken = function (candidateToken, cb) {
	const user = this;
	if (user.refreshToken !== candidateToken)
		return cb(new Error("Token does not match."));
	cb(null, true);
};

tokenSchema.methods.generateAccessToken = function (uid, data) {
	const user = this;

	// Payload
	const payload = {
		uid: uid,
		...data,
	};

	// Generates a new token
	const newToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "24h",
	});

	user.accessToken = newToken;
	return newToken;
};

tokenSchema.methods.generateRefreshToken = function (uid, data) {
	const user = this;

	// Payload
	const payload = {
		uid: uid,
		...data,
	};

	// Generates a new token
	const newToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "7d",
	});

	user.refreshToken = newToken;
	return newToken;
};

// Create a model from schema
const Token = mongoose.model("token", tokenSchema);
export default Token;
