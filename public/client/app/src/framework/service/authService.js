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
            var authService = function ($http, $q, $window, $localStorage)
            {
                
                //TODO, hardcoded for production inject via config files
                //DEV Api
                var apiUrl =  "http://localhost:8081/api";
                
                //Prod Api
                //var apiUrl =  "https://cgirecruitment.azurewebsites.net/api";

                var url = apiUrl + "/auth";
                var serviceFactory = {
                    saveToken: function(token){
                        this.removeToken();
                        $localStorage.token = token;
                    },
                    getToken : function(){
                        return $localStorage.token;
                    },
                    removeToken: function(){
                         delete $localStorage.token;
                    },
                    login : function(user) {
                        var deferred = $q.defer();
                        $http.post(url + '/login', {username:user.name, password:user.password})
                            .then( (response) =>  {
                                this.saveToken(response.data.token);
                                deferred.resolve(true);
                            }, (error) => {
                                deferred.reject(error);
                            });

                        return deferred.promise;
                    },
                    logOut : function(user) {
                        var deferred = $q.defer();
                        $http.post(url + '/logout', user)
                            .then( (response) =>  {
                                this.removeToken();
                                deferred.resolve(response.data);
                            }, (error) => {
                                deferred.reject(error);
                            });

                        return deferred.promise;
                    },
                    isLoggedIn : function(){
                        var token = this.getToken();
                        var payload;

                        if(token){
                            return true;
                            /*TODO, manage session expiry
                            payload = token.split('.')[1];
                            payload = $window.atob(payload);
                            payload = JSON.parse(payload);
                            */
                            return payload.exp > Date.now() / 1000;
                        } else {
                            return false;
                        }
                    },
                    getCurrentUser : function() {
                        if(this.isLoggedIn()){
                            var token = this.getToken();
                            var payload = token.split('.')[1];
                            payload = $window.atob(payload);
                            payload = JSON.parse(payload);
                            return {
                                name : payload.displayName,
                                email : payload.username
                            };
                        }
                    }
                }
                return serviceFactory;
            };

            return ["$http", "$q",'$window', '$localStorage', authService];
        });

}( define ));
