(function() {
    "use strict";

    var trackAddin = angular.module('trackerAddin');
    trackAddin.factory('usersService', usersService);

    usersService.$inject = ['$http', '$httpParamSerializerJQLike', '$log', 'angularConfig'];

    function usersService($http, $httpParamSerializerJQLike, $log, angularConfig) {
        var urls = {
            saveUser: '/users'
        };

        var service = {
            saveUser: saveUser
        };

        return service;

        function saveUser(email, outlookId) {
            var data = {
                email: email,
                outlookId: outlookId
            };

            var request = {
                method: 'POST',
                url: angularConfig.serverUrl + urls.saveUser,
                data: $httpParamSerializerJQLike(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            return $http(request)
                .then(saveUserComplete)
                .catch(saveUserFailed);

            function saveUserComplete(response) {
                return response.data;
            }

            function saveUserFailed(error) {
                $log.error('XHR Failed for saveUser.' + error.data);
            }
        }
    }
}());