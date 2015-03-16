/// <reference path="_all.ts" />

module hacky.wiki {
	'use strict';

	var angular: ng.IAngularStatic = require('angular');

	require('!style!css!../libs/angular-material/angular-material.css');
	require('!style!css!../stylesheets/style.css');

	require('../libs/angular-animate/angular-animate');
	require('../libs/angular-aria/angular-aria');
	require('../libs/angular-material/angular-material');
	require('../libs/angular-ui-router/release/angular-ui-router');

	angular.module('hacky.wiki', ['ngMaterial', 'ui.router'])
		.run(InitAuthencationCallback)
		.config(RouterConfig)
		.controller('IndexCtrl', IndexCtrl);

	angular.bootstrap(document, ['hacky.wiki']);
}
