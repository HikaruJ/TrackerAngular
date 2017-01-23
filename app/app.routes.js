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
            .state('activation.activated', {
                data: {
                    css: 'app/components/activation/activated/activated.css'
                },
                name: 'activated',
                params: {
                    flowResult: null
                },
                template: '<activated></activated>',
                url: '/activated/:userId'
            })
            .state('activation.idigima', {
                data: {
                    css: 'app/components/activation/idigima/idigima.css'
                },
                name: 'idigima',
                params: {
                    flowResult: null
                },
                template: '<idigima></idigima>',
                url: '/idigima/:userId'
            })
            .state('activation.outlook365', {
                data: {
                    css: 'app/components/activation/outlook365/outlook365.css'
                },
                name: 'outlook365',
                params: {
                    flowResult: null
                },
                template: '<outlook365></outlook365>',
                url: '/outlook365/:userId'
            })
            .state({
                data: {
                    css: 'app/components/home/home.css'
                },
                name: 'home',
                params: {
                    flowResult: null,
                    showError: false
                },
                template: '<home></home>',
                url: '/home',
                resolve: {
                    activationFlowStatus: function(redirectService, usersService) {
                        var email = Office.context.mailbox.userProfile.emailAddress;
                        return usersService.checkActivationFlow(email)
                            .then(function(result) {
                                redirectService.processActivationFlowResult(result);
                                return true;
                            });
                    }
                }
            });
    }
})(window.angular);