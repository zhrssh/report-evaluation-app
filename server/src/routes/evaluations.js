import {
	read,
	create,
	fetchIds,
	update,
	deleteOne,
} from "../controller/evaluationController.js";

export default function Route(fastify, opts, done) {
	/**
	 * Creates an evaluation entry to the database
	 */
	fastify.post("/", async function (request, reply) {
		const data = request.body;
		const _id = await create(data);
		reply.send({ id: _id });
	});

	/**
	 * Gets all evaluation entries from the database
	 */
	fastify.get("/", async function (request, reply) {
		const ids = await fetchIds();
		reply.send({ ids });
	});

	/**
	 * Retrieve a single entry from the database
	 */
	fastify.get("/view/:uid", async function (request, reply) {
		const { uid } = request.params;
		const result = await read({ _id: uid });
		reply.send(result);
	});

	/**
	 * Update an evaluation entry in the database
	 */
	fastify.put("/update/:uid", async function (request, reply) {
		const { uid } = request.params;
		const data = request.body;
		const result = await update({ _id: uid }, data);
		reply.send(result);
	});

	/**
	 * Delete an entry from the database
	 */
	fastify.delete("/delete/:uid", async function (request, reply) {
		const { uid } = request.params;
		if (await deleteOne(uid)) reply.send(200);
		else reply.code(400);
	});

	done();
}
