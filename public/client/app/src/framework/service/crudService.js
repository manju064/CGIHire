/**
 * ******************************************************************************************************
 *
 *   crud Service
 *   TODO, not in use
 *
 * ******************************************************************************************************
 */
(function ( define ) {
    "use strict";

    define([
        ],
        function ( )
        {
            var crudService = function ($http, $q)
            {
                var crudServiceFactory = {};
                var deferred = $q.defer();

                //TODO, inject via config files
                //DEV Api
                //crudServiceFactory.apiUrl =  "http://localhost:8081/api";
                
                //Prod Api
                //crudServiceFactory.apiUrl =  "https://cgirecruitment.azurewebsites.net/api";

                crudServiceFactory.get = function (url) {
                     $http.get(url)
                        .then(function (response){
                          console.log('crudServiceFactory get' + JSON.stringify(response.data));
                          deferred.resolve(response.data);
                        },function (error){
                            deferred.reject(error);
                        });

                    return deferred.promise;
                };

                crudServiceFactory.getId = function (url, id) {
                    return $http.get(url + '/' + id)
                        .then(function (data){
                          console.log("crudServiceFactory GetId = " + JSON.stringify(data));
                          return data;
                        },function (error){
                            return error;
                        });
                };

                crudServiceFactory.post = function (url) {
                    return $http.post(url)
                       .then(function (data){
                          return data;
                        },function (error){
                            return error;
                        });
                };

                crudServiceFactory.put = function (url) {
                    return $http.put(url)
                        .then(function (data){
                          return data;
                        },function (error){
                            return error;
                        });
                };

                crudServiceFactory.postModel = function (url, model) {
                    return $http.post(url, model)
                        .then(function (data){
                          return data;
                        },function (error){
                            return error;
                        });
                };

                crudServiceFactory.deleteItem = function (url, id) {
                    return $http.delete(url + '/' + id)
                        .then(function (data){
                          return data;
                        },function (error){
                            return error;
                        });
                };

                return crudServiceFactory;
            };

            return ["$http", "$q", crudService];
        });

}( define ));
