(function() {
    "use strict";

    var trackAddin = angular.module('trackerAddin');
    trackAddin.factory('redirectService', redirectService);

    redirectService.$inject = ['$log', '$state', 'angularRoutes'];

    function redirectService($log, $state, angularRoutes) {
        var idigimaTokenValid, outlook365TokenValid, userExists, userId;

        var service = {
            processActivationFlowResult: processActivationFlowResult,
            redirectFromHome: redirectFromHome,
            redirectFromIDigima: redirectFromIDigima,
            redirectFromOffice365: redirectFromOffice365,
            userId: userId
        };

        return service;

        //Sepearate variables from the Activation Flow result
        function processActivationFlowResult(activationFlowResult) {
            if (activationFlowResult === null || activationFlowResult === undefined) {
                $state.go(angularRoutes.home, { showError: true });
            } else {
                idigimaTokenValid = Boolean(activationFlowResult.idigimaTokenValid);
                outlook365TokenValid = Boolean(activationFlowResult.outlook365TokenValid);
                userExists = Boolean(activationFlowResult.userExists);
                userId = activationFlowResult.userId;
            }
        }

        //Check the Activation flow result parameters and redirect accordingly from the home page
        function redirectFromHome() {
            if (idigimaTokenValid && outlook365TokenValid & userExists) {
                $state.go(angularRoutes.activated, { userId: userId });
                return true;
            } else if (!idigimaTokenValid && !outlook365TokenValid & userExists) {
                $state.go(angularRoutes.idigima, { userId: userId });
                return true;
            } else if (!idigimaTokenValid && outlook365TokenValid & userExists) {
                $state.go(angularRoutes.idigima, { userId: userId });
                return true;
            } else if (idigimaTokenValid && !outlook365TokenValid & userExists) {
                $state.go(angularRoutes.outlook365, { userId: userId });
                return true;
            } else {
                return false;
            }
        }

        //Check the Activation flow result parameters and redirect accordingly from the idigima login page
        function redirectFromIDigima() {
            if (outlook365TokenValid) {
                $state.go(angularRoutes.activated, { userId: userId });
            } else {
                $state.go(angularRoutes.outlook365, { userId: userId });
            }

            return true;
        }

        //Check the Activation flow result parameters and redirect accordingly from the office365 login page
        function redirectFromOffice365() {
            $state.go(angularRoutes.activated, { userId: userId });
            return true;
        }
    }
}());