import * as dotenv from "dotenv";
dotenv.config();

import chai from "chai";
import { describe, it, after, before } from "mocha";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import fastify from "../../server.js";
import User from "../../src/models/Users.js";

const assert = chai.assert;

describe("AA Services", function () {
	// Test credentials
	const test_email = "test@example.com";
	const test_password = "password1234";

	let test_id;
	let test_accessToken;
	let test_refreshToken;

	before(async function () {
		// Clears all the users
		User.deleteMany({});
	});

	it("OK, Registers the user in the database", async function () {
		const payload = {
			credentials: {
				email: test_email,
				password: test_password,
			},
			info: {
				name: {
					firstName: "Jason",
					lastName: "Derulo",
					middleName: "M",
					suffix: "Jr.",
				},
			},
		};

		// Sends the payload to the server
		let response;
		response = await fastify.inject({
			method: "POST",
			url: "/v1/users/register",
			payload: payload,
		});

		// Parses and checks
		const json = JSON.parse(response.body);
		assert.equal(response.statusCode, 200);
		assert.isTrue(mongoose.isValidObjectId(json.id));

		test_id = json.id;
	});

	it("OK, can request verification code", async function () {
		const user = await User.findById(test_id);

		let response;
		response = await fastify.inject({
			method: "GET",
			url: `/v1/users/verify/${test_id}`,
		});

		// Parses and checks
		const json = JSON.parse(response.body);
		assert.equal(response.statusCode, 200);
		assert.equal(json.verificationCode, user.code);
	});

	it("OK, can verify user account", async function () {
		const user = await User.findById(test_id);

		let response;
		response = await fastify.inject({
			method: "POST",
			url: `/v1/users/verify/${test_id}`,
			payload: { code: user.code },
		});

		// Parses and checks
		const json = JSON.parse(response.body);
		assert.equal(response.statusCode, 200);
		assert.deepEqual(json, {
			status: "ACTIVE",
			message: "Verified.",
		});
	});

	it("OK, can login to account", async function () {
		let response;
		response = await fastify.inject({
			method: "POST",
			url: "/v1/users/login",
			payload: {
				credentials: {
					email: test_email,
					password: test_password,
				},
			},
		});

		// Parses and checks
		const json = JSON.parse(response.body);
		assert.hasAllKeys(json, ["accessToken", "refreshToken", "tokenType"]);
		assert.isDefined(json["accessToken"]);
		assert.isDefined(json["refreshToken"]);
		assert.isDefined(json["tokenType"]);

		// Sets tokens for the next test
		test_accessToken = json["accessToken"];
		test_refreshToken = json["refreshToken"];

		// Display test tokens
		fastify.log.info(test_accessToken);
	});

	it("OK, verifies jwt tokens", function () {
		let result;

		// Verifies access token
		result = jwt.verify(test_accessToken, process.env.ACCESS_TOKEN_SECRET);
		assert.isDefined(result, "Result is defined");
		assert.equal(result.uid, test_id);

		// Verifies refresh token
		result = jwt.verify(test_refreshToken, process.env.REFRESH_TOKEN_SECRET);
		assert.isDefined(result, "Result is defined");
		assert.equal(result.uid, test_id);
	});
});
