import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Report from "./page/report/report.js";

ReactDOM.render(
	<Router>
		<Switch>
			<Route path="/home">
				<App />
			</Route>
			<Route path="/report">
				<Report />
			</Route>
		</Switch>
	</Router>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
