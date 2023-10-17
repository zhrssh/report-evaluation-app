/**
 * Sends a GET request to the backend server to get the list of evaluations
 * @returns {Object}
 */
export function getEvaluationsList() {
	// Request GET from the server
	// Return a list of objects containing info regarding evaluations
}

/**
 * Sends a search query to the backend server to get the list of specified evaluations
 * @param {string} name
 * @returns {Array<Object>}
 */
export function searchByName(name) {
	// Request GET from the server, add name as filter
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
