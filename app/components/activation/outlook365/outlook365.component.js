(function(angular) {
    "use strict";

    var trackAddin = angular.module('trackerAddin');

    trackAddin.component('outlook365', {
        bindings: {},
        controller: Outlook365Controller,
        templateUrl: 'tracker/app/components/activation/outlook365/outlook365.view.html'
    });

    Outlook365Controller.$inject = ['$scope', '$state', '$stateParams', 'angularConfig', 'angularRoutes', 'office365Config', 'office365Service'];

    function Outlook365Controller($scope, $state, $stateParams, angularConfig, angularRoutes, office365Config, office365Service) {
        var ctrl = this;

        var userId = $stateParams.userId;
        if (userId === null || userId === "" || userId === undefined) {
            $state.go(angularRoutes.home, { showError: true });
        }

        ctrl.$onInit = () => {
            ctrl.viewModel = {
                clientUrl: angularConfig.clientUrl,
                serverUrl: angularConfig.serverUrl
            };
        };

        ctrl.openOffice365Login = function() {
            var clientId = office365Config.applicationId;
            var nounce = office365Config.secretKey;
            var scope = "openid+offline_access+profile+https://outlook.office.com/mail.readwrite+https://outlook.office.com/mail.readwrite.shared+https://outlook.office.com/mail.send+https://outlook.office.com/mail.send.shared+https://outlook.office.com/calendars.readwrite+https://outlook.office.com/calendars.readwrite.shared+https://outlook.office.com/contacts.readwrite+https://outlook.office.com/tasks.readwrite";
            var response_type = "code";
            var redirect_uri = ctrl.viewModel.serverUrl + "/office365/authenticate/";
            var uri = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?";

            var popup = window.open(uri + 'client_id=' + clientId + '&scope=' + scope + '&response_type=' + response_type + '&nonce=' + nounce + '&redirect_uri=' + redirect_uri, 'AuthPopup', 'width=500,height=500,centerscreen=1,menubar=0,toolbar=0,location=0,personalbar=0,status=0,titlebar=0,dialog=1');
            var popupTick = setInterval(function() {
                if (popup.closed) {
                    clearInterval(popupTick);
                    console.log('window closed!');
                }
            }, 500);

            office365Service.isTokenValid(userId);
        };

        office365Service.subscribe($scope, function finishedLogin() {
            redirectService.redirectFromOffice365();
        });
    }
}(window.angular));