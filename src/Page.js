import React from "react";
import data from "./assests/raws/2021-04-20/1.json";

class Page extends React.Component {
	constructor() {
		super();
		this.state = {
			data,
		};
	}

	render() {
		return (
			<div className="page">
				<span style={{ color: "red" }}>
					更新时间：{this.state.data.description.time}
				</span>
				<ul>
					{this.state.data.data.map((item) => (
						<li>{JSON.stringify(item)}</li>
					))}
				</ul>
			</div>
		);
	}
}

export default Page;
