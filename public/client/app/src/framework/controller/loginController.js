/**
 * Register the LoginController class with RequireJS
 */
(function( define ) {
    "use strict";

    define( ['model/appModel'],

        function (appModel)
        {
            /**
             * LoginController
             * @constructor
             */
            var LoginController = function($state, $rootScope, $scope, $translate,authService)
            {
                console.log("LoginController Initialized");
                $scope.user = {};

                $scope.login = function(){
                   //After setting go to home state
                    authService.login($scope.user).then(function(result){
                        console.log('Login successful ' + JSON.stringify(result));
                        //TODO persist actual user clicked state and navigate
                        //Might need to implement login model for cleaner implementation
                        $rootScope.isLoggedIn = true;
                        $rootScope.currentUser = authService.getCurrentUser();
                        $rootScope.signInLabel = $translate.instant('Logout');
                        $state.go('home');
                        $rootScope.loginIntiated = true;
                    });
                }
            };

            return ['$state','$rootScope', '$scope','$translate','authService', LoginController];
        });

}( define ));