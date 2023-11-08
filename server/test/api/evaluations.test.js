import chai from "chai";
import formAutoContent from "form-auto-content";
import fs from "fs";
import { describe, it, after, before } from "mocha";
import mongoose from "mongoose";
import path from "path";

import fastify from "../../server.js";
import Evaluation from "../../src/models/Evaluations.js";

const assert = chai.assert;

describe("Evaluations API", function () {
	// Gets sample evaluation from MongoDB
	async function getSampleEvaluation() {
		let response = await fastify.inject({
			method: "GET",
			url: "/v1/eval/",
		});

		const result = JSON.parse(response.body);

		assert.equal(response.statusCode, 200);
		assert.isTrue(mongoose.isValidObjectId(result[0]._id));

		response = await fastify.inject({
			method: "GET",
			url: `/v1/eval/${result[0]._id}`,
		});

		const doc = JSON.parse(response.body)[0];
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
				url: "/",
			});

			const body = JSON.parse(response.body);
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
				url: "/v1/eval/",
				payload: test,
			});

			assert.equal(response.statusCode, 200);
			assert.isTrue(
				mongoose.isValidObjectId(JSON.parse(response.body).id),
				"Is not a valid object ID"
			);
		});

		it("OK, GET '/v1/eval/' retrieves all evaluation entries", async function () {
			const response = await fastify.inject({
				method: "GET",
				url: "/v1/eval/",
			});

			const result = JSON.parse(response.body);

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
				url: `/v1/eval/${doc._id}`,
				payload: doc,
			});

			const newDoc = JSON.parse(response.body);

			assert.equal(response.statusCode, 200);
			assert.equal(newDoc.program, "Chemical Engineering");
		});

		it("OK, POST /v1/eval/upload/:uid uploads file and updates filepath in the entry", async function () {
			const doc = await getSampleEvaluation();
			const id = doc._id;

			const testImagePath = "./test/images";
			const testImageFilename = "doge.jpg";

			const form = formAutoContent({
				file: fs.createReadStream(path.join(testImagePath, testImageFilename)),
			});

			let response = await fastify.inject({
				method: "POST",
				url: `/v1/eval/upload/${id}`,
				...form,
			});

			let test = JSON.parse(response.body);

			assert.equal(response.statusCode, 200);
			assert.equal(test.attachedFiles[0], `uploads\\${id}\\doge.jpg`);
		});

		it("OK, DELETE /v1/eval/:uid", async function () {
			let doc = await getSampleEvaluation();

			let response = await fastify.inject({
				method: "DELETE",
				url: `/v1/eval/${doc._id}`,
			});

			assert.equal(response.statusCode, 200);

			response = await fastify.inject({
				method: "GET",
				url: "/v1/eval/",
			});

			assert.equal(response.statusCode, 200);
			assert.isEmpty(JSON.parse(response.body));
		});
	});
});
