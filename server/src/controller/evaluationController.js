/**
 * This module acts as a component to control the creation,
 * read, update, and deletion of the documents in the collection.
 */
import Evaluation from "../models/Evaluations.js";

/**
 * Creates a new entry in the database.
 * @param {Object} data
 * @returns {String}
 */
export async function createEvaluation(data) {
	try {
		const result = await Evaluation.create(data);
		return result;
	} catch (err) {
		throw err;
	}
}

/**
 * Retrieve an entry that satisfies the specified filter.
 * @param {Object} filter
 * @param {Object} projection
 * @returns {Array<Document>}
 */
export async function readEvaluations(filter = {}, projection = null) {
	try {
		const result = await Evaluation.find(filter, projection).exec();
		return result;
	} catch (err) {
		throw err;
	}
}

/**
 * Updates a single entry from the database
 * @param {Object | String} _id
 * @param {Object} data
 * @returns {Document}
 */
export async function updateEvaluation(_id, data) {
	try {
		const result = await Evaluation.findOneAndUpdate({ _id }, data, {
			new: true,
		});

		return result;
	} catch (err) {
		throw err;
	}
}

/**
 * Delete evaluation by id
 * @param {*} _id
 * @returns
 */
export async function deleteEvaluation(_id) {
	try {
		await Evaluation.findByIdAndDelete(_id).exec();
		return true;
	} catch (err) {
		throw err;
	}
}
