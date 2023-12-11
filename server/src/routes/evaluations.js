import {
	readEvaluations,
	createEvaluation,
	updateEvaluation,
	deleteEvaluation,
} from "../controller/evaluationController.js";
import { authenticate } from "../middleware/jwt.js";

export default function Route(fastify, opts, done) {
	/**
	 * Creates an evaluation entry to the database
	 */
	fastify.route({
		method: "POST",
		url: "/",
		preHandler: authenticate,
		handler: async function (request, reply) {
			const result = await createEvaluation(request.body);
			return reply.send(result);
		},
	});

	/**
	 * Gets evaluation entries from the database
	 */
	fastify.route({
		method: "GET",
		url: "/:uid",
		preHandler: authenticate,
		handler: async function (request, reply) {
			const { uid } = request.params;

			if (uid) {
				const result = await readEvaluations({ _id: uid });
				return reply.send(result);
			} else {
				const result = await readEvaluations();
				return reply.send(result);
			}
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
			const result = await updateEvaluation(uid, request.body);
			return reply.send(result);
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
			if (await deleteEvaluation(uid))
				return reply.send({ message: `Evaluation ${uid} deleted.` });
			else return reply.code(400);
		},
	});

	done();
}
