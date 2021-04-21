import React from "react";
import "./home.css";
import data from "../../assests/raws/index.json";
import { Link } from "react-router-dom";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data,
		};
	}

	handleClick = (item) => {
		console.log(item);
	};

	render() {
		return (
			<div className="home">
				<span style={{ color: "red" }}>
					更新时间：{this.state.data.description.time}
				</span>
				<ul>
					{this.state.data.data.map((item, index) => (
						<div key={item.target.id}>
							<li onClick={this.handleClick.bind(this, item)}>
								<Link
									to={{
										pathname: "/report",
										state: item,
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

export default Home;
