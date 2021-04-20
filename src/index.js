const axios = require("axios");
const fs = require("fs");

// 拉取数据
const trackData = async () => {
	const response = await axios.get(
		"https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=1&mobile=true"
	);
	const {
		data: { data: data },
	} = response;
	return data;
};

// 进行格式转换
const convert = async (source) => {
	if (!source instanceof Array) {
		// 格式错误
		console.log("数据异常，已自动退出");
		process.exit();
	}
	const standard = [];
	source.forEach((item, index) => {
		const object = {
			index,
			title: item.target.title,
			url: item.target.url,
			answer: item.target.answer_count,
			follower: item.target.follower_count,
			commemt: item.target.comment_count,
			hot: item.detail_text,
		};
		standard.push(object);
	});
	return standard;
};

// 记录原始数据
const wirteToRaw = async (source) => {
	fs.writeFile("./raws/index.json", JSON.stringify(source), (err) => {
		if (err) {
			return console.error(err);
		}
		console.log("数据写入成功！");
	});
};

const init = async () => {
	const source = await trackData();
	const data = await convert(source);
	await wirteToRaw(source);
};

init();
