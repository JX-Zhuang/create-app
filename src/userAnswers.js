const inquirer = require('inquirer');
const tmlRepos = require('./tmlRepos');
const userAnswers = async () => {
	let answers = await inquirer.prompt([
		{
			type: 'list',
			name: 'template',
			message: '请选择模版',
			choices: Object.keys(tmlRepos)
		},
		{
			type: 'input',
			name: 'projectName',
			message: '请输入工程名称'
		},
		{
			type: 'version',
			name: 'version',
			message: '请输入版本号'
		},
		{
			type: 'input',
			name: 'gitRepo',
			message: '请输入git仓库的地址'
		}
	]);
	const templateRepo = tmlRepos[answers.template];
	answers.templateRepo = templateRepo;
	return answers;
};

module.exports = userAnswers;
