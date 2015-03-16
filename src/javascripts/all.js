/// <reference path='../_all.ts' />
var hacky;
(function (hacky) {
    var wiki;
    (function (wiki) {
        'use strict';
        var RouterConfig = (function () {
            function RouterConfig($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise('/');
                $stateProvider.state('splash-screen', {
                    url: '/',
                    templateUrl: 'partials/splash-screen.html',
                    controller: 'IndexCtrl as index'
                });
            }
            RouterConfig.$inject = [
                '$stateProvider',
                '$urlRouterProvider'
            ];
            return RouterConfig;
        })();
        wiki.RouterConfig = RouterConfig;
    })(wiki = hacky.wiki || (hacky.wiki = {}));
})(hacky || (hacky = {}));

/// <reference path='../../_all.ts' />
var hacky;
(function (hacky) {
    var wiki;
    (function (wiki) {
        'use strict';
        var IndexCtrl = (function () {
            function IndexCtrl($window) {
                this.$window = $window;
            }
            IndexCtrl.prototype.login = function () {
                this.$window.open('/auth/github', '_blank', 'height=400,width=500');
            };
            IndexCtrl.$inejct = [
                '$window'
            ];
            return IndexCtrl;
        })();
        wiki.IndexCtrl = IndexCtrl;
    })(wiki = hacky.wiki || (hacky.wiki = {}));
})(hacky || (hacky = {}));

/// <reference path="_all.ts" />
var hacky;
(function (hacky) {
    var wiki;
    (function (wiki) {
        'use strict';
        var angular = require('angular');
        require('!style!css!../libs/angular-material/angular-material.css');
        require('!style!css!../stylesheets/style.css');
        require('../libs/angular-animate/angular-animate');
        require('../libs/angular-aria/angular-aria');
        require('../libs/angular-material/angular-material');
        require('../libs/angular-ui-router/release/angular-ui-router');
        angular.module('hacky.wiki', ['ngMaterial', 'ui.router']).config(wiki.RouterConfig).controller('IndexCtrl', wiki.IndexCtrl);
        angular.bootstrap(document, ['hacky.wiki']);
    })(wiki = hacky.wiki || (hacky.wiki = {}));
})(hacky || (hacky = {}));

/// <reference path="../libs/types/angularjs/angular.d.ts" />
/// <reference path="configs/routerConfig.ts" />
/// <reference path="controllers/index/indexCtrl.ts" />
/// <reference path="hacky.wiki.module.ts" />

/// <reference path='../_all.ts' />
var hacky;
(function (hacky) {
    var wiki;
    (function (wiki) {
        'use strict';
        var InitAuthencationCallback = (function () {
            function InitAuthencationCallback() {
            }
            return InitAuthencationCallback;
        })();
        wiki.InitAuthencationCallback = InitAuthencationCallback;
    })(wiki = hacky.wiki || (hacky.wiki = {}));
})(hacky || (hacky = {}));

/// <reference path='../_all.ts' />
var hacky;
(function (hacky) {
    var wiki;
    (function (wiki) {
        'use strict';
        var AuthService = (function () {
            function AuthService() {
            }
            AuthService.$inject = [];
            return AuthService;
        })();
        wiki.AuthService = AuthService;
    })(wiki = hacky.wiki || (hacky.wiki = {}));
})(hacky || (hacky = {}));
