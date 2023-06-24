import { useAccount } from "wagmi";

import { Account } from "./components/Account";

import { Connect } from "./components/Connect";
import WorldId from "./components/WolrdId";
import Avatar from "./components/Avatar";

export function App() {
	const { isConnected, address } = useAccount();

	return (
		<>
			<Connect />
			{isConnected && (
				<>
					<hr />
					<h2>Account</h2>
					<Account />
					{address && <Avatar address={address} />}
					<br />
					<WorldId />
				</>
			)}
		</>
	);
}
