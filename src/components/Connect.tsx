import { BaseError } from "viem";
import { polygon } from "viem/chains";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function Connect() {
	const { connector, isConnected } = useAccount();
	const { connect, connectors, error, isLoading, pendingConnector } =
		useConnect({
			chainId: polygon.id,
		});
	const { disconnect } = useDisconnect();

	return (
		<div>
			<div>
				{isConnected && (
					<div className="text-right">
						<button onClick={() => disconnect()} className="btn btn-accent">
							Disconnect from {connector?.name}
						</button>
					</div>
				)}
				{!isConnected && (
					<div className="flex gap-4">
						{connectors
							.filter((x) => x.ready && x.id !== connector?.id)
							.map((x) => (
								<button
									className="btn btn-accent"
									key={x.id}
									onClick={() => connect({ connector: x })}
								>
									{x.name}
									{isLoading &&
										x.id === pendingConnector?.id &&
										" (connecting)"}
								</button>
							))}
					</div>
				)}
			</div>

			{error && <div>{(error as BaseError).shortMessage}</div>}
		</div>
	);
}
