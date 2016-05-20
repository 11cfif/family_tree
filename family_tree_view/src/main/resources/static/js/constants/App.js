export const URL = 'http://localhost:8091/services/api/';

export const createRequest = (method, body) => {
	return {
		method: method,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: body
	}
};