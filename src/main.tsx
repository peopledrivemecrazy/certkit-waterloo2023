import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";

import { App } from "./App";
import { config } from "./wagmi";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<WagmiConfig config={config}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</WagmiConfig>
	</React.StrictMode>
);
