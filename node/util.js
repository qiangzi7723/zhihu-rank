class Util {
	// 进行格式转换
	async convert(source) {
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
	}
}

module.exports = new Util();
