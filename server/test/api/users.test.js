import chai from "chai";
import { describe, it, after, before } from "mocha";
import mongoose from "mongoose";

import fastify from "../../server.js";
import User from "../../src/models/Users.js";

const assert = chai.assert;

describe("AA Services", function () {
	// Test credentials
	const test_email = "test@example.com";
	const test_password = "password1234";
	let test_id;

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

		const json = JSON.parse(response.body);

		assert.equal(response.statusCode, 200);
		assert.deepEqual(json, {
			status: "ACTIVE",
			message: "Verified.",
		});
	});

	it("OK, logins the account", async function () {
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

		const json = JSON.parse(response.body);

		assert.equal(response.statusCode, 200);
		assert.equal(json.tokenType, "Bearer");

		fastify.log.info(`Access Token: ${json.accessToken}`);
		fastify.log.info(`Refresh Token: ${json.refreshToken}`);
	});

	// TODO: test verification of token
});
