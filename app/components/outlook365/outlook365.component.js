(function(angular) {
    "use strict";

    var trackAddin = angular.module('trackerAddin');

    trackAddin.component('outlook365', {
        bindings: {},
        controller: Outlook365Controller,
        templateUrl: 'app/components/outlook365/outlook365.view.html'
    });

    function Outlook365Controller(angularConfig) {
        debugger;
        //The Office initialize function must be run each time a new page is loaded
        Office.initialize = function(reason) {
            app.initialize();
        };

        var ctrl = this;
        ctrl.viewModel = {
            baseUrl: angularConfig.baseUrl,
            proceedToNextStep: false
        };

        ctrl.openOffice365Login = function() {
            var clientId = "";
            var nounce = "";
            var scope = "https://outlook.office.com/mail.read";
            var response_type = "code";
            var redirect_uri = "http://localhost:8080/trackerAPI/api/tokens";
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