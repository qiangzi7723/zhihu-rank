import React from "react";
import { withRouter } from "react-router-dom";
import data from "../../assests/raws/aggregate.json";
import "./repost.css";
import { Line } from "@ant-design/charts";

class Report extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			item: this.props.location.state,
			list: [],
		};
	}

	componentDidMount() {
		this.convert();
	}

	convert() {
		const id = this.state.item.target.id;
		const list = [];
		for (let i = 0; i < data.list.length; i++) {
			const object = data.list[i];
			for (let j = 0; j < object.data.length; j++) {
				const content = object.data[j];
				if (content.target.id === id) {
					// 数据匹配
					list.push({
						description: object.description,
						data: content,
					});
				}
			}
		}
		list.sort((prev, next) => {
			return (
				+new Date(prev.description.time) - +new Date(next.description.time)
			);
		});
		this.setState({
			list,
		});
	}

	render() {
		const data = this.state.list.map((item) => {
			const format = {
				time: item.description.time,
				hot: item.data.detail_text,
			};
			return format;
		});

		const config = {
			data,
			height: 400,
			xField: "time",
			yField: "hot",
			point: {
				size: 5,
				shape: "diamond",
			},
		};

		return (
			<div className="report">
				<p>当前话题：{this.state.item.target.title}</p>
				<p>当前热度：{this.state.item.detail_text}</p>
				<Line {...config}></Line>
				<p>
					历史数据：
					{this.state.list.map((item) => (
						<div key={item.data.target.id}>
							<p>
								热度：{item.data.detail_text} 时间：{item.description.time}
							</p>
						</div>
					))}
				</p>
			</div>
		);
	}
}

// 如果需要接收参数，需要这样写
export default withRouter(Report);
