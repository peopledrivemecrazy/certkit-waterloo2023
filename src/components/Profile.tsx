import { useEffect, useState } from "react";
import { Address } from "viem";
import { useContractRead } from "wagmi";
import { abi } from "../abi/MetaID.json";
import TokenBoundAccount from "./TokenBoundAccount";
interface ProfileProps {
	address: Address;
}

const MetaIDContract = "0xCC779eA62dde267a66D7C36e684Ee32d498c0a5F";

const URL = `https://noun-api.com/beta/pfp?name=`;

const Profile: React.FC<ProfileProps> = ({ address }) => {
	const [verified, setVerified] = useState(false);
	const [hasToken, setHasToken] = useState<boolean>(false);
	useEffect(() => {
		const hasWorldId = localStorage.getItem("worldId");
		if (hasWorldId) {
			localStorage.getItem("worldId");
			setVerified(Boolean(hasWorldId));
		}
	}, [hasToken]);

	const { data, isError, isLoading } = useContractRead({
		address: MetaIDContract,
		abi,
		functionName: "hasId",
		args: [address],
		onSuccess(data: boolean) {
			setHasToken(data);
		},
	});

	return (
		<>
			<img src={URL + address} alt={address} />

			{verified && !hasToken && (
				<button className="btn btn-accent mt-4">Claim ID</button>
			)}

			{verified && hasToken && <p>You are chain verified!</p>}

			<TokenBoundAccount />
		</>
	);
};

export default Profile;
