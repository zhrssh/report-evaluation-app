import { create, readAll } from "../controller/evaluationController.js";

export default function Route(fastify, opts, done) {
	/**
	 * Creates an evaluation entry to the database
	 */
	fastify.post("/create", async function (request, reply) {
		const data = request.body;
		await create(data);
		reply.send({ msg: "OK" });
	});

	/**
	 * Gets all evaluation entries from the database
	 */
	fastify.get("/", async function (request, reply) {
		const results = await readAll();
		reply.send(results);
	});

	done();
}
