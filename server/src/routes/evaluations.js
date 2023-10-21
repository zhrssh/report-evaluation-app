import {
	read,
	create,
	update,
	deleteOne,
} from "../controller/evaluationController.js";
import fs from "fs";
import util from "util";
import { pipeline } from "stream";

export default function Route(fastify, opts, done) {
	const pump = util.promisify(pipeline);

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
		const result = await read();
		reply.send(result);
	});

	/**
	 * Retrieve a single entry from the database
	 */
	fastify.get("/:uid", async function (request, reply) {
		const { uid } = request.params;
		const result = await read({ _id: uid });
		reply.send(result);
	});

	/**
	 * Update an evaluation entry in the database
	 */
	fastify.put("/:uid", async function (request, reply) {
		const { uid } = request.params;
		const data = request.body;
		const result = await update({ _id: uid }, data);
		reply.send(result);
	});

	/**
	 * Delete an entry from the database
	 */
	fastify.delete("/:uid", async function (request, reply) {
		const { uid } = request.params;
		if (await deleteOne(uid)) reply.send(200);
		else reply.code(400);
	});

	/**
	 * Uploads a file to the uploads folder
	 */
	fastify.post("/upload/:uid", async function (request, reply) {
		const { uid } = request.params;
		const data = request.files();

		// Creates array for file paths of uploaded files
		let paths = [];
		for await (let part of data) {
			const path = `./uploads/${part.filename}`;
			await pump(part.file, fs.createWriteStream(path));
			paths.push(path);
		}

		// Add filepath in the database
		const result = await update(
			{ _id: uid },
			{ $push: { attachedFiles: paths } }
		);

		reply.send(result);
	});

	done();
}
