import * as dotenv from "dotenv";
dotenv.config();

import { login } from "../services/auth.js";

import {
	read,
	create,
	update,
	deleteOne,
} from "../controller/userController.js";
import { sendVerification, verify } from "../services/verify.js";

export default function Route(fastify, opts, done) {
	/**
	 * Creates new user to the database
	 */
	fastify.post("/register", async function (request, reply) {
		const data = request.body;
		const _id = await create(data);
		reply.send({ id: _id });
	});

	/**
	 * Request from client to verify account. This sends an email
	 * to the new user.
	 */
	fastify.get("/verify/:uid", async function (request, reply) {
		const { uid } = request.params;
		const code = await sendVerification(uid);
		fastify.log.info(`Verification code: ${code}`);

		if (process.env.NODE_ENVIRONMENT === "development") {
			reply.send({ verificationCode: code });
		}
	});

	/**
	 * Request from client to verify account using the code. This
	 * checks if the user provided the correct code for verification.
	 */
	fastify.post("/verify/:uid", async function (request, reply) {
		const { uid } = request.params;
		const code = request.body.code;

		const result = await verify(uid, code);
		reply.send(result);
	});

	/**
	 * Authenticates user to access resources
	 */
	fastify.post("/login", async function (request, reply) {
		const { email, password } = request.body;
		const token = await login(email, password);

		// Payload to send to client
		const payload = {
			uid: token.uid,
			accessToken: token.accessToken,
			refreshToken: token.refreshToken,
			tokenType: token.tokenType,
		};

		reply.send(payload);
	});

	done();
}
