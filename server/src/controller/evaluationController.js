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
	return new Promise(async function (resolve, reject) {
		try {
			await Evaluation.create(data);
			resolve(true);
		} catch (err) {
			reject(err);
		}
	});
}

export function readAll() {
	return new Promise(async function (resolve, reject) {
		try {
			const results = await Evaluation.find({}).exec();
			resolve(results);
		} catch (err) {
			reject(err);
		}
	});
}
