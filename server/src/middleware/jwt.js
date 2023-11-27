import jwt from "jsonwebtoken";

import fastify from "../../server.js";
import { verifyToken } from "../utils/jwt.js";

export function authenticate(request, reply, done) {
	const authHeader = request.headers["authorization"];
	if (!authHeader) {
		reply.code(401).send("No authorization header found.");
	}

	// Get access token
	const token = authHeader.split(" ")[1];
	if (!token) {
		reply.code(401).send("No JWT token found.");
	}

	// Verify token
	try {
		const user = verifyToken(token);
		request.user = user;
	} catch (err) {
		if (err instanceof jwt.JsonWebTokenError) {
			reply.code(401).send("JWT token is invalid.");
		} else if (err instanceof jwt.TokenExpiredError) {
			reply.code(403).send("JWT token is expired.");
		}
	}

	done();
}
