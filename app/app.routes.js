(function(angular) {
    "use strict";

    var trackerAddin = angular.module('trackerAddin');
    trackerAddin.config(['$stateProvider', '$urlRouterProvider', routeConfigurator]);

    function routeConfigurator($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('activation', {
                abstract: true,
                templateUrl: 'app/activation/activation.view.html',
                url: '/activation'
            })
            .state('activation.idigima', {
                data: {
                    css: 'app/components/activation/idigima/idigima.css'
                },
                name: 'idigima',
                template: '<idigima></idigima>',
                url: '/idigima/:userId'
            })
            .state('activation.outlook365', {
                data: {
                    css: 'app/components/activation/outlook365/outlook365.css'
                },
                name: 'outlook365',
                template: '<outlook365></outlook365>',
                url: '/outlook365/:userId'
            })
            .state({
                data: {
                    css: 'app/components/home/home.css'
                },
                name: 'home',
                params: {
                    showError: false
                },
                template: '<home></home>',
                url: '/home'
            });
    }
})(window.angular);