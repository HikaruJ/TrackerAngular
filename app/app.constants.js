(function(angular) {
    "use strict";

    var angularConfig = {
        clientUrl: "https://localhost:8443",
        serverUrl: "https://4e629599.ngrok.io/api"
    };

    var angularRoutes = {
        home: "home",
        idigima: "activation.idigima",
        outlook365: "activation.outlook365"
    };

    var idigimaConfig = {
        tokenUrl: "https://www.i-digima.com/login/token?redirect_uri="
    };

    var office365Config = {
        applicationId: "37ff3cfe-950c-4ed8-bac5-23b598ba43d8",
        secretKey: "ngb41oHnnaMQdvoYHv9Cic0"
    };

    var trackAddin = angular.module('trackerAddin');
    trackAddin.constant("angularConfig", angularConfig);
    trackAddin.constant("angularRoutes", angularRoutes);
    trackAddin.constant("idigimaConfig", idigimaConfig);
    trackAddin.constant("office365Config", office365Config);
})(window.angular);