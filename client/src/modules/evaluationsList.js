/**
 *  Sends a GET request to the backend server to get the list of evaluations
 * @returns {Object}
 */
export async function getEvaluationsList() {
	try {
		// Request GET from the server
		const URI = "http://127.0.0.1:3000/v1/eval/";
		const response = await fetch(URI);

		// Parse response into JSON
		const jsonBody = await response.json();

		// Return a list of objects containing info regarding evaluations
		return jsonBody;
	} catch (err) {
		console.log(err);
	}
}

/**
 * Sends a POST request to the backend server to create a new evaluation entry
 * @param {*} info
 */
export async function createEvaluation(info) {
	// POST info to the server
	try {
		const URI = "http://127.0.0.1:3000/v1/eval/";
		const response = await fetch(URI, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(info),
		});

		// Returns an object containing the created evaluation
		return response.json();
	} catch (err) {
		console.log(err);
	}
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
