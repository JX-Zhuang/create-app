const chalk = require('chalk');

const log = console.log;
const message = {
	error: (message) => {
		log(chalk.red(message));
	},
	success: (message) => {
		log(chalk.green(message));
	}
};
const processOnClose = (process) => {
	return new Promise((resolve, reject) => {
		process.on('close', function(status) {
			if (status === 0) resolve(true);
			return resolve(status);
		});
	});
};
module.exports = {
	message,
	processOnClose
};
