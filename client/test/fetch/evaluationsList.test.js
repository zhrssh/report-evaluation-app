import chai from "chai";
import { describe, it, after, before } from "mocha";

const assert = chai.assert;

import { getEvaluationsList } from "../../src/services/evaluationsList.js";

describe("Testing fetch functions", function () {
	const url = "http://127.0.0.1:3000/v1/eval";

	// Insert a single evaluation entry for testing
	before(async function () {
		const sample = {
			program: "Computer Engineering",
			governmentAuthority: "G.A. 12345",
			dateOfEvaluation: new Date("2023-01-01"),
		};

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(sample),
		});

		assert.equal(response.status, 200);
	});

	// Deletes all sample evaluations after testing
	after(async function () {
		// Gets data from the server
		const jsonBody = await getEvaluationsList();
		const result = jsonBody.result;

		assert.isNotEmpty(result);

		// Deletes data from the server
		let response;
		for (let doc of result) {
			response = await fetch(`${url}/${doc._id}`, {
				method: "DELETE",
			});

			assert.equal(response.status, 200);
		}
	});

	it("OK, fetches data from the server", async function () {
		const jsonBody = await getEvaluationsList();
		assert.isNotEmpty(jsonBody);
	});
});
