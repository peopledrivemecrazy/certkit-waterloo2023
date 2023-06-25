import { useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile";
import GetQuizes from "../components/GetQuizes";

const HomePage = () => {
	const { isConnected, address } = useAccount();
	let navigate = useNavigate();

	useEffect(() => {
		if (!isConnected) {
			navigate("/login");
		}
	});
	const { disconnect } = useDisconnect();

	return (
		<>
			<div className="flex justify-between gap-4 items-center">
				{isConnected && (
					<>
						{address && (
							<p>Welcome {`${address.slice(0, 6)}...${address.slice(-4)}`}!</p>
						)}

						<div>
							<button onClick={() => disconnect()} className="btn btn-neutral">
								Disconnect
							</button>
						</div>
					</>
				)}
			</div>
			{address && (
				<>
					<div>
						<Profile address={address} />
					</div>

					<div>
						<GetQuizes />
					</div>
				</>
			)}
		</>
	);
};

export default HomePage;
