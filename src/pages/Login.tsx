import { useAccount } from "wagmi";
import { Connect } from "../components/Connect";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorldId from "../components/WolrdId";
import { CredentialType, IDKitWidget, ISuccessResult } from "@worldcoin/idkit";

const LoginPage = () => {
	const { isConnected, address } = useAccount();
	const [verified, setVerified] = useState(false);

	const handleProof = (result: ISuccessResult) => {
		return new Promise<void>((resolve) => {
			setTimeout(() => resolve(), 3000);
			// NOTE: Example of how to decline the verification request and show an error message to the user
		});
	};
	const onSuccess = (result: ISuccessResult) => {
		setVerified(true);
		localStorage.setItem("worldId", "true");
	};

	const action = "verify-worldid";
	const app_id = "app_staging_cc3900212c02330d85a461c5fd19af91";
	const credential_types = [CredentialType.Phone, CredentialType.Orb];
	let navigate = useNavigate();
	// useEffect(() => {
	// 	if (isConnected) navigate("/");
	// });
	useEffect(() => {
		const hasWorldId = localStorage.getItem("worldId");
		if (isConnected && hasWorldId) {
			localStorage.getItem("worldId");
			setVerified(Boolean(hasWorldId));
			navigate("/");
		}
	});
	return (
		<>
			<div className="grid h-screen flex-1 justify-center items-center">
				<div className="">
					<div className="mx-auto w-full">
						<div className="text-center grid gap-4">
							<h2 className="mt-8 text-5xl font-bold text-gray-900">
								Hello Knowledge Explorer!
							</h2>
							<p className="text-3xl">
								It will take two steps to validate your identity
							</p>
							{!isConnected && (
								<p className="text-3xl">Please connect to the metamask</p>
							)}
						</div>

						<div className="mt-10 max-w-sm lg:w-96 mx-auto">
							<div>
								<Connect />
								{isConnected && (
									<>
										{verified ? (
											<>
												<p>You have verified your World ID</p>
											</>
										) : (
											<IDKitWidget
												action={action}
												signal="my_signal"
												onSuccess={onSuccess}
												handleVerify={handleProof}
												app_id={app_id}
												credential_types={credential_types}
												autoClose={true}
												// walletConnectProjectId="get_this_from_walletconnect_portal"
											>
												{({ open }) => (
													<button className="btn mt-4" onClick={open}>
														Connect with Worldcoin
													</button>
												)}
											</IDKitWidget>
										)}
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
