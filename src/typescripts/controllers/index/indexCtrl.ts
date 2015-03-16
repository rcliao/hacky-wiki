/// <reference path='../../_all.ts' />

module hacky.wiki {
	'use strict';

	export class IndexCtrl {
		public static $inejct = [
			'$window'
		];

		constructor(private $window) {

		}

		login() {
			this.$window.open(
				'/auth/github',
				'_blank',
				'height=400,width=500'
			);
		}
	}
}
