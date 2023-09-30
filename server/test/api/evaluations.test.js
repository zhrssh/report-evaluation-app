import chai from "chai";
import { describe, it, after, before } from "mocha";
import mongoose from "mongoose";

import fastify from "../../server.js";
import Evaluation from "../../src/models/Evaluations.js";

const assert = chai.assert;

describe("Evaluations API", function () {
	// Clears all entries before running test
	before(async function () {
		await Evaluation.deleteMany({});
	});

	after(async function () {
		await mongoose.connection.close();
		await fastify.close();
	});

	describe("Testing the connection", async function () {
		it("OK, hello there!", async function () {
			const response = await fastify.inject({
				method: "GET",
				url: "/",
			});

			const body = JSON.parse(response.body);
			assert.equal(body.hello, "world");
		});
	});

	describe("POST /api/eval", function () {
		it("OK, '/create' create evaluation entry", async function () {
			const test = {
				program: "Computer Engineering",
				governmentAuthority: "G.A. 12345",
				dateOfEvaluation: new Date("2023-01-01"),
			};

			const response = await fastify.inject({
				method: "POST",
				url: "/api/eval/create",
				payload: test,
			});

			assert.equal(response.statusCode, 200);
			assert.equal(JSON.parse(response.body).msg, "OK");
		});

		it("OK, '/' retrieves all evaluation entries", async function () {
			const response = await fastify.inject({
				method: "GET",
				url: "/api/eval/",
			});

			const body = JSON.parse(response.body)[0];

			const received = {
				program: body.program,
				governmentAuthority: body.governmentAuthority,
				dateOfEvaluation: body.dateOfEvaluation,
			};

			const expected = {
				program: "Computer Engineering",
				governmentAuthority: "G.A. 12345",
				dateOfEvaluation: "2023-01-01T00:00:00.000Z",
			};

			assert.equal(response.statusCode, 200);
			assert.deepEqual(received, expected);
		});
	});
});
