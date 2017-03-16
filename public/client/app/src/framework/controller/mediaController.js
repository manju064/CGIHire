/**
 * Register the mediaController class with RequireJS
 */
(function( define ) {
    "use strict";

    define( ['model/appModel'],

        function (appModel)
        {
            /**
             * mediaController
             * @constructor
             */
            var mediaController = function($scope,Lightbox)
            {
                console.log("Media Controller Initialized");

                $scope.videos = [
                        {
                            'type': 'video',
                            'url': 'https://youtu.be/wirThwSCEfw',
                            'thumbUrl': 'http://img.youtube.com/vi/wirThwSCEfw/0.jpg' ,
                            'caption': 'Spark Innovation Center'
                        },
                         {
                            'type': 'video',
                            'url': 'https://youtu.be/f-8X9p1o5UY',
                            'thumbUrl': 'http://img.youtube.com/vi/f-8X9p1o5UY/0.jpg' ,
                            'caption': 'SpaceX Hyperloop'
                        },
                         {
                            'type': 'video',
                            'url': 'https://www.youtube.com/watch?v=-yUqoprrNzs',
                            'thumbUrl': 'http://img.youtube.com/vi/-yUqoprrNzs/0.jpg' ,
                            'caption': 'Dream inspired. Client driven.'
                        }
                ];

                $scope.openLightboxModal = function (index) {
                    console.log('openLightboxModal' + index);
                     Lightbox.openModal($scope.videos, index);
                };
            };

            return [ '$scope', 'Lightbox', mediaController];
        });

}( define ));