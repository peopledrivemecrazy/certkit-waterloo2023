import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { submitQuiz } from "../utils/api";
import { useAccount } from "wagmi";
const URL =
	"https://meta-cert-test-43e7e5165044.herokuapp.com/get_questions?id=";

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
	const { isConnected, address } = useAccount();

	useEffect(() => {
		fetch(URL + quizId)
			.then((res) => res.json())
			.then((data) => {
				setQuestions(data);
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const answers: number[] = Array.from(formData.values()).map((value) =>
			Number(value)
		);
		console.log({ address, isConnected });
		console.log("Answers:", answers.join(","));
		// Handle form submission logic
		if (address) submitQuiz(quizId, answers.join(","), address);
	};

	return (
		<>
			<Link to="/" className=" btn btn-sm">
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
		</>
	);
};

export default QuizPage;
