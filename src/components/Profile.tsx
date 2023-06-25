import { useEffect, useState } from "react";
import { Address } from "viem";
import { useContractRead } from "wagmi";
import { abi } from "../abi/MetaID.json";
import TokenBoundAccount from "./TokenBoundAccount";
import { makeClaim } from "../utils/api";
interface ProfileProps {
	address: Address;
}

import { TokenboundClient } from "@tokenbound/sdk";
import { createWalletClient, custom, http, WalletClient } from "viem";
import { polygonMumbai } from "viem/chains";
import { useAccount } from "wagmi";

const MetaIDContract = "0xCC779eA62dde267a66D7C36e684Ee32d498c0a5F";

const URL = `https://noun-api.com/beta/pfp?name=`;

const Profile: React.FC<ProfileProps> = ({ address }) => {
	const [verified, setVerified] = useState(false);
	const [hasToken, setHasToken] = useState(false);

	const [claimed, setClaimed] = useState(false);

	useEffect(() => {
		const hasWorldId = localStorage.getItem("worldId");
		if (hasWorldId) {
			localStorage.getItem("worldId");
			setVerified(Boolean(hasWorldId));
		}
	}, [hasToken, verified]);

	const { data, isError, isLoading } = useContractRead({
		address: MetaIDContract,
		abi,
		functionName: "hasId",
		args: [address],
		onSuccess(data: boolean) {
			setHasToken(data);
		},
	});

	const claim = async () => {
		const data = await makeClaim(address);
		if (data.tx) {
			setClaimed(true);
		}
	};

	const cleanAddress = (address: string) => {
		return address.slice(0, 4) + "..." + address.slice(-4);
	};

	const walletClient: WalletClient = createWalletClient({
		chain: polygonMumbai,
		account: address,
		transport: window.ethereum ? custom(window.ethereum) : http(),
	});
	const tokenboundClient = new TokenboundClient({
		chainId: polygonMumbai.id,
		walletClient,
	});

	const tbaAddress = tokenboundClient.getAccount({
		tokenContract: "0xCC779eA62dde267a66D7C36e684Ee32d498c0a5F",
		tokenId: "1",
	});

	return (
		<>
			<div className="flex gap-4 mt-4">
				<div className="card w-screen bg-base-300 lg:card-side shadow-xl py-4">
					<figure>
						<img src={URL + address} alt={address} />
					</figure>
					<div className="card-body">
						<a
							className="card-title"
							href={`https://mumbai.polygonscan.com/address/${tbaAddress}`}
							target="_blank"
						>
							{cleanAddress(tbaAddress)}!
						</a>
						{verified && hasToken && <p>You are chain verified!</p>}
						<div className="card-actions justify-end">
							{verified && !hasToken && (
								<button className="btn btn-accent mt-4" onClick={claim}>
									Claim ID
								</button>
							)}
						</div>

						
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
