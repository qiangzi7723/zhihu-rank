import React from "react";
import data from "../raws/2021-04-20/1.json";

class Page extends React.Component {
	constructor() {
		super();
		this.state = {
			data,
		};
	}

	render() {
		return <div>Page</div>;
	}
}

export default Page;
