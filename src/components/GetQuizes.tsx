import { useEffect, useState } from "react";


const URL = "https://meta-cert-test-43e7e5165044.herokuapp.com/available_tests";

interface Quiz {
	id: number;
	name: string;
}
const quizes = [{ id: 1, name: "Climate change" }];

const GetQuizes = () => {
	const [_, setQuizes] = useState<Quiz[]>();
	// useEffect(() => {
	// 	fetch(URL)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			setQuizes(data);
	//             console.log(data)
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, []);

	// useEffect(() => {
	// 	setQuizes([{ id: 1, name: "Climate change" }]);
	// });

	return (
		<>
			<h1 className="text-3xl mt-4">Tests</h1>
			{quizes && (
				<>
					{quizes.map((quiz: Quiz) => (
						<div className="grid grid-cols-3" key={quiz.id}>
							<div className="">
								<h2 className="sr-only">Summary</h2>
								<div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
									<dl className="flex flex-wrap">
										<div className="flex-auto pl-6 pt-6">
											<dt className="text-sm font-semibold leading-6 text-gray-900">
												{quiz.name}
											</dt>
											<dd className="mt-1 text-base font-semibold leading-6 text-gray-900">
												Bounty: POAP
											</dd>
										</div>
										<div className="flex-none self-end px-6 pt-4">
											<dt className="sr-only">Status</dt>
											<dd className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-green-600/20">
												Incomplete
											</dd>
										</div>
									</dl>
									<div className="mt-6 border-t border-gray-900/5 px-6 py-6">
										<a
											href="#"
											className="text-sm font-semibold leading-6 text-gray-900"
										>
											Take test <span aria-hidden="true">&rarr;</span>
										</a>
									</div>
								</div>
							</div>
						</div>
					))}
				</>
			)}
		</>
	);
};

export default GetQuizes;
