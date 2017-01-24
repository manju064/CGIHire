/**
 * ******************************************************************************************************
 *
 *   Service to get/update candidate details
 *
 * ******************************************************************************************************
 */
(function (define) {
    "use strict";

    define([
    ],
        function () {
            var candidateService = function ($q, crudService) {
                var deferred = $q.defer();
                var baseUrl = "http://localhost:8081/api/Candidates/";

                var serviceFactory = {
                    
                    getAll: function () {
                        return crudService.get(baseUrl).then(function (response) {
                            deferred.resolve(response);
                            return deferred.promise;
                        });
                    },
                    get: function (id) {
                        return crudService.getId(baseUrl, id).then(function (response) {
                            deferred.resolve(response);
                            return deferred.promise;
                        });
                    },
                    save:  function (data) {
                    	console.log("candidateService save " + JSON.stringify(data));
                        return crudService.postModel(baseUrl, data).then(function (response) {
                            deferred.resolve(response);
                            return deferred.promise;
                        });
                    }   
                }
                return serviceFactory;
            };

            return ["$q", "crudService", candidateService];
        });

} (define));
