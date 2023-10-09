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

	// Closes all connections
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

	describe("API /api/eval/", function () {
		it("OK, POST '/' create evaluation entry", async function () {
			const test = {
				program: "Computer Engineering",
				governmentAuthority: "G.A. 12345",
				dateOfEvaluation: new Date("2023-01-01"),
			};

			const response = await fastify.inject({
				method: "POST",
				url: "/api/eval/",
				payload: test,
			});

			assert.equal(response.statusCode, 200);
			assert.isTrue(
				mongoose.isValidObjectId(JSON.parse(response.body).id),
				"Is not a valid object ID"
			);
		});

		it("OK, GET '/api/eval/' retrieves all evaluation entries", async function () {
			const response = await fastify.inject({
				method: "GET",
				url: "/api/eval/",
			});

			const { ids } = JSON.parse(response.body);

			assert.equal(response.statusCode, 200);
			assert.isTrue(mongoose.isValidObjectId(ids[0]));
		});

		it("OK, GET '/api/eval/view/:uid' retrieve a single entry", async function () {
			let response = await fastify.inject({
				method: "GET",
				url: "/api/eval/",
			});

			const { ids } = JSON.parse(response.body);

			assert.equal(response.statusCode, 200);
			assert.isTrue(mongoose.isValidObjectId(ids[0]));

			response = await fastify.inject({
				method: "GET",
				url: `/api/eval/view/${ids[0]}`,
			});

			const doc = JSON.parse(response.body)[0];

			assert.equal(response.statusCode, 200);
			assert.isTrue(mongoose.isValidObjectId(doc._id));

			const expected = {
				program: "Computer Engineering",
				governmentAuthority: "G.A. 12345",
				dateOfEvaluation: "2023-01-01T00:00:00.000Z",
			};

			const received = {
				program: doc.program,
				governmentAuthority: doc.governmentAuthority,
				dateOfEvaluation: doc.dateOfEvaluation,
			};

			assert.equal(response.statusCode, 200);
			assert.deepEqual(received, expected);
		});

		it("OK, PUT '/update/:uid' updates an evaluation entry", async function () {
			let response = await fastify.inject({
				method: "GET",
				url: "/api/eval/",
			});

			assert.equal(response.statusCode, 200);
			const { ids } = JSON.parse(response.body);

			response = await fastify.inject({
				method: "GET",
				url: `/api/eval/view/${ids[0]}`,
			});

			assert.equal(response.statusCode, 200);
			let doc = JSON.parse(response.body)[0];
			doc.program = "Chemical Engineering";

			response = await fastify.inject({
				method: "PUT",
				url: `/api/eval/update/${doc._id}`,
				payload: doc,
			});

			const newDoc = JSON.parse(response.body);

			assert.equal(response.statusCode, 200);
			assert.equal(newDoc.program, "Chemical Engineering");
		});

		it("OK, DELETE /api/eval/delete/:uid", async function () {
			let response = await fastify.inject({
				method: "GET",
				url: "/api/eval/",
			});

			assert.equal(response.statusCode, 200);
			const { ids } = JSON.parse(response.body);

			response = await fastify.inject({
				method: "GET",
				url: `/api/eval/view/${ids[0]}`,
			});

			assert.equal(response.statusCode, 200);
			let doc = JSON.parse(response.body)[0];

			response = await fastify.inject({
				method: "DELETE",
				url: `/api/eval/delete/${doc._id}`,
			});

			assert.equal(response.statusCode, 200);

			response = await fastify.inject({
				method: "GET",
				url: "/api/eval/",
			});

			assert.equal(response.statusCode, 200);
			assert.isEmpty(JSON.parse(response.body).ids);
		});
	});
});
