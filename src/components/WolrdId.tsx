import { CredentialType, IDKitWidget, ISuccessResult } from "@worldcoin/idkit";
import { useEffect, useState } from "react";

const WorldId = () => {
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
	const app_id = "app_ea01236e21f90a3d095f9baa5c7303b2";
	const credential_types = [CredentialType.Phone, CredentialType.Orb];

	useEffect(() => {
		const hasWorldId = localStorage.getItem("worldId");
		if (hasWorldId) {
			localStorage.getItem("worldId");
			setVerified(Boolean(hasWorldId));
		}
	});

	return (
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
	);
};

export default WorldId;
