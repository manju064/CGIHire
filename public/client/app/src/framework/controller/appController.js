/**
 * Register the AppController class with RequireJS
 */
(function( define ) {
    "use strict";

    define( ['model/appModel'],

        function (appModel)
        {
            /**
             * AppController
             * @constructor
             */
            var appController = function(crudService, $translate, tmhDynamicLocale, $state, $rootScope, $scope, authService)
            {
                console.log("AppController Initialized");
                var _appModel = appModel.getInstance();
                $rootScope.language = "nl";
                //Update application init data
                $rootScope.languageSelectionEnabled = false;
                $rootScope.isLoggedIn = false;
                tmhDynamicLocale.set($rootScope.language);
                
                $scope.selectedEvent = {};
                
                //Remove token on start of application
                authService.removeToken();

                $rootScope.changeLanguage = function(langKey){
                    console.log("AppController change Language " + langKey);
                    $rootScope.language = langKey;
                    $translate.use(langKey); 
                    tmhDynamicLocale.set(langKey);
                }

                //After setting go to home state
                $state.go('login');

                $rootScope.signOut = function(){
                     authService.logOut($scope.user).then(function(result){
                        console.log('Logout successful ' + JSON.stringify(result));
                        //TODO persist actual user clicked state and navigate
                        //Might need to implement login model for cleaner implementation
                        $rootScope.isLoggedIn = false;
                        $rootScope.currentUser = "";
                        $rootScope.selectedEvent = null;
                        $state.go('home');
                    });
                }

                $rootScope.signIn = function() {
                    $rootScope.isLoggedIn = false;
                    $rootScope.currentUser = "";
                    $state.go('login');
                }
            };

            return ['crudService', '$translate',  'tmhDynamicLocale', '$state','$rootScope', '$scope', 'authService', appController];
        });

}( define ));