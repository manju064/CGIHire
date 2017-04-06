/**
 * ******************************************************************************************************
 *
 *   Service to get/update data lookups
 *
 * ******************************************************************************************************
 */
(function (define) {
    "use strict";

    define([],
        function () {
            var dataService = function ($http, $q) {
                
                //TODO, hardcoded for production inject via config files
                //DEV Api
                //var apiUrl =  "http://localhost:8081/api";
                
                //Prod Api
                var apiUrl =  "https://cgirecruitment.azurewebsites.net/api";

                var url = apiUrl + "/dataLookUp";
                var serviceFactory = {

                    get: function (name) {
                        var deferred = $q.defer();
                        $http.get(url + '/' + name)
                            .then( (response) => {
                            deferred.resolve(response);
                        }, (error) => {
                                deferred.reject(error);
                        });

                        return deferred.promise;
                    },
                }
                return serviceFactory;
            };

            return ["$http", "$q", dataService];
        });

}(define));