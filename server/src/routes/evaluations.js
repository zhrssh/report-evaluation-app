import path from "path";
import fs from "fs";
import util from "util";
import { pipeline } from "stream";

import {
	read,
	create,
	update,
	deleteOne,
} from "../controller/evaluationController.js";
import { authenticate } from "../middleware/jwt.js";

const allowedExtensions = [
	".jpg",
	".jpeg",
	".png",
	".pdf",
	".doc",
	".docx",
	".xlsx",
	".xls",
	".csv",
	".txt",
];

export default function Route(fastify, opts, done) {
	const pump = util.promisify(pipeline);

	/**
	 * Creates an evaluation entry to the database
	 */
	fastify.route({
		method: "POST",
		url: "/",
		preHandler: authenticate,
		handler: async function (request, reply) {
			const data = request.body;
			const _id = await create(data);
			reply.send({ id: _id });
		},
	});

	/**
	 * Gets all evaluation entries from the database
	 */
	fastify.route({
		method: "GET",
		url: "/",
		preHandler: authenticate,
		handler: async function (request, reply) {
			const result = await read();
			reply.send(result);
		},
	});

	/**
	 * Retrieve a single entry from the database
	 */
	fastify.route({
		method: "GET",
		url: "/:uid",
		preHandler: authenticate,
		handler: async function (request, reply) {
			const { uid } = request.params;
			const result = await read({ _id: uid });
			reply.send(result);
		},
	});

	/**
	 * Update an evaluation entry in the database
	 */
	fastify.route({
		method: "PUT",
		url: "/:uid",
		preHandler: authenticate,
		handler: async function (request, reply) {
			const { uid } = request.params;
			const data = request.body;
			const result = await update({ _id: uid }, data);
			reply.send(result);
		},
	});

	/**
	 * Delete an entry from the database
	 */
	fastify.route({
		method: "DELETE",
		url: "/:uid",
		preHandler: authenticate,
		handler: async function (request, reply) {
			const { uid } = request.params;
			if (await deleteOne(uid)) reply.send(200);
			else reply.code(400);
		},
	});

	/**
	 * Uploads a file to the uploads folder
	 */
	fastify.route({
		method: "POST",
		preHandler: authenticate,
		url: "/upload/:uid",
		handler: async function (request, reply) {
			const { uid } = request.params;
			const files = request.files();

			if (!files) {
				return reply.send("No files uploaded.");
			}

			fastify.log.info(files);

			// Preps the parent directory
			const parentDir = path.join("uploads", uid);
			if (!fs.existsSync(parentDir)) {
				fs.mkdirSync(parentDir);
			}

			// Creates array for file paths of uploaded files
			let paths = [];
			for await (let part of files) {
				// Excludes all files not included in allowed extensions
				const ext = path.extname(part.filename).toLowerCase();
				if (!allowedExtensions.includes(ext)) {
					continue;
				}

				// Saves the file to storage
				const filepath = path.join(parentDir, part.filename);
				await pump(part.file, fs.createWriteStream(filepath));
				paths.push(filepath);
			}

			// Add filepath in the database
			await update({ _id: uid }, { $push: { attachedFiles: paths } });

			reply.send({ paths });
		},
	});

	done();
}
