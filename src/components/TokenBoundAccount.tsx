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
			<a
				href="https://mumbai.polygonscan.com/address/0x768C5EBaC4eC78351093A82a297a6D7B29fbFB41"
				target="_blank"
				className="flex items-center text-blue-600"
			>
				<span>
					{tokenboundClient.getAccount({
						tokenContract: "0xCC779eA62dde267a66D7C36e684Ee32d498c0a5F",
						tokenId: "1",
					})}
				</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					className="w-4 h-4"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
					/>
				</svg>
			</a>
		</>
	);
};

export default TokenBoundAccount;
