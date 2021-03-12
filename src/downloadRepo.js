const ora = require('ora');
const { promisify } = require('util');
const { message } = require('./utils');
const download = promisify(require('download-git-repo'));
const downloadRepo = async (repoUrl, dirName) => {
	const spinner = ora('创建模版').start();
	try {
		await download(repoUrl, dirName, { clone: true });
		spinner.succeed();
		return true;
	} catch (e) {
		message.error(e);
		spinner.fail();
		return false;
	}
};
module.exports = downloadRepo;
