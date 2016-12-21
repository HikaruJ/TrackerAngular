(function(angular) {
    "use strict";

    var trackAddin = angular.module('trackerAddin');

    trackAddin.component('home', {
        bindings: {},
        controller: ['$location', 'angularConfig', HomeController],
        templateUrl: 'app/components/home/home.view.html'
    });

    function HomeController($location, angularConfig) {
        var ctrl = this;

        ctrl.$onInit = () => {
            Office.context.mailbox.getUserIdentityTokenAsync(saveToken);

            ctrl.viewModel = {
                baseUrl: angularConfig.baseUrl,
                component: $location.search().component
            };
        };
    }

    function saveToken(asyncResult) {
        var token = asyncResult.value;
    }
}(window.angular));