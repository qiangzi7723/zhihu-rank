const fetch = require("./fetch");
const util = require("./util");
const write = require("./write");

(async () => {
	const source = await fetch.hot();
	const data = await util.convert(source);
	await write.toRaw(source);
	await write.toArchive(data);
	await write.toAggregate();
})();
