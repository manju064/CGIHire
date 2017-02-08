/**
 * Register the About Controller class with RequireJS
 */
(function( define ) {
    "use strict";

    define( ['model/appModel'],

        function (appModel)
        {
            /**
             * @constructor
             */
            var adminController = function($scope,candidateService,$translate)
            {
                // #region init
                console.log("admin Controller Initialized");
                //$scope.content = appModel.getInstance().getData().pages[1].content;
                $scope.candidates = [];
                $scope.isSelectedCandidate = false;
                $scope.selectedCandidate ={};

                $scope.GetAllCandidates = function(){
                    candidateService.getAll().then(function (data) {
                        console.log("GetAllCandidates data = " + JSON.stringify(data));
                        angular.extend($scope.candidates, data);
                    });
                }

                //TODO, problem with sync
                $scope.GetAllCandidates();
                
                // #endregion    

                $scope.GetCandidateDetails = function(id){
                    console.log("admin Controller candidate id " + id);
                    candidateService.get(id).then(function (results) {
                        $scope.selectedCandidate = results.data;
                        //$scope.isSelectedCandidate = true;
                        console.log("selected candidate = " + JSON.stringify($scope.selectedcandidate));
                    });
                }

            };

            return ["$scope",'candidateService', '$translate', adminController];
        });

}( define ));