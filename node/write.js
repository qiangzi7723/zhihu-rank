const fse = require("fs-extra");
const dayjs = require("dayjs");

class Write {
	async toRaw(source) {
		const today = dayjs().format("YYYY-MM-DD");
		const time = dayjs().format("YYYY-MM-DD HH:mm:ss");
		const dir = `./src/assests/raws/${today}/`;

		const data = {
			data: source,
			description: {
				time,
			},
		};

		const index = await this._getIndex(dir);
		await fse.ensureDir(dir);
		await fse.writeFile(`${dir}/${index}.json`, JSON.stringify(data));
		await fse.writeFile(`./src/assests/raws/index.json`, JSON.stringify(data));
	}

	async toArchive(data) {
		const today = dayjs().format("YYYY-MM-DD");
		const dir = `./src/assests/archives/${today}/`;

		let content = `
## 排行榜趋势 记录时间：${dayjs().format("YYYY-MM-DD HH:mm:ss")}
  `;

		data.forEach((item) => {
			const sub = `
  ${item.index + 1}. ${item.title} ${item.hot}
    `;
			content += sub;
		});

		const readme = `
基于 Github Action 实现的自动化程序

自动抓取某网站排行榜，并实现页面更新。纯前端实现，无额外部署后端服务。站点地址：https://qiangzi7723.github.io/zhihu-rank
`;

		const index = await this._getIndex(dir);
		await fse.writeFile(`${dir}/${index}.md`, content);
		await fse.writeFile(`README.md`, readme + content);
	}

	// 生成聚合数据
	async toAggregate() {
		const today = dayjs().format("YYYY-MM-DD");
		const dir = `./src/assests/raws/${today}/`;
		const result = await fse.readdir(dir);
		const list = [];
		for (let i = 0; i < result.length; i++) {
			const file = dir + result[i];
			const response = await fse.readJSON(file);
			list.push(response);
		}
		await fse.writeFile(
			`./src/assests/raws/aggregate.json`,
			JSON.stringify({ list })
		);
	}

	async _getIndex(dir) {
		const today = dayjs().format("YYYY-MM-DD");
		let index = 1;

		await fse.ensureDir(dir);
		const result = await fse.readdir(dir);
		if (result && result.length != 0) index = result.length + 1;
		return index;
	}
}

module.exports = new Write();
