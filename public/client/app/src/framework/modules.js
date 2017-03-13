// Register Modules

(function ( define ) {
    "use strict";

    define([
            'angular',
            'common/ngFader',
            'service/crudService',
            'service/candidateService',
            'service/dataService',
            'service/authService',
            'controller/appController',
            'controller/homeController',
            'controller/adminController',
            'controller/registrationController',
            'controller/candidateDetailsController',
            'controller/loginController',
            'controller/exploreController',
            'controller/mediaController'            
        ],
        function (angular,ngFader
                        ,crudService,candidateService,dataService,authService 
                        ,appController,homeController
                        ,adminController,registrationController, 
                        candidateDetailsController,loginController
                        ,exploreController, mediaController
                    )
        {
            var moduleName = "app.modules";
            angular.module(moduleName,[])

                // Services
                .factory("crudService", crudService)
                .factory("candidateService", candidateService)
                .factory("dataService", dataService)
                .factory("authService", authService)

                .directive('ngFader',ngFader)

                // Controllers
                .controller( "appController", appController)
                .controller( "homeController", homeController)
                .controller( "adminController", adminController)
                .controller( "registrationController", registrationController)
                .controller( "candidateDetailsController", candidateDetailsController)
                .controller( "loginController", loginController)
                .controller( "exploreController", exploreController)
                .controller( "mediaController", mediaController)

                console.log("Modules Loaded")

            return moduleName;
        });

}( define));
