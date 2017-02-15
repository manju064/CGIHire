/**
 * Register the CandidateDetails Controller class with RequireJS
 * This for update/remove candidate details
 */
(function( define ) {
    "use strict";

    define( ['model/appModel'],

        function (appModel)
        {
            /**
             * @constructor
             */
            var candidateDetailsController = function($scope, dataService, candidateService, $uibModalInstance, $translate, grid, row)
            {
                console.log("Candidate Details Controller Initialized");
                $scope.candidate = {};

                //form name
                $scope.regForm = {};
                $scope.saveClicked = false;

                $scope.genders = [];
                $scope.cgiContacts = [];
                $scope.locations = [];
                $scope.sectors = [];
                $scope.roles = [];

                $scope.loadLookups = function(){
                    // #region Genders,
                    dataService.get('genders').then( (data) => {
                        angular.extend($scope.genders, data);
                    }, (err) => {
                            console.log('Genders err ' + JSON.stringify(err));
                    });
                    // #endregion 

                    // #region cgiContacts,
                    dataService.get('cgiContacts').then( (data) => {
                        angular.extend($scope.cgiContacts, data);
                    }, (err) => {
                            console.log('cgiContacts err ' + JSON.stringify(err));
                    });
                    // #endregion 

                    // #region locations,
                    dataService.get('locations').then( (data) => {
                        angular.extend($scope.locations, data);
                    }, (err) => {
                            console.log('locations err ' + JSON.stringify(err));
                    });
                    // #endregion 

                     // #region sectors,
                    dataService.get('sectors').then( (data) => {
                        angular.extend($scope.sectors, data);
                    }, (err) => {
                            console.log('sectors err ' + JSON.stringify(err));
                    });
                    // #endregion 

                    // #region sectors,
                    dataService.get('roles').then( (data) => {
                        angular.extend($scope.roles, data);
                    }, (err) => {
                            console.log('roles err ' + JSON.stringify(err));
                    });
                    // #endregion 
                };

                $scope.loadLookups();
                $scope.candidate = angular.copy(row.entity);
                console.log("Candidate Details Controller candidate " + JSON.stringify($scope.candidate));

                 $scope.formatLabel = function(model) {
                    console.log("model " + model);
                    for (var i=0; i< $scope.roles.length; i++) {
                        if (model === $scope.roles[i].code) {
                            return $scope.roles[i].name;
                        }
                    }
                }
                var qfDate = ($scope.candidate.qualificationDate == null || $scope.candidate.qualificationDate == undefined)?
                                    new Date('2015-03-01T00:00:00Z') : $scope.candidate.qualificationDate;

                $scope.gradDatePicker = {
                    date:qfDate ,
                    Open:false,
                    Options: {
                        showWeeks: false,
                        startingDay: 1,
                        dateDisabled: function(data) {
                           return false;
                           // return (data.mode === 'day' && (new Date().toDateString() == data.date.toDateString()));
                        }
                    },
                    ButtonBar:{
                        show: false,
                        now: {
                            show: true,
                            text: 'Now'
                        },
                        today: {
                            show: true,
                            text: $translate.instant('TXT_TODAY')
                        },
                        clear: {
                            show: true,
                            text: $translate.instant('TXT_CLEAR')
                        },
                        date: {
                            show: true,
                            text: $translate.instant('TXT_DATE')
                        },
                        time: {
                            show: false,
                            text: 'Time'
                        },
                        close: {
                            show: true,
                            text: $translate.instant('TXT_CLOSE')
                        }
                    }
                };

                $scope.CalendarClick = function(e) {
                    //e.preventDefault();
                    //e.stopPropagation();

                    $scope.gradDatePicker.Open = !$scope.gradDatePicker.Open;
                };

                $scope.save = function(){
                    //Update the record
                    // call save service;
                    console.log("Candidate update" + JSON.stringify($scope.candidate));
                    candidateService.update($scope.candidate._id, $scope.candidate).then(function(result){
                        console.log('save result ' + JSON.stringify(result));
                        row.entity = angular.extend(row.entity, $scope.candidate);
                    });

                    $scope.saveClicked = true;
                    $uibModalInstance.close($scope.candidate);
                } 

                $scope.remove = function(){
                    console.log("Candidate remove" + JSON.stringify($scope.candidate._id));
                    candidateService.remove($scope.candidate._id).then(function(result){
                        console.log('save result ' + JSON.stringify(result));
                        //remove from grid  
                        var index = grid.appScope.serviceGrid.data.indexOf(row.entity);
                        grid.appScope.serviceGrid.data.splice(index, 1);
                    });

                    $uibModalInstance.close($scope.candidate._id);
                }
            };
            
            return ["$scope", 'dataService', 'candidateService', '$uibModalInstance', '$translate', 'grid', 'row', candidateDetailsController];
        });

}( define ));