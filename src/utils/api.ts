const API = "https://b207-2605-b100-34d-aa6f-69ff-486e-7e9-6306.ngrok-free.app";

export const makeClaim = async (address: string) => {
	return await fetch(`${API}/issue`, {
		method: "POST",
		body: JSON.stringify({ address }),
	})
		.then((response) => response.json())
		.then((data) => data);
};
