import { useAccount } from "wagmi";

import { Account } from "./components/Account";

import { Connect } from "./components/Connect";
import WorldId from "./components/WolrdId";
import Avatar from "./components/Avatar";
import Profile from "./components/Profile";

import "./index.css";
import "./App.css";

export function App() {
	const { isConnected, address } = useAccount();

	return (
		<>
			<main className="p-4">
				<Connect />
				{isConnected && (
					<>
						<h2>Account</h2>
						<Account />
						<WorldId />
						{address && <Profile address={address} />}
						<br />
					</>
				)}
			</main>
		</>
	);
}
