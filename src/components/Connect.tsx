import { BaseError } from "viem";
import { polygon, polygonMumbai } from "viem/chains";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

export function Connect() {
	const { connector, isConnected } = useAccount();
	const { connect, connectors, error, isLoading, pendingConnector } =
		useConnect({
			chainId: polygonMumbai.id,
			connector: new MetaMaskConnector(),
		});
	const { disconnect } = useDisconnect();

	return (
		<div>
			<div>
				{isConnected && (
					<div>
						<button onClick={() => disconnect()} className="btn btn-neutral">
							Disconnect
						</button>
					</div>
				)}

				{!isConnected && (
					<div className="grid gap-4">
						<button
							className="btn"
							onClick={() => connect({ connector: new MetaMaskConnector() })}
						>
							Connect
						</button>
					</div>
				)}
			</div>

			{error && <div>{(error as BaseError).shortMessage}</div>}
		</div>
	);
}
