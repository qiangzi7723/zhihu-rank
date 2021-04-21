const axios = require("axios");

class Fetch {
	// 拉取热门列表
	async hot() {
		const response = await axios.get(
			"https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50&mobile=true"
		);
		const {
			data: { data: data },
		} = response;
		return data;
	}
}

module.exports = new Fetch();
