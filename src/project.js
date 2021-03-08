const ora = require('ora');
const spawn = require('child_process').spawn;
const fs = require('fs');
const path = require('path');
const { processOnClose } = require('./utils');
module.exports = (projectName) => {
	const npmInstall = async () => {
		const spinner = ora('安装依赖').start();
		const process = spawn('npm', [ 'install' ], {
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
	const setting = async (packageSetting) => {
		const spinner = ora('设置工程信息').start();
		const projectDir = path.join(process.cwd(), `${projectName}`);
		const packageJSONPath = path.join(projectDir, 'package.json');
		const packageJSONLockPath = path.join(projectDir, 'package-lock.json');
		const packageJSON = require(packageJSONPath);
		packageJSON.name = packageSetting.name || packageJSON.name;
		packageJSON.version = packageSetting.version || packageJSON.version;
		fs.writeFileSync(packageJSONPath, JSON.stringify(packageJSON, null, 2));
		if (fs.existsSync(packageJSONLockPath)) {
			fs.unlinkSync(packageJSONLockPath);
		}
		spinner.succeed();
		return true;
	};
	return {
		npmInstall,
		setting
	};
};
