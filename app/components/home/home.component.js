(function(angular) {
    "use strict";

    var trackAddin = angular.module('trackerAddin');

    trackAddin.component('home', {
        bindings: {},
        controller: HomeController,
        templateUrl: 'app/components/home/home.view.html'
    });

    HomeController.$inject = ['$location', '$stateParams', 'angularConfig', 'usersService'];

    function HomeController($location, $stateParams, angularConfig, usersService) {
        var ctrl = this;

        var showError = $stateParams.showError;

        ctrl.$onInit = () => {
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
        };

        function saveToken(asyncResult) {
            var email = Office.context.mailbox.userProfile.emailAddress;
            var outlookId = asyncResult.value;

            usersService.saveUser(email, outlookId)
                .then(function(result) {
                    if (result === null || result === "" || result === undefined) {
                        ctrl.viewModel.showError = true;
                    } else {
                        ctrl.viewModel.disableSubmitButton = false;
                        ctrl.viewModel.userId = result;
                    }
                });
        }
    }
}(window.angular));