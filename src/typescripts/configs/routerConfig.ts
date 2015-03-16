/// <reference path='../_all.ts' />

module hacky.wiki {
	'use strict';

	export class RouterConfig {
		public static $inject = [
			'$stateProvider',
			'$urlRouterProvider'
		];

		constructor($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/');

			$stateProvider
				.state(
					'splash-screen',
					{
						url: '/',
						templateUrl: 'partials/splash-screen.html',
						controller: 'IndexCtrl as index'
					}
				);
		}
	}
}
