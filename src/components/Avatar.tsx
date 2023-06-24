import { Address } from "viem";

interface AvatarProps {
	address: Address;
}

const Avatar: React.FC<AvatarProps> = ({ address }) => {
	const URL = `https://noun-api.com/beta/pfp?name=${address}`;
	return (
		<>
			<img src={URL} alt={address} />
		</>
	);
};

export default Avatar;
