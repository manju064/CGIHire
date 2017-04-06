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
            var candidateDetailsController = function($rootScope, $scope, dataService, candidateService, $uibModalInstance, $translate, grid, row, lodash)
            {
                console.log("Candidate Details Controller Initialized");
                $scope.candidate = {};

                //form name
                $scope.regForm = {};
                $scope.saveClicked = false;

                $scope.candidate = angular.copy(row.entity);

                $scope.cgiContacts = [];
                $scope.locations = [];
                $scope.sectors = [];
                $scope.roles = [];
                $scope.potentialOptions = [];
                $scope.skills =[];        
                $scope.selectedSkills =[];
                $scope.skillsSettings = {
                    showCheckAll: false,
                    showUncheckAll:true,
                    keyboardControls: true,
                    enableSearch: true,
                    styleActive: true,
                    scrollableHeight: '150px',
	                scrollable: true,
                    selectionCount:'skills'
                };    

                $scope.Languages = [
                        {label: 'English', selected: true},
                        {label: 'Dutch', selected: false},
                ];
                
                if($scope.candidate.skills !=undefined && $scope.candidate.skills !=null)
                    $scope.selectedSkills = $scope.candidate.skills;

                $scope.loadLookups = function(){
                   
                    $scope.potentialOptions = [ {code: "High", name: "1"},
                                                {code: "Medium", name: "2"},
                                                {code: "Low", name: "3"}
                                            ];
                    // #region cgiContacts,
                   
                    dataService.get('cgiContacts').then( (result) => {
                        angular.extend($scope.cgiContacts, result.data);
                    }, (err) => {
                            console.log('cgiContacts err ' + JSON.stringify(err));
                    });
                    // #endregion 

                    // #region locations,
                    dataService.get('locations').then( (result) => {
                        angular.extend($scope.locations, result.data);
                    }, (err) => {
                            console.log('locations err ' + JSON.stringify(err));
                    });
                    // #endregion 

                     // #region sectors,
                    dataService.get('sectors').then( (result) => {
                        angular.extend($scope.sectors, result.data);
                    }, (err) => {
                            console.log('sectors err ' + JSON.stringify(err));
                    });
                    // #endregion 

                    // #region sectors,
                    dataService.get('roles').then( (result) => {
                        angular.extend($scope.roles, result.data);
                    }, (err) => {
                            console.log('roles err ' + JSON.stringify(err));
                    });
                    dataService.get('skills').then( (result) => {
                        angular.extend($scope.skills, result.data);
                    }, (err) => {
                            console.log('skills err ' + JSON.stringify(err));
                    });
                    // #endregion 
                };

                $scope.loadLookups();

                //TODO Dumb logic, store key values
                if($scope.candidate.languages != undefined && $scope.candidate.languages !=null){
                    lodash.forEach($scope.Languages, function(item) {
                        if(!($scope.candidate.languages.indexOf(item.label) ==-1))
                            item.selected = true;
                    });
                }

                console.log("Candidate Details Controller candidate " + JSON.stringify($scope.candidate));

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
                    $scope.candidate.eventId = $rootScope.selectedEvent.code;
                    $scope.candidate.skills = $scope.selectedSkills;
                    var lang = [];
                    lodash.forEach($scope.Languages, function(item) {
                         if(item.selected ==="true")
                            lang.push(item.label);
                    });
                    $scope.candidate.languages = lang.join(',');

                   // console.log("Candidate update" + JSON.stringify($scope.candidate));
                    candidateService.update($scope.candidate._id, $scope.candidate).then(function(result){
                        //console.log('save result ' + JSON.stringify(result));
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
            
            return ['$rootScope', "$scope", 'dataService', 'candidateService', '$uibModalInstance', '$translate', 'grid', 'row', 'lodash', candidateDetailsController];
        });

}( define ));