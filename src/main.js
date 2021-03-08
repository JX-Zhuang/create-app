const { Command } = require('commander');
const fs = require('fs');
const { version } = require('../package.json');
const userAnswers = require('./userAnswers');
const projectUtils = require('./project');
const downloadRepo = require('./downloadRepo');
const git = require('./git');
const { message } = require('./utils');
const program = new Command();
program
	.version(version)
	.arguments('<project-name>')
	.description('create a project in <project-name> folder')
	.action(async (project) => {
		// 检测同名文件
		if (fs.existsSync(project)) {
			message.error(`${project} 已存在`);
			return false;
		}
		const answers = await userAnswers();
		const dowloadRes = await downloadRepo(answers.templateRepo, project);
		if (!dowloadRes) return;
		const projectInit = projectUtils(project);
		await projectInit.setting({
			name: answers.projectName,
			version: answers.version
		});
		await git(project, answers.gitRepo);
		projectInit.npmInstall();
	});
program.parse(process.argv);
