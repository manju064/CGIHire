/**
 * Register the exploreController class with RequireJS
 */
(function( define ) {
    "use strict";

    define( ['model/appModel'],

        function (appModel)
        {
            /**
             * exploreController
             * @constructor
             */
            var exploreController = function($scope)
            {
                console.log("AppController Initialized");
            };

            return [ '$scope', exploreController];
        });

}( define ));