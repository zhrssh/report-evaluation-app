import Fastify from "fastify";
import mongoose from "mongoose";

import { connect, disconnect } from "./src/db/database.js";

const fastify = Fastify({
	logger: true,
});

/**
 * Database configurations.
 */
const DB_URL = "mongodb://localhost/testdb";
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

fastify.register(evaluations, { prefix: "/api" });

/**
 * Starts the server and the database.
 */
fastify.listen({ port: 3000 }, function (err, address) {
	// If error is encountered, logs error
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}

	// If server runs, log info
	fastify.log.info(`Server is listening on ${address}`);

	// Connects the server to the database
	connect(DB_URL, DB_OPTIONS)
		.then(function () {
			fastify.log.info(
				`Server has connected to the database: mongodb://${mongoose.connection.host}:${mongoose.connection.port}/${mongoose.connection.name}`
			);
		})
		.catch(function (err) {
			fastify.log.error(err);
		});
});

export default fastify;
