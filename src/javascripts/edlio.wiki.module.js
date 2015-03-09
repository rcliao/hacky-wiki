/// <reference path="lib.d.ts" />
var edlio;
(function (edlio) {
    var wiki;
    (function (wiki) {
        var angular = require('angular');
        require('!style!css!../stylesheets/style.css');
        angular.module('edlio.wiki', []).run(function () {
            console.log('Hello wiki!');
        });
        angular.bootstrap(document, ['edlio.wiki']);
    })(wiki = edlio.wiki || (edlio.wiki = {}));
})(edlio || (edlio = {}));
