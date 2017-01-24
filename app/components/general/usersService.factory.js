(function() {
    "use strict";

    var trackAddin = angular.module('trackerAddin');
    trackAddin.factory('usersService', usersService);

    usersService.$inject = ['$http', '$httpParamSerializerJQLike', '$log', 'angularConfig'];

    function usersService($http, $httpParamSerializerJQLike, $log, angularConfig) {
        var urls = {
            checkActivationFlow: '/users/checkActivationFlow',
            saveUser: '/users/saveUser'
        };

        var service = {
            checkActivationFlow: checkActivationFlow,
            saveUser: saveUser
        };

        return service;

        function checkActivationFlow(email) {
            var data = {
                email: email
            };

            var request = {
                method: 'POST',
                url: angularConfig.serverUrl + urls.checkActivationFlow,
                data: $httpParamSerializerJQLike(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            return $http(request)
                .then(checkActivationFlowComplete)
                .catch(checkActivationFlowFailed);

            function checkActivationFlowComplete(response) {
                if (response.data !== null && response.data !== undefined) {
                    var data = response.data;
                    if (!data.userExists) {
                        $log.error(data.message);
                    }

                    return data;
                } else {
                    $log.error("response data is undefined");
                }

                return null;
            }

            function checkActivationFlowFailed(error) {
                $log.error('XHR Failed for checkActivationFlow.' + error.data);
            }
        }

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
                if (response.data !== null && response.data !== undefined) {
                    var data = response.data;
                    if (!data.isExists) {
                        $log.error(data.message);
                    }

                    return data.result;
                } else {
                    $log.error("response data is undefined");
                }

                return null;
            }

            function saveUserFailed(error) {
                $log.error('XHR Failed for saveUser.' + error.data);
            }
        }
    }
}());