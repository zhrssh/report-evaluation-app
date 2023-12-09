import * as dotenv from "dotenv";
dotenv.config();

import chai from "chai";
import fs from "fs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import path from "path";

import formAutoContent from "form-auto-content";
import { describe, it, after, before } from "mocha";

import fastify from "../server.js";
import Evaluation from "../src/models/Evaluations.js";
import User from "../src/models/Users.js";

const assert = chai.assert;

describe("User-Server Simulation", function () {
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

	describe("Authentication and Authorization Services", function () {
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
			const json = response.json();
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
			const json = response.json();
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
			const json = response.json();
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
			const json = response.json();
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

	describe("CRUD Functions for Evaluations", function () {
		// Gets sample evaluation from MongoDB
		async function getSampleEvaluation() {
			let response = await fastify.inject({
				method: "GET",
				headers: {
					authorization: `Bearer ${test_accessToken}`,
				},
				url: "/v1/eval/",
			});

			const result = response.json();

			assert.equal(response.statusCode, 200);
			assert.isTrue(mongoose.isValidObjectId(result[0]._id));

			response = await fastify.inject({
				method: "GET",
				headers: {
					authorization: `Bearer ${test_accessToken}`,
				},
				url: `/v1/eval/${result[0]._id}`,
			});

			const doc = response.json()[0];
			return doc;
		}

		// Clears all entries before running test
		before(async function () {
			await Evaluation.deleteMany({});
		});

		// Closes all connections
		after(async function () {
			// Delete all files in the uploads folder
			const directory = "uploads";
			fs.readdirSync(directory, function (err, files) {
				if (err) throw err;
				for (const file of files) {
					const filePath = path.join(directory, file);
					const stats = fs.lstatSync(filePath);

					if (stats.isDirectory()) {
						fs.rmdirSync(filePath, function (err) {
							if (err) throw err;
						});
					}
				}
			});
		});

		describe("Testing the connection", async function () {
			it("OK, hello there!", async function () {
				const response = await fastify.inject({
					method: "GET",
					headers: {
						authorization: `Bearer ${test_accessToken}`,
					},
					url: "/",
				});

				const body = response.json();
				assert.equal(body.hello, "world");
			});
		});

		describe("API /api/v1/eval/", function () {
			it("OK, POST '/' create evaluation entry", async function () {
				const test = {
					dateOfEvaluation: "2023-01-01",
					evaluator: "Kenny",
					governmentAuthority: "G.A. 12345",
					kindOfVisit: "evaluation",
					program: "Computer Engineering",
				};

				const response = await fastify.inject({
					method: "POST",
					headers: {
						authorization: `Bearer ${test_accessToken}`,
					},
					url: "/v1/eval/",
					payload: test,
				});

				assert.equal(response.statusCode, 200);
				assert.isTrue(
					mongoose.isValidObjectId(response.json().id),
					"Is not a valid object ID"
				);
			});

			it("OK, GET '/v1/eval/' retrieves all evaluation entries", async function () {
				const response = await fastify.inject({
					method: "GET",
					headers: {
						authorization: `Bearer ${test_accessToken}`,
					},
					url: "/v1/eval/",
				});

				const result = response.json();

				assert.equal(response.statusCode, 200);
				assert.isTrue(mongoose.isValidObjectId(result[0]._id));
			});

			it("OK, GET '/v1/eval/:uid' retrieve a single entry", async function () {
				const doc = await getSampleEvaluation();
				assert.isTrue(mongoose.isValidObjectId(doc._id));

				const expected = {
					dateOfEvaluation: "2023-01-01",
					evaluator: "Kenny",
					governmentAuthority: "G.A. 12345",
					kindOfVisit: "evaluation",
					program: "Computer Engineering",
				};

				const received = {
					dateOfEvaluation: doc.dateOfEvaluation,
					evaluator: doc.evaluator,
					governmentAuthority: doc.governmentAuthority,
					kindOfVisit: doc.kindOfVisit,
					program: doc.program,
				};

				assert.deepEqual(received, expected);
			});

			it("OK, PUT '/:uid' updates an evaluation entry", async function () {
				let doc = await getSampleEvaluation();
				doc.program = "Chemical Engineering";

				const response = await fastify.inject({
					method: "PUT",
					headers: {
						authorization: `Bearer ${test_accessToken}`,
					},
					url: `/v1/eval/${doc._id}`,
					payload: doc,
				});

				const newDoc = response.json();

				assert.equal(response.statusCode, 200);
				assert.equal(newDoc.program, "Chemical Engineering");
			});

			it("OK, POST /v1/eval/upload/:uid uploads file and updates filepath in the entry", async function () {
				const doc = await getSampleEvaluation();
				const id = doc._id;

				const testFilePath = ".\\test\\images";
				const testFilename = "doge.jpg";

				// Boundary used to specify different files
				const boundary =
					"----Boundary" + Math.random().toString(36).substring(2);

				// Prepares formdata
				const pathToFile = path.join(testFilePath, testFilename);
				const formData = formAutoContent({
					file: fs.createReadStream(pathToFile),
				});

				let response = await fastify.inject({
					url: `/v1/eval/upload/${id}`,
					method: "POST",
					headers: {
						...formData.headers,
						authorization: `Bearer ${test_accessToken}`,
					},
					body: formData.payload,
				});

				let test = response.json();

				assert.equal(response.statusCode, 200);
				assert.equal(test.paths[0], `uploads\\${id}\\${testFilename}`);
			});

			it("OK, DELETE /v1/eval/:uid", async function () {
				let doc = await getSampleEvaluation();

				let response = await fastify.inject({
					method: "DELETE",
					headers: {
						authorization: `Bearer ${test_accessToken}`,
					},
					url: `/v1/eval/${doc._id}`,
				});

				assert.equal(response.statusCode, 200);

				response = await fastify.inject({
					method: "GET",
					headers: {
						authorization: `Bearer ${test_accessToken}`,
					},
					url: "/v1/eval/",
				});

				assert.equal(response.statusCode, 200);
			});
		});
	});
});
