(function(angular) {
    "use strict";

    var trackAddin = angular.module('trackerAddin');

    trackAddin.component('outlook365', {
        bindings: {},
        controller: Outlook365Controller,
        templateUrl: 'app/components/activation/outlook365/outlook365.view.html'
    });

    Outlook365Controller.$inject = ['$state', '$stateParams', 'angularConfig', 'angularRoutes', 'office365Config'];

    function Outlook365Controller($state, $stateParams, angularConfig, angularRoutes, office365Config) {
        var ctrl = this;

        var userId = $stateParams.userId;
        if (userId === null || userId === "" || userId === undefined) {
            $state.go(angularRoutes.home, { showError: true });
        }

        ctrl.$onInit = () => {
            ctrl.viewModel = {
                clientUrl: angularConfig.clientUrl,
                proceedToNextStep: false,
                serverUrl: angularConfig.serverUrl
            };
        };

        ctrl.openOffice365Login = function() {
            var clientId = office365Config.applicationId;
            var nounce = office365Config.secretKey;
            var scope = "https://outlook.office.com/mail.read";
            var response_type = "code";
            var redirect_uri = ctrl.viewModel.serverUrl + "/office365/authenticate?userId=" + userId;
            var uri = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?";

            var popup = window.open(uri + 'client_id=' + clientId + '&scope=' + scope + '&response_type=' + response_type + '&nonce=' + nounce + '&redirect_uri=' + redirect_uri, 'AuthPopup', 'width=500,height=500,centerscreen=1,menubar=0,toolbar=0,location=0,personalbar=0,status=0,titlebar=0,dialog=1');
            var popupTick = setInterval(function() {
                if (popup.closed) {
                    clearInterval(popupTick);
                    console.log('window closed!');
                }
            }, 500);
        };
    }
}(window.angular));