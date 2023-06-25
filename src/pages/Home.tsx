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
	const cleanAddress = (address: string) => {
		return address.slice(0, 4) + "..." + address.slice(-4);
	};

	return (
		<>
			<div className="flex justify-between gap-4 items-center">
				{isConnected && (
					<>
						{address && (
							<a
								className="card-title"
								href={`https://mumbai.polygonscan.com/address/${address}`}
								target="_blank"
							>
								<span className="hover:text-accent flex items-center">
									{cleanAddress(address)}
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
