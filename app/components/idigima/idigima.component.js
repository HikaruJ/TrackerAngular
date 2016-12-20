(function(angular) {
    "use strict";

    var trackAddin = angular.module('trackerAddin');

    trackAddin.component('idigima', {
        bindings: {},
        controller: IDigimaController,
        templateUrl: 'app/components/idigima/idigima.view.html'
    });

    function IDigimaController(angularConfig) {
        debugger;
        //The Office initialize function must be run each time a new page is loaded
        Office.initialize = function(reason) {
            app.initialize();
        };

        var ctrl = this;
    }
}(window.angular));