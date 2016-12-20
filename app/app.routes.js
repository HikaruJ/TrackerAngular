(function(angular) {
    "use strict";

    var trackerAddin = angular.module('trackerAddin');
    trackerAddin.config(['$stateProvider', '$urlRouterProvider', routeConfigurator]);

    function routeConfigurator($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('idigima', {
                data: {
                    css: 'app/components/idigima/idigima.css'
                },
                template: '<idigima></idigima>',
                url: '/idigima'
            })

        .state('home', {
            data: {
                css: 'app/components/home/home.css'
            },
            template: '<home></home>',
            url: '/home'
        });
    }
})(window.angular);