import { Address } from "viem";

const API = "https://b207-2605-b100-34d-aa6f-69ff-486e-7e9-6306.ngrok-free.app";
const TEST_URL = "https://meta-cert-test-43e7e5165044.herokuapp.com";
export const makeClaim = async (address: string) => {
	return await fetch(`${API}/issue`, {
		method: "POST",
		body: JSON.stringify({ address }),
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
		.then((data) => console.log(data));
};
