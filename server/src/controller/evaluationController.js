/**
 * This module acts as a component to control the creation,
 * read, update, and deletion of the documents in the collection.
 */
import Evaluation from "../models/Evaluations.js";

/**
 * Creates a new entry in the database
 * @param {Object} data
 * @returns
 */
export function create(data) {
	return new Promise(function (resolve, reject) {
		Evaluation.create(data)
			.then(resolve(true))
			.catch(function (err) {
				return reject(err);
			});
	});
}
