import { useAccount } from "wagmi";

import { Account } from "./components/Account";

import { Connect } from "./components/Connect";
import WorldId from "./components/WolrdId";
import Avatar from "./components/Avatar";
import Profile from "./components/Profile";
import { useSwitchNetwork } from "wagmi";

import "./index.css";
import "./App.css";
import { useEffect } from "react";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import QuizPage from "./pages/Quiz";

export function App() {
	const { isConnected, address } = useAccount();

	const routes = [
		{ path: "/", name: "Home", component: <HomePage /> },
		{ path: "/login", name: "Home", component: <LoginPage /> },
		{ path: "/quiz/:id", name: "Quiz", component: <QuizPage /> },
	];

	return (
		<>
			<main className="p-4">
				<Routes>
					{routes.map(({ path, component }) => (
						<Route key={path} path={path} element={component} />
					))}
				</Routes>
			</main>
		</>
	);
}
