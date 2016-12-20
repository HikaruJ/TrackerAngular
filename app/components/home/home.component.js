(function(angular) {
    "use strict";

    var trackAddin = angular.module('trackerAddin');

    trackAddin.component('home', {
        bindings: {},
        controller: HomeController,
        templateUrl: 'app/components/home/home.view.html'
    });

    function HomeController(angularConfig) {
        debugger;
        //The Office initialize function must be run each time a new page is loaded
        Office.initialize = function(reason) {
            app.initialize();
        };

        var ctrl = this;
        ctrl.viewModel = {
            baseUrl: angularConfig.baseUrl,
            content: {
                description: 'This add-in helps you be productive at work!',
                title: 'WELCOME',
                submitButtonLabel: 'Get Started!'
            }
        };
    }
}(window.angular));