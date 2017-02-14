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

                		//Set your interval time. 4000 = 4 seconds
                $scope.setTime = 3000;
                $scope.responsive = false;

                //List your images here. 
                $scope.images =  [{
                                    src: './assets/images/slides/CGI_banner_1.png',
                                    alt: 'Add your image description here'
                                    }, {
                                    src: './assets/images/slides/CGI_banner_2.png',
                                    alt: 'Add your image description here'
                                    }, {
                                    src: './assets/images/slides/CGI_banner_3.png',
                                    alt: 'Add your image description here'
                                    }, {
                                    src: './assets/images/slides/CGI_banner_4.png',
                                    alt: 'Add your image description here'
                        }];
            };

            return ["$scope",homeController];
        });

}( define ));