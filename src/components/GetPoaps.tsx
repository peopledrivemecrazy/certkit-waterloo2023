import { useState } from "react";
import { Address } from "viem";
import { useContractRead } from "wagmi";
import { abi } from "../abi/MetaCert.json";
interface GetPoapsProps {
	tbaAddress: Address;
	metaCertContract: Address;
}

const GetPoaps: React.FC<GetPoapsProps> = ({
	tbaAddress,
	metaCertContract,
}) => {
	const [tokenIds, setTokenIds] = useState<number[]>([]);
	const { data, isError, isLoading } = useContractRead({
		address: metaCertContract,
		abi,
		functionName: "getCertByAddress",
		args: [tbaAddress],
		onSuccess(data: number[]) {
			setTokenIds(data);
			console.log(data);
		},
	});
	return (
		<div className="flex gap-4">
			<div className="aspect-square h-32 w-32 bg-black rounded-xl"></div>
			<div className="aspect-square h-32 w-32 bg-black rounded-xl"></div>
			<div className="aspect-square h-32 w-32 bg-black rounded-xl"></div>
		</div>
	);
};

export default GetPoaps;
