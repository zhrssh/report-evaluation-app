/**
 * This module acts as a component to control the creation,
 * read, update, and deletion of the documents in the collection.
 */
import Evaluation from "../models/Evaluations.js";

/**
 * Creates a new entry in the database.
 * @param {Object} data
 * @returns {Promise<void>}
 */
export function create(data) {
	return new Promise(async function (resolve, reject) {
		try {
			const result = await Evaluation.create(data);
			resolve(result._id);
		} catch (err) {
			reject(err);
		}
	});
}

/**
 * Retrieves all entries ids from the database.
 * @returns {Promise<Document>}
 */
export function fetchIds() {
	return new Promise(async function (resolve, reject) {
		try {
			const results = await Evaluation.find().exec();

			// Gets all the ids
			const ids = [];
			results.forEach((element) => {
				ids.push(element._id);
			});

			resolve(ids);
		} catch (err) {
			reject(err);
		}
	});
}

/**
 * Retrieve an entry that satisfies the specified filter.
 * @param {Object} filter
 * @returns {Array<Document>}
 */
export function read(filter) {
	return new Promise(async function (resolve, reject) {
		try {
			const result = await Evaluation.find(filter).exec();
			resolve(result);
		} catch (err) {
			reject(err);
		}
	});
}

/**
 * Updates a single entry from the database
 * @param {Object | String} _id
 * @param {Object} data
 * @returns {Document}
 */
export function update(_id, data) {
	return new Promise(async function (resolve, reject) {
		try {
			const result = await Evaluation.findOneAndUpdate({ _id }, data, {
				new: true,
			});

			resolve(result);
		} catch (err) {
			reject(err);
		}
	});
}

export function deleteOne(_id) {
	return new Promise(async function (resolve, reject) {
		try {
			await Evaluation.findByIdAndDelete(_id).exec();
			resolve(true);
		} catch (err) {
			reject(err);
		}
	});
}
