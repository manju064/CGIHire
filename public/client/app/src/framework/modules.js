// Register Modules

(function ( define ) {
    "use strict";

    define([
            'angular',
            'common/ngFader',
            'service/crudService',
            'service/candidateService',
            'controller/appController',
            'controller/homeController',
            'controller/adminController',
            'controller/registrationController'
        ],
        function (angular,ngFader
                        ,crudService,candidateService
                        ,appController,homeController
                        ,adminController,registrationController
                    )
        {
            var moduleName = "app.modules";
            angular.module(moduleName,[])

                // Services
                .factory( "crudService", crudService)
                .factory( "candidateService", candidateService)

                .directive('ngFader',ngFader)

                // Controllers
                .controller( "appController", appController)
                .controller( "homeController", homeController)
                .controller( "adminController", adminController)
                .controller( "registrationController", registrationController)

                console.log("Modules Loaded")

            return moduleName;
        });

}( define));
