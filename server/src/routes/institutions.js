import { authenticate } from "../middleware/jwt.js";
import {
	createInstitution,
	readInstitutions,
	deleteInstitution,
	updateInstitution,
} from "../controller/institutionController.js";

export default function Route(fastify, opts, done) {
	/**
	 * Gets intitution entries from the database
	 */
	fastify.route({
		method: "GET",
		url: "/:uid",
		prehandler: authenticate,
		handler: async function (request, reply) {
			const { uid } = request.params;
			if (uid) {
				const result = await readInstitutions({ _id: uid });
				return reply.send(result);
			} else {
				const result = await readInstitutions();
				return reply.send(result);
			}
		},
	});

	/**
	 * Creates an institution entry to the database
	 */
	fastify.route({
		method: "POST",
		url: "/",
		prehandler: authenticate,
		handler: async function (request, reply) {
			const result = await createInstitution(request.body);
			return reply.send(result);
		},
	});

	/**
	 * Update an institution entry in the database
	 */
	fastify.route({
		method: "PUT",
		url: "/:uid",
		prehandler: authenticate,
		handler: async function (request, reply) {
			const { uid } = request.params;
			const result = await updateInstitution(uid, request.body);
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
			if (await deleteInstitution(uid))
				reply.send({ message: `Institution ${uid} deleted.` });
			else reply.code(400);
		},
	});

	done();
}
