(function(angular) {
    "use strict";

    var config = {
        baseUrl: "https://localhost:8443",
        serverUrl: "http://localhost:8000/api"
    };

    var trackAddin = angular.module('trackerAddin');
    trackAddin.constant("angularConfig", config);
})(window.angular);