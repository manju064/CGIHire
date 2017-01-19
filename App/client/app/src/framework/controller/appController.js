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
            var appController = function(crudService, $translate, tmhDynamicLocale, $state, $rootScope, $scope)
            {
                console.log("AppController Initialized");
                var _appModel = appModel.getInstance();
                $rootScope.language = "nl";
                //Update application init data

                tmhDynamicLocale.set($rootScope.language);

                $rootScope.changeLanguage = function(langKey){
                    console.log("AppController change Language " + langKey);
                    $rootScope.language = langKey;
                    $translate.use(langKey); 
                    tmhDynamicLocale.set(langKey);
                }

                //After setting go to home state
                $state.go('home');
            };

            return ['crudService', '$translate',  'tmhDynamicLocale', '$state','$rootScope', '$scope', appController];
        });

}( define ));