(function(angular) {
    "use strict";

    var trackAddin = angular.module('trackerAddin');

    trackAddin.component('idigima', {
        bindings: {},
        controller: IDigimaController,
        templateUrl: 'app/components/activation/idigima/idigima.view.html'
    });

    IDigimaController.$inject = ['$scope', '$state', '$stateParams', 'angularConfig', 'angularRoutes', 'idigimaConfig', 'idigimaService', 'redirectService'];

    function IDigimaController($scope, $state, $stateParams, angularConfig, angularRoutes, idigimaConfig, idigimaService, redirectService) {
        var ctrl = this;

        var userId = $stateParams.userId;
        if (userId === null || userId === "" || userId === undefined) {
            $state.go(angularRoutes.home, { showError: true });
        }

        ctrl.$onInit = () => {
            ctrl.viewModel = {
                clientUrl: angularConfig.clientUrl,
                proceedToNextStep: false,
                userId: userId
            };
        };

        ctrl.openIDigimaLogin = function() {
            var redirect_uri = angularConfig.serverUrl + "/idigima/saveToken?userId=" + userId + "&";
            var uri = idigimaConfig.tokenUrl + redirect_uri;

            var popup = window.open(uri, 'AuthPopup', 'width=500,height=500,centerscreen=1,menubar=0,toolbar=0,location=0,personalbar=0,status=0,titlebar=0,dialog=1');
            idigimaService.isTokenValid(userId);
        };

        idigimaService.subscribe($scope, function finishedLogin() {
            redirectService.redirectFromIDigima();
        });
    }
}(window.angular));