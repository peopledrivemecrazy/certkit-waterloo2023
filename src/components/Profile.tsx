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
import GetPoaps from "./GetPoaps";

const MetaIDContract = "0xCC779eA62dde267a66D7C36e684Ee32d498c0a5F";
const metaCertContract = "0xE359d0F906955eb6Cc096d8F7F561f767DF997B8";

const URL = `https://noun-api.com/beta/pfp?name=`;

const Profile: React.FC<ProfileProps> = ({ address }) => {
	const [verified, setVerified] = useState(false);
	const [hasToken, setHasToken] = useState<boolean | undefined>();
	const [metaIDTokenId, setMetaIDTokenId] = useState<number | undefined>();
	const [tbaAddress, setTbaAddress] = useState<Address | undefined>();
	const [claimed, setClaimed] = useState(false);

	useEffect(() => {
		const hasWorldId = localStorage.getItem("worldId");
		if (hasWorldId) {
			localStorage.getItem("worldId");
			setVerified(Boolean(hasWorldId));
		}
	}, [hasToken, verified]);

	useContractRead({
		address: MetaIDContract,
		abi,
		functionName: "tokenOfOwnerByIndex",
		args: [address, 0],
		onSuccess(data: number) {
			const tokenId = BigInt(data).toString();
			setMetaIDTokenId(Number(tokenId));
			const tokenboundClient = new TokenboundClient({
				chainId: polygonMumbai.id,
				walletClient,
			});

			const _tbaAddress = tokenboundClient.getAccount({
				tokenContract: "0xCC779eA62dde267a66D7C36e684Ee32d498c0a5F",
				tokenId,
			});
			setTbaAddress(_tbaAddress);
		},
		onError() {
			setHasToken(undefined);
		},
	});

	useContractRead({
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

	return (
		<>
			<div className="flex gap-4 mt-4">
				<div className="card w-screen bg-base-300 lg:card-side shadow-xl py-4">
					<figure>
						<img src={URL + address} alt={address} />
					</figure>

					{hasToken === undefined && (
						<div className="p-4">
							<p>
								Welcome new user, you can claim your nouns pfp associated to
								your proof of personhood
							</p>
							<button className="btn btn-neutral mt-4" onClick={claim}>
								Claim ID
							</button>
						</div>
					)}

					{tbaAddress && (
						<div className="card-body">
							<a
								className="card-title"
								href={`https://mumbai.polygonscan.com/address/${tbaAddress}`}
								target="_blank"
							>
								<span className="hover:text-accent flex items-center">
									Token Bound Account: {cleanAddress(tbaAddress)}!
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
										/>
									</svg>
								</span>
							</a>
							{verified && hasToken && <p>You are WorldID verified!</p>}

							<GetPoaps
								tbaAddress={tbaAddress}
								metaCertContract={metaCertContract}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Profile;
