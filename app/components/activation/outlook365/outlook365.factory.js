(function() {
    "use strict";

    var trackAddin = angular.module('trackerAddin');
    trackAddin.factory('office365Service', office365Service);

    office365Service.$inject = ['$http', '$httpParamSerializerJQLike', '$interval', '$log', '$rootScope', 'angularConfig'];

    function office365Service($http, $httpParamSerializerJQLike, $interval, $log, $rootScope, angularConfig) {
        var cancelPromise;

        var urls = {
            isSubscriptionValid: '/office365/isSubscriptionValid'
        };

        var service = {
            isSubscriptionValid: isSubscriptionValid,
            subscribe: subscribe
        };

        return service;

        function isSubscriptionValid(userId) {
            cancelPromise = $interval(function() {
                var data = {
                    userId: userId
                };

                var request = {
                    method: 'POST',
                    url: angularConfig.serverUrl + urls.isSubscriptionValid,
                    data: $httpParamSerializerJQLike(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };

                $http(request)
                    .then(isSubscriptionValidComplete)
                    .catch(isSubscriptionValidFailed);

                function isSubscriptionValidComplete(response) {
                    if (response.data !== null && response.data !== undefined) {
                        var data = response.data;
                        if (data.isValid) {
                            $rootScope.$emit('office365-service-event');
                            $interval.cancel(cancelPromise);
                        } else {
                            $log.error(data.message);
                        }
                    } else {
                        $log.error("response data is undefined");
                    }
                }

                function isSubscriptionValidFailed(error) {
                    $log.error('XHR Failed for isSubscriptionValid.' + error.data);
                    $interval.cancel(cancelPromise);
                }
            }, 5000);
        }

        function subscribe(scope, callback) {
            var handler = $rootScope.$on('office365-service-event', callback);
            scope.$on('$destroy', handler);
        }
    }
}());