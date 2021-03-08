const fs = require('fs');
const { message } = require('./utils');
const ora = require('ora');
const createFolder = function(name) {
    const spinner = ora('Loading unicorns').start();
	if (fs.existsSync(name)) {
        message.error('File exists!');
        spinner.fail();
		return false;
	}
    fs.mkdirSync(name);
    spinner.succeed();
	message.success('File creates success!');
	return true;
};
module.exports = createFolder;
