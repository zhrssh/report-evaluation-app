process.env.NODE_ENV = "test";

import mongoose from "mongoose";

/**
 * Creates a single connection to the database.
 * @param {String} url
 * @param {Object} options
 * @returns
 */
export function connect(url, options) {
	return new Promise(function (resolve, reject) {
		if (process.env.NODE_ENV == "test") {
			mongoose
				.connect("mongodb://localhost/testdb", options)
				.then(function (res, err) {
					if (err) return reject(err);
					return resolve(true);
				});
		} else {
			mongoose.connect(url, options).then(function (res, err) {
				if (err) return reject(err);
				return resolve(true);
			});
		}
	});
}

/**
 * Closes the connection to the database.
 */
export function disconnect() {
	return new Promise(function (resolve, reject) {
		mongoose.connection.close().then(function (res, err) {
			if (err) return reject(err);
			return resolve(true);
		});
	});
}
