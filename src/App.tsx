import { useAccount } from "wagmi";

import { Account } from "./components/Account";

import { Connect } from "./components/Connect";

export function App() {
	const { isConnected } = useAccount();

	return (
		<>
			<Connect />
			{isConnected && (
				<>
					<hr />
					<h2>Account</h2>
					<Account />
					<br />
				</>
			)}
		</>
	);
}
