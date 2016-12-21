(function(angular) {
    "use strict";

    var trackAddin = angular.module('trackerAddin');

    trackAddin.component('idigima', {
        bindings: {},
        controller: ['angularConfig', IDigimaController],
        templateUrl: 'app/components/activation/idigima/idigima.view.html'
    });

    function IDigimaController(angularConfig) {
        var ctrl = this;

        ctrl.$onInit = () => {
            ctrl.viewModel = {
                baseUrl: angularConfig.baseUrl,
                proceedToNextStep: false
            };
        };

        ctrl.openIDigimaLogin = function() {
            var uri = "https://www.i-digima.com/login/token?redirect_uri=" + ctrl.viewModel.baseUrl;

            var popup = window.open(uri, 'AuthPopup', 'width=500,height=500,centerscreen=1,menubar=0,toolbar=0,location=0,personalbar=0,status=0,titlebar=0,dialog=1');
            var popupTick = setInterval(function() {
                if (popup.closed) {
                    clearInterval(popupTick);
                    console.log('window closed!');
                }
            }, 500);
        };
    }
}(window.angular));