import chai from "chai";
import formAutoContent from "form-auto-content";
import fs from "fs";
import { describe, it, after, before } from "mocha";
import mongoose from "mongoose";

import fastify from "../../server.js";
import Evaluation from "../../src/models/Evaluations.js";
import path from "path";

const assert = chai.assert;

describe("Evaluations API", function () {
	// Gets sample evaluation from MongoDB
	async function getSampleEvaluation() {
		let response = await fastify.inject({
			method: "GET",
			url: "/api/v1/eval/",
		});

		const { ids } = JSON.parse(response.body);

		assert.equal(response.statusCode, 200);
		assert.isTrue(mongoose.isValidObjectId(ids[0]));

		response = await fastify.inject({
			method: "GET",
			url: `/api/v1/eval/view/${ids[0]}`,
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
		fs.readdir(directory, function (err, files) {
			if (err) throw err;
			for (const file of files) {
				fs.unlink(path.join(directory, file), function (err) {
					if (err) throw err;
				});
			}
		});

		// Closes all connection
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

	describe("API /api/v1/eval/", function () {
		it("OK, POST '/' create evaluation entry", async function () {
			const test = {
				program: "Computer Engineering",
				governmentAuthority: "G.A. 12345",
				dateOfEvaluation: new Date("2023-01-01"),
			};

			const response = await fastify.inject({
				method: "POST",
				url: "/api/v1/eval/",
				payload: test,
			});

			assert.equal(response.statusCode, 200);
			assert.isTrue(
				mongoose.isValidObjectId(JSON.parse(response.body).id),
				"Is not a valid object ID"
			);
		});

		it("OK, GET '/api/v1/eval/' retrieves all evaluation entries", async function () {
			const response = await fastify.inject({
				method: "GET",
				url: "/api/v1/eval/",
			});

			const { ids } = JSON.parse(response.body);

			assert.equal(response.statusCode, 200);
			assert.isTrue(mongoose.isValidObjectId(ids[0]));
		});

		it("OK, GET '/api/v1/eval/view/:uid' retrieve a single entry", async function () {
			const doc = await getSampleEvaluation();
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

			assert.deepEqual(received, expected);
		});

		it("OK, PUT '/update/:uid' updates an evaluation entry", async function () {
			let doc = await getSampleEvaluation();
			doc.program = "Chemical Engineering";

			const response = await fastify.inject({
				method: "PUT",
				url: `/api/v1/eval/update/${doc._id}`,
				payload: doc,
			});

			const newDoc = JSON.parse(response.body);

			assert.equal(response.statusCode, 200);
			assert.equal(newDoc.program, "Chemical Engineering");
		});

		it("OK, POST /api/v1/eval/upload/:uid uploads file and updates filepath in the entry", async function () {
			const doc = await getSampleEvaluation();
			const id = doc._id;

			const testImagePath = "./test/images";
			const testImageFilename = "doge.jpg";

			const form = formAutoContent({
				file: fs.createReadStream(path.join(testImagePath, testImageFilename)),
			});

			let response = await fastify.inject({
				method: "POST",
				url: `/api/v1/eval/upload/${id}`,
				...form,
			});

			let test = JSON.parse(response.body);

			assert.equal(response.statusCode, 200);
			assert.equal(test.attachedFiles[0], "./uploads/doge.jpg");
		});

		it("OK, DELETE /api/v1/eval/delete/:uid", async function () {
			let doc = await getSampleEvaluation();

			let response = await fastify.inject({
				method: "DELETE",
				url: `/api/v1/eval/delete/${doc._id}`,
			});

			assert.equal(response.statusCode, 200);

			response = await fastify.inject({
				method: "GET",
				url: "/api/v1/eval/",
			});

			assert.equal(response.statusCode, 200);
			assert.isEmpty(JSON.parse(response.body).ids);
		});
	});
});
