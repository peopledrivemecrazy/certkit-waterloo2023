import { Address } from "viem";

const API = "https://b4af-216-249-57-2.ngrok-free.app";
const TEST_URL = "https://meta-cert-test-43e7e5165044.herokuapp.com";

export const makeClaim = async (address: string) => {
	console.log({ address });
	return await fetch(`${API}/issue/id`, {
		method: "post",
		body: JSON.stringify({ address }),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => response.json())
		.then((data) => data);
};

export const submitQuiz = async (
	testId: string,
	choices: string,
	address: Address
) => {
	const fullUrl = `${TEST_URL}/score_test?id=${testId}&address=${address}&choices=${choices}`;
	console.log(fullUrl);
	return await fetch(fullUrl)
		.then((response) => response.json())
		.then((data) => data);
};
