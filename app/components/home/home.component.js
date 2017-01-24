(function(angular) {
    "use strict";

    var trackAddin = angular.module('trackerAddin');

    trackAddin.component('home', {
        bindings: {},
        controller: HomeController,
        templateUrl: 'tracker/app/components/home/home.view.html'
    });

    HomeController.$inject = ['$location', '$scope', '$state', '$stateParams', 'angularConfig', 'angularRoutes', 'redirectService', 'usersService'];

    function HomeController($location, $scope, $state, $stateParams, angularConfig, angularRoutes, redirectService, usersService) {
        var ctrl = this;
        var email = Office.context.mailbox.userProfile.emailAddress;

        var showError = $stateParams.showError;

        ctrl.$onInit = () => {
            var redirectResult = redirectService.redirectFromHome();
            if (!redirectResult) {
                if (showError === false) {
                    Office.context.mailbox.getUserIdentityTokenAsync(saveToken);
                }

                ctrl.viewModel = {
                    clientUrl: angularConfig.clientUrl,
                    component: $location.search().component,
                    disableSubmitButton: true,
                    showError: showError,
                    userId: ''
                };
            }
        };

        function saveToken(asyncResult) {
            var outlookId = asyncResult.value;

            usersService.saveUser(email, outlookId)
                .then(function(result) {
                    if (result === null || result === "" || result === undefined) {
                        ctrl.viewModel.showError = true;
                    } else {
                        ctrl.viewModel.disableSubmitButton = false;
                        ctrl.viewModel.userId = result;
                        redirectService.userId = result;
                    }
                });
        }
    }
}(window.angular));