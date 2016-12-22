(function() {
    "use strict";

    var trackAddin = angular.module('trackerAddin');
    trackAddin.factory('usersService', usersService);

    usersService.$inject = ['$http', '$log', 'angularConfig'];

    function usersService($http, $log, angularConfig) {
        var urls = {
            saveUser: '/users'
        };

        var service = {
            saveUser: saveUser
        };

        return service;

        function saveUser(outlookId) {
            $.post(angularConfig.serverUrl + urls.saveUser, {
                    outlookId: outlookId
                },
                function(data, status) {
                    debugger;
                    alert("Data: " + data + "\nStatus: " + status);
                });

            //     debugger;
            //     var request = {
            //         method: 'POST',
            //         url: angularConfig.serverUrl + urls.saveUser,
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         data: { outlookId: outlookId }
            //     };

            //     return $http(request)
            //         .then(saveUserComplete)
            //         .catch(saveUserFailed);

            //     function saveUserComplete(response) {
            //         return response.data.results;
            //     }

            //     function saveUserFailed(error) {
            //         $log.error('XHR Failed for saveUser.' + error.data);
            //     }
        }
    }
}());