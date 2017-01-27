(function() {
    "use strict";

    var trackAddin = angular.module('trackerAddin');
    trackAddin.factory('idigimaService', idigimaService);

    idigimaService.$inject = ['$http', '$httpParamSerializerJQLike', '$interval', '$log', '$rootScope', 'angularConfig'];

    function idigimaService($http, $httpParamSerializerJQLike, $interval, $log, $rootScope, angularConfig) {
        var cancelPromise;

        var urls = {
            isTokenValid: '/idigima/isTokenValid'
        };

        var service = {
            isTokenValid: isTokenValid,
            subscribe: subscribe
        };

        return service;

        function isTokenValid(userId) {
            cancelPromise = $interval(function() {
                var data = {
                    userId: userId
                };

                var request = {
                    method: 'POST',
                    url: angularConfig.serverUrl + urls.isTokenValid,
                    data: $httpParamSerializerJQLike(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };

                $http(request)
                    .then(isTokenValidComplete)
                    .catch(isTokenValidFailed);

                function isTokenValidComplete(response) {
                    if (response.data !== null && response.data !== undefined) {
                        var data = response.data;
                        if (data.isValid) {
                            $rootScope.$emit('idigima-service-event');
                            $interval.cancel(cancelPromise);
                        } else {
                            $log.error(data.message);
                        }
                    } else {
                        $log.error("response data is undefined");
                    }
                }

                function isTokenValidFailed(error) {
                    $log.error('XHR Failed for isTokenValid.' + error.data);
                    $interval.cancel(cancelPromise);
                }
            }, 5000);
        }

        function subscribe(scope, callback) {
            var handler = $rootScope.$on('idigima-service-event', callback);
            scope.$on('$destroy', handler);
        }
    }
}());