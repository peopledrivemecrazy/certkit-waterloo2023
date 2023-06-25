import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { submitQuiz } from "../utils/api";
import { useAccount } from "wagmi";
import { TokenboundClient } from "@tokenbound/sdk";
import { createWalletClient, custom, http, WalletClient } from "viem";
import { polygonMumbai } from "viem/chains";
import { useContractRead } from "wagmi";
import { abi } from "../abi/MetaID.json";

const URL =
	"https://meta-cert-test-43e7e5165044.herokuapp.com/get_questions?id=";

const MetaIDContract = "0xCC779eA62dde267a66D7C36e684Ee32d498c0a5F";

export type Questions = Question[];

export interface Question {
	questionId: string;
	question: string;
	choices: Choice[];
}

export interface Choice {
	choiceId: string;
	choice: string;
}

const QuizPage = () => {
	const location = useLocation();
	const [_, __, quizId] = location.pathname.split("/");
	const [questions, setQuestions] = useState<Questions>([]);
	const [passed, setPassed] = useState<undefined | boolean>(undefined); // Initialize to undefined
	const [metaIDTokenId, setMetaIDTokenId] = useState<number | undefined>();
	const { isConnected, address } = useAccount();
	useEffect(() => {
		fetch(URL + quizId)
			.then((res) => res.json())
			.then((data) => {
				setQuestions(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const walletClient: WalletClient = createWalletClient({
		chain: polygonMumbai,
		account: address,
		transport: window.ethereum ? custom(window.ethereum) : http(),
	});
	const tokenboundClient = new TokenboundClient({
		chainId: polygonMumbai.id,
		walletClient,
	});

	useContractRead({
		address: MetaIDContract,
		abi,
		functionName: "tokenOfOwnerByIndex",
		args: [address, 0],
		onSuccess(data: number) {
			const tokenId = Number(BigInt(data).toString());
			setMetaIDTokenId(tokenId);
		},
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const answers: number[] = Array.from(formData.values()).map((value) =>
			Number(value)
		);

		if (address && metaIDTokenId) {
			const tbaAddress = tokenboundClient.getAccount({
				tokenContract: MetaIDContract,
				tokenId: String(metaIDTokenId),
			});

			const data = await submitQuiz(quizId, answers.join(","), tbaAddress);
			if (data.passed) {
				setPassed(true);
			} else {
				setPassed(false);
			}
		}
	};

	const handleRetake = () => {
		setPassed(undefined); // Reset the pass/fail status
	};

	return (
		<>
			<Link to="/" className="btn btn-sm">
				<span className="flex gap-1 items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-4 h-4"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
						/>
					</svg>
					Go back
				</span>
			</Link>

			<p>Quiz {quizId}</p>
			{passed === undefined ? ( // Display the form only if the pass/fail status is undefined
				<form onSubmit={handleSubmit}>
					{questions.map((question) => (
						<div key={question.questionId}>
							<h4>{question.question}</h4>
							<ul>
								{question.choices.map((choice) => (
									<li key={choice.choiceId}>
										<label>
											<input
												type="radio"
												name={question.questionId}
												value={choice.choiceId}
											/>
											{choice.choice}
										</label>
									</li>
								))}
							</ul>
						</div>
					))}
					<button type="submit" className="btn btn-neutral">
						Submit
					</button>
				</form>
			) : (
				<div>
					{passed ? (
						<>
							<h2 className="text-3xl">You passed!</h2>
							<p>Your POAP is on the way!</p>
						</>
					) : (
						<>
							<h2 className="text-3xl">You failed.</h2>
							<button onClick={handleRetake} className="btn btn-neutral">
								Retake Quiz
							</button>
						</>
					)}
				</div>
			)}
		</>
	);
};

export default QuizPage;
