const ora = require('ora');
const { processOnClose } = require('./utils');
const spawn = require('child_process').spawn;
module.exports = async function(projectName, gitRepo) {
	const gitRemote = async (repo) => {
		const spinner = ora('添加git仓库').start();
		//remote add origin
		const process = spawn('git', [ 'remote', 'add', 'origin', repo ], {
			cwd: projectName
		});
		const res = await processOnClose(process);
		if (res) {
			spinner.succeed();
			return true;
		}
		spinner.fail();
		return false;
	};
	const spinner = ora('初始化git').start();
	const process = spawn('git', [ 'init' ], {
		cwd: projectName
	});
	const res = await processOnClose(process);
	if (res) {
		spinner.succeed();
		if (gitRepo) {
			return gitRemote(gitRepo);
		}
		return true;
	}
	spinner.fail();
	return false;
};
