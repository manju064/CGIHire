/**
 * ******************************************************************************************************
 *
 *   crud Service
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

                crudServiceFactory.get = function (url) {
                    return $http.get(url)
                        .then(function (data){
                          return data;
                        },function (error){
                            return error;
                        });
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
