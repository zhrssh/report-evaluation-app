/**
 *  Sends a GET request to the backend server to get the list of evaluations
 * @returns {Promise<Object>}
 */
export function getEvaluationsList() {
	return new Promise(async function (resolve, reject) {
		// Request GET from the server
		const URI = "http://127.0.0.1:3000/v1/eval/";
		const response = await fetch(URI);

		// Parse response into JSON
		const jsonBody = response.json();

		// Return a list of objects containing info regarding evaluations
		resolve(jsonBody);
	});
}

/**
 * Sends a search query to the backend server to get the list of specified evaluations
 * @param {string} filter
 * @returns {Array<Object>}
 */
export function searchByFilter(filter) {
	// Request GET from the server
	// Return a list of objects containing info regarding evaluations
}

/**
 * Sends a POST request to the backend server to create a new evaluation entry
 * @param {*} info
 */
export function createEvaluation({ info }) {
	// POST info to the server
	// Returns an object containing the created evaluation
}
