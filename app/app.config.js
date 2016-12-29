 (function(angular) {
     "use strict";

     var trackerAddin = angular.module('trackerAddin');
     trackerAddin.config(['$httpProvider', '$locationProvider', '$translateProvider', 'cfpLoadingBarProvider', 'localStorageServiceProvider', config]);

     function config($httpProvider, $locationProvider, $translateProvider, cfpLoadingBarProvider, localStorageServiceProvider) {
         // Allow cross domain requests to be made.
         $httpProvider.defaults.useXDomain = true;
         delete $httpProvider.defaults.headers.common['X-Requested-With'];

         // Remove spinner from loading bar.
         cfpLoadingBarProvider.includeSpinner = false;

         // Local storage configuration.
         localStorageServiceProvider
             .setPrefix('trackerAddin');

         //Initialize translations
         var mailDisplayLanguage = Office.context.displayLanguage.substring(0, 2);
         if (mailDisplayLanguage === "" || mailDisplayLanguage === undefined || mailDisplayLanguage === null) {
             mailDisplayLanguage = "jp";
         }

         $translateProvider.useStaticFilesLoader({
             prefix: 'app/translations/locale-',
             suffix: '.json'
         });
         $translateProvider.preferredLanguage(mailDisplayLanguage);
     }
 })(window.angular);