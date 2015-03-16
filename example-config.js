// A simple configuration for the system
var config = {
	// see your Github at https://github.com/settings/applications
	github: {
		GITHUB_CLIENT_ID: 'Your Github Client ID',
		GITHUB_CLIENT_SECRET: 'Your Github Client Secret'
	},
	database: {
		'host': 'localhost',
		'user': 'root',
		'password': '',
		'database': 'hacky_wiki',
		'users_table': 'users'
	}
};

module.exports = config;
