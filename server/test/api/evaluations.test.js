import chai from "chai";
import { describe, it, before, after } from "mocha";
import request from "supertest";

import fastify from "../../server.js";
import { disconnect } from "../../src/db/database.js";

const assert = chai.assert;

describe("Testing the connection", function () {
	// Disconnects the server to the database after test
	after(function () {
		disconnect();
	});

	it("OK, hello there!", function () {
		return request(fastify.server)
			.get("/")
			.set("Accept", "application/json")
			.expect(200)
			.expect("Content-Type", "application/json; charset=utf-8")
			.then(function (response) {
				assert.equal(response.body.hello, "world");
			});
	});
});

describe("GET /api/eval", function () {
	// Disconnects the server to the database after test
	after(function () {
		disconnect();
	});
});
