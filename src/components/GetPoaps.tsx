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
			setTokenIds(data.map((num) => Number(BigInt(num).toString())));
			console.log(data);
		},
	});
	return (
		<div className="flex gap-4">
			{tokenIds.map((tokenId) => (
				<>
					<div
						className="aspect-square h-32 w-32 bg-black rounded-xl text-white"
						key={tokenId}
					>
						{tokenId}
					</div>
				</>
			))}

			{/* <code>
				<pre>{JSON.stringify({ isError, isLoading })}</pre>
			</code> */}
		</div>
	);
};

export default GetPoaps;
