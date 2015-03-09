/// <reference path="lib.d.ts" />

module edlio.wiki {
	var angular: ng.IAngularStatic = require('angular');

	require('!style!css!../stylesheets/style.css');

	angular.module('edlio.wiki', [])
		.run(function() {
			console.log('Hello wiki!');
		});

	angular.bootstrap(document, ['edlio.wiki']);
}
