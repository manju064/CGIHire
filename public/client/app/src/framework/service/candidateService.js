/**
 * ******************************************************************************************************
 *
 *   Service to get/update candidate details
 *
 * ******************************************************************************************************
 */
(function (define) {
    "use strict";

    define([],
        function () {
            var candidateService = function ($http, $q) {
                
                //TODO, hardcoded for production inject via config files
                //DEV Api
                //var apiUrl =  "http://localhost:8081/api";
                
                //Prod Api
                var apiUrl =  "https://cgirecruitment.azurewebsites.net/api";

                var url = apiUrl + "/Candidates";
                var serviceFactory = {

                    getAll: function () {
                        var deferred = $q.defer();
                        $http.get(url)
                            .then( (response) =>  {
                                //console.log('candidateService get ' + JSON.stringify(response.data));
                                deferred.resolve(response.data);
                            }, (error) => {
                                deferred.reject(error);
                            });

                        return deferred.promise;
                    },
                    get: function (id) {
                        var deferred = $q.defer();
                        $http.get(url + '/' + id)
                            .then( (response) => {
                                //console.log("candidateService GetId = " + JSON.stringify(response));
                                deferred.resolve(response);
                            }, (error) => {
                                 deferred.reject(error);
                            });

                        return deferred.promise;
                    },
                    save: function (data) {
                        var deferred = $q.defer();
                        //console.log("candidateService save " + JSON.stringify(data));
                        $http.post(url, data)
                        .then( (response)=>{
                            deferred.resolve(response);
                        }, (error) =>{
                            deferred.reject(error);
                        });

                       return deferred.promise;
                    }
                }
                return serviceFactory;
            };

            return ["$http", "$q", candidateService];
        });

}(define));