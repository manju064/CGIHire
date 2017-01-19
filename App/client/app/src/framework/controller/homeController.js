/**
 * Register the home Controller class with RequireJS
 */
(function( define ) {
    "use strict";

    define( ['model/appModel'],

        function (appModel)
        {
            /**
             * @constructor
             */
            var homeController = function($scope)
            {
                console.log("home Controller Initialized");
                //$scope.content = appModel.getInstance().getData().pages[1].content;
            };

            return ["$scope",homeController];
        });

}( define ));