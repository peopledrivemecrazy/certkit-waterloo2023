import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const URL =
	"https://meta-cert-test-43e7e5165044.herokuapp.com//get_questions?id=";

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
	const [answers, setAnswers] = useState<{ [key: string]: string }>({});

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

	const handleAnswerChange = (questionId: string, choiceId: string) => {
		setAnswers((prevAnswers) => ({
			...prevAnswers,
			[questionId]: choiceId,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Answers:", answers);
		// Handle form submission logic
	};

	return (
		<>
			<a href="/" className=" btn btn-sm">
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
			</a>

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
											checked={answers[question.questionId] === choice.choiceId}
											onChange={() =>
												handleAnswerChange(question.questionId, choice.choiceId)
											}
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
