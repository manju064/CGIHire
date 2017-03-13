
/**
 * ******************************************************************************************************
 *
 *   Route Manager
 *
 *
 * ******************************************************************************************************
 */

(function ( define ) {
    "use strict";


    define([
        ],
        function ( )
        {
            /**
             * Route manageer
             * - to be used in main.js -> angular.config()
             *
             */
            var RouteManager = function ($stateProvider, $urlRouterProvider,$locationProvider)
            {

                var viewDir = "assets/views/";
                $urlRouterProvider.otherwise("/");
                
                $locationProvider
                    .html5Mode({enabled:true, requireBase:false});

                $stateProvider
                     .state('/', {

                        url: '/',

                        controller:"appController",
                        data: {
                            requireLogin: false
                        }
                     }
                    )
                    .state('login', {

                        url: '/login',
                        
                        templateUrl :function(){
                            return  viewDir + "login.html";
                        },

                        controller:"loginController",
                        data: {
                            requireLogin: false
                        }
                     }
                    )
                    .state('home', {

                        url: '/home',

                        templateUrl :function(){
                            return  viewDir + "home.html";
                        },
                        controller:"homeController",
                        data: {
                            requireLogin: false
                        }
                    })

                    .state('admin', {

                        url: '/admin',

                        templateUrl :function(){
                            return  viewDir + "admin.html";
                        },
                        controller:"adminController",
                        data: {
                            requireLogin: true
                        }
                    })

                    .state('register', {

                        url: '/register',

                        templateUrl :function(){
                            return  viewDir + "registration.html";
                        },
                        controller:"registrationController",
                        data: {
                            requireLogin: true
                        }
                    })
                     .state('explore', {

                        url: '/explore',

                        templateUrl :function(){
                            return  viewDir + "explore.html";
                        },
                        controller:"exploreController",
                        data: {
                            requireLogin: false
                        }
                    })
                    .state('media', {

                        url: '/media',

                        templateUrl :function(){
                            return  viewDir + "media.html";
                        },
                        controller:"mediaController",
                        data: {
                            requireLogin: false
                        }
                    })
            };

            return ["$stateProvider", "$urlRouterProvider",'$locationProvider', RouteManager];
        });

}( define ));
