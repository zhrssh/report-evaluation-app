import Fastify from "fastify";
import mongoose from "mongoose";
import pino from "pino";

import cors from "@fastify/cors";
import helmet from "@fastify/helmet";

const logger = pino({
	transport: {
		target: "pino-pretty",
	},
});
const fastify = Fastify({
	logger: logger,
});

/**
 * Server plugins
 */
fastify.register(helmet);
fastify.register(cors, {
	origin: "*",
	methods: ["GET", "POST", "PUT", "DELETE"],
});

/**
 * Database configurations
 */
const DB_OPTIONS = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

/**
 * The home/default route of the server.
 */
fastify.get("/", function (request, reply) {
	reply.send({ hello: "world" });
});

/**
 * This where the routing is organized.
 */
import evaluations from "./src/routes/evaluations.js";

fastify.register(evaluations, { prefix: "/api/eval" });

/**
 * Starts the server and the database.
 */

// Connects the server to the database
mongoose.connect("mongodb://127.0.0.1/testdb", DB_OPTIONS).then(function () {
	fastify.listen({ port: 3000 }, function (err, address) {
		// If error is encountered, logs error
		if (err) {
			fastify.log.error(err);
			process.exit(1);
		}
	});
});

["SIGINT", "SIGTERM"].forEach(function (signal) {
	process.on(signal, async function () {
		await mongoose.connection.close();
		await fastify.close();
		process.exit(0);
	});
});

export default fastify;
