
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
                     }
                    )

                    .state('home', {

                        url: '/home',

                        templateUrl :function(){
                            return  viewDir + "home.html";
                        },
                        controller:"homeController"
                    })

                    .state('admin', {

                        url: '/admin',

                        templateUrl :function(){
                            return  viewDir + "admin.html";
                        },
                        controller:"adminController"

                    })

                    .state('register', {

                        url: '/register',

                        templateUrl :function(){
                            return  viewDir + "registration.html";
                        },
                        controller:"registrationController"
                    })
            };

            return ["$stateProvider", "$urlRouterProvider",'$locationProvider', RouteManager];
        });

}( define ));
