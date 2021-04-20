import React from "react";
import "./home.css";
import data from "../../assests/raws/2021-04-20/1.json";
import { Link } from "react-router-dom";

class Page extends React.Component {
	constructor() {
		super();
		this.state = {
			data,
		};
	}

	handleClick = (item) => {
		console.log(item);
	};

	render() {
		return (
			<div className="page">
				<span style={{ color: "red" }}>
					更新时间：{this.state.data.description.time}
				</span>
				<ul>
					{this.state.data.data.map((item, index) => (
						<div>
							<li onClick={this.handleClick.bind(this, item)}>
								<Link
									to={{
										pathname: "/report",
									}}
								>
									{index + 1}. {item.target.title}
								</Link>
							</li>
							<span>{item.detail_text}</span>
						</div>
					))}
				</ul>
			</div>
		);
	}
}

export default Page;
