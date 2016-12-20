(function(angular) {
    "use strict";

    var trackerAddin = angular.module('trackerAddin', [
        'angular-loading-bar', 'LocalStorageModule', 'ui.router', 'uiRouterStyles'
    ]);

    trackerAddin.config(['$httpProvider', 'localStorageServiceProvider', 'cfpLoadingBarProvider', '$locationProvider', config]);

    function config($httpProvider, localStorageServiceProvider, cfpLoadingBarProvider, $locationProvider) {
        // Remove the '#' from the URL.
        // $locationProvider.html5Mode(true).hashPrefix('!');

        // Allow cross domain requests to be made.
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        // Local storage configuration.
        localStorageServiceProvider
            .setPrefix('trackerAddin');

        // Remove spinner from loading bar.
        cfpLoadingBarProvider.includeSpinner = false;
    }

    // when Office has initalized, manually bootstrap the app
    Office.initialize = function() {
        console.log('>>> Office.initialize()');
        angular.bootstrap(document.getElementById('container'), ['officeAddin']);
    };
})(window.angular);