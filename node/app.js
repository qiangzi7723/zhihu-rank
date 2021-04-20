const axios = require("axios");
const fs = require("fs");
const fse = require("fs-extra");
const dayjs = require("dayjs");

// 拉取数据
const trackData = async () => {
	const response = await axios.get(
		"https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50&mobile=true"
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
	const today = dayjs().format("YYYY-MM-DD");
	let index = 1;
	const dir = `./raws/${today}/`;

	await fse.ensureDir(dir);

	const result = await fse.readdir(dir);
	if (result && result.length != 0) index = result.length + 1;

	const data = {
		data: source,
		description: {
			time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
		},
	};
	await fse.writeFile(`${dir}/${index}.json`, JSON.stringify(data));
};

const writeToArchive = async (data) => {
	const today = dayjs().format("YYYY-MM-DD");
	const dir = `./archives/${today}/`;
	const index = await _dir(dir);

	let content = `
## 排行榜趋势 记录时间：${dayjs().format("YYYY-MM-DD HH:mm:ss")}
  `;

	data.forEach((item) => {
		const sub = `
  ${item.index + 1}. ${item.title} ${item.hot}
    `;
		content += sub;
	});

	await fse.writeFile(`${dir}/${index}.md`, content);

	const readme = `
基于 Github Action 实现的自动化程序
`;
	await fse.writeFile(`README.md`, readme + content);
};

const _dir = async (dir) => {
	const today = dayjs().format("YYYY-MM-DD");
	let index = 1;

	await fse.ensureDir(dir);

	const result = await fse.readdir(dir);
	if (result && result.length != 0) index = result.length + 1;
	return index;
};

const init = async () => {
	const source = await trackData();
	const data = await convert(source);
	await wirteToRaw(source);
	await writeToArchive(data);
};

init();
