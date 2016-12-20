(function(angular) {
    "use strict";

    var config = {
        baseUrl: "https://localhost:8443/"
    };

    var trackAddin = angular.module('trackerAddin');
    trackAddin.constant("angularConfig", config);
})(window.angular);