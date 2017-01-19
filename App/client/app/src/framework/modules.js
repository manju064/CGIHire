// Register Modules

(function ( define ) {
    "use strict";

    define([
            'angular',
            'service/crudService',
            'service/candidateService',
            'controller/appController',
            'controller/homeController',
            'controller/adminController',
            'controller/registrationController'
        ],
        function (angular,crudService,candidateService
                        ,appController,homeController
                        ,adminController,registrationController
                    )
        {
            var moduleName = "app.modules";
            angular.module(moduleName,[])

                // Services
                .factory( "crudService", crudService)
                .factory( "candidateService", candidateService)

                // Controllers
                .controller( "appController", appController)
                .controller( "homeController", homeController)
                .controller( "adminController", adminController)
                .controller( "registrationController", registrationController)

                console.log("Modules Loaded")

            return moduleName;
        });

}( define));
