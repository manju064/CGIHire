// Register Modules

(function ( define ) {
    "use strict";

    define([
            'angular',
            'common/ngFader',
            'service/crudService',
            'service/candidateService',
            'service/dataService',
            'controller/appController',
            'controller/homeController',
            'controller/adminController',
            'controller/registrationController',
            'controller/candidateDetailsController'
        ],
        function (angular,ngFader
                        ,crudService,candidateService,dataService
                        ,appController,homeController
                        ,adminController,registrationController, candidateDetailsController
                    )
        {
            var moduleName = "app.modules";
            angular.module(moduleName,[])

                // Services
                .factory("crudService", crudService)
                .factory("candidateService", candidateService)
                .factory("dataService", dataService)

                .directive('ngFader',ngFader)

                // Controllers
                .controller( "appController", appController)
                .controller( "homeController", homeController)
                .controller( "adminController", adminController)
                .controller( "registrationController", registrationController)
                .controller( "candidateDetailsController", candidateDetailsController)

                console.log("Modules Loaded")

            return moduleName;
        });

}( define));
