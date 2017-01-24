(function(angular) {
    "use strict";

    var trackAddin = angular.module('trackerAddin');

    trackAddin.component('activated', {
        bindings: {},
        controller: ActivatedController,
        templateUrl: 'tracker/app/components/activation/activated/activated.view.html'
    });

    ActivatedController.$inject = ['$state', '$stateParams', 'angularConfig', 'angularRoutes'];

    function ActivatedController($state, $stateParams, angularConfig, angularRoutes) {
        var ctrl = this;

        var userId = $stateParams.userId;
        if (userId === null || userId === "" || userId === undefined) {
            $state.go(angularRoutes.home, { showError: true });
        }

        ctrl.$onInit = () => {
            ctrl.viewModel = {
                clientUrl: angularConfig.clientUrl
            };
        };
    }
}(window.angular));