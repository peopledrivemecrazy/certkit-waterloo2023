import { TokenboundClient } from "@tokenbound/sdk";
import { createWalletClient, custom, http, WalletClient } from "viem";
import { polygonMumbai } from "viem/chains";
import { useAccount } from "wagmi";

const TokenBoundAccount = () => {
	const { isConnected, address } = useAccount();

	const walletClient: WalletClient = createWalletClient({
		chain: polygonMumbai,
		account: address,
		transport: window.ethereum ? custom(window.ethereum) : http(),
	});
	const tokenboundClient = new TokenboundClient({
		chainId: polygonMumbai.id,
		walletClient,
	});

	// my address, tokenId, NFTContractAddress
	return (
		<>
			<h1>
				{tokenboundClient.getAccount({
					tokenContract: "0xCC779eA62dde267a66D7C36e684Ee32d498c0a5F",
					tokenId: "1",
				})}
			</h1>
		</>
	);
};

export default TokenBoundAccount;
