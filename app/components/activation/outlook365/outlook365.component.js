(function(angular) {
    "use strict";

    var trackAddin = angular.module('trackerAddin');

    trackAddin.component('outlook365', {
        bindings: {},
        controller: ['angularConfig', Outlook365Controller],
        templateUrl: 'app/components/activation/outlook365/outlook365.view.html'
    });

    function Outlook365Controller(angularConfig) {
        var ctrl = this;

        ctrl.$onInit = () => {
            ctrl.viewModel = {
                baseUrl: angularConfig.baseUrl,
                proceedToNextStep: false
            };
        };

        ctrl.openOffice365Login = function() {
            var clientId = "901f2b04-0fb8-4981-be36-caa7c367e073";
            var nounce = "972349823749237982";
            var scope = "https://outlook.office.com/mail.read";
            var response_type = "code";
            var redirect_uri = "http://localhost:8000/api/office365/authenticate";
            var uri = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?";

            var popup = window.open(uri + 'client_id=' + clientId + '&scope=' + scope + '&response_type=' + response_type + '&redirect_uri=' + redirect_uri + '&nonce=' + nounce, 'AuthPopup', 'width=500,height=500,centerscreen=1,menubar=0,toolbar=0,location=0,personalbar=0,status=0,titlebar=0,dialog=1');
            var popupTick = setInterval(function() {
                if (popup.closed) {
                    clearInterval(popupTick);
                    console.log('window closed!');
                }
            }, 500);
        };
    }
}(window.angular));