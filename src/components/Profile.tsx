import { useEffect, useState } from "react";
import { Address } from "viem";
import { useContractRead } from "wagmi";
import { abi } from "../abi/MetaID.json";
import TokenBoundAccount from "./TokenBoundAccount";
import { makeClaim } from "../utils/api";
interface ProfileProps {
	address: Address;
}

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

	return (
		<>
			{/* <TokenBoundAccount /> */}
			<div className="card w-96 bg-base-300 shadow-xl py-4">
				<figure>
					<img src={URL + address} alt={address} />
				</figure>
				<div className="card-body">
					<h2 className="card-title">
						{`${address.slice(0, 6)}...${address.slice(-4)}`}!
					</h2>
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
		</>
	);
};

export default Profile;
