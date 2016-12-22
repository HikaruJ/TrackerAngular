(function(angular) {
    "use strict";

    var trackAddin = angular.module('trackerAddin');

    trackAddin.component('home', {
        bindings: {},
        controller: HomeController,
        templateUrl: 'app/components/home/home.view.html'
    });

    HomeController.$inject = ['$location', 'angularConfig', 'usersService'];

    function HomeController($location, angularConfig, usersService) {
        var ctrl = this;

        ctrl.$onInit = () => {
            Office.context.mailbox.getUserIdentityTokenAsync(saveToken);

            ctrl.viewModel = {
                baseUrl: angularConfig.baseUrl,
                component: $location.search().component,
                disableSubmitButton: true
            };
        };

        function saveToken(asyncResult) {
            var outlookId = asyncResult.value;
            usersService.saveUser(outlookId);
            // .then(function() {
            //     debugger;
            //     ctrl.viewModel.disableSubmitButton = false;
            // });
        }
    }
}(window.angular));