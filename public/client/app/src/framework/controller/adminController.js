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
            var adminController = function($scope, $filter, $uibModal, uiGridConstants, 
                                    candidateService, dataService, $translate,lodash)
            {
                // #region init, 
                console.log("admin Controller Initialized");
                //$scope.content = appModel.getInstance().getData().pages[1].content;
                $scope.candidates = [];
                $scope.isSelectedCandidate = false;
                $scope.selectedCandidate ={};

                $scope.GetAllCandidates = function(){
                    candidateService.getAll().then( (data) => {
                        console.log("GetAllCandidates data = " + JSON.stringify(data));
                        angular.extend($scope.candidates, data);
                        angular.extend($scope.serviceGrid.data, data);
                    }, (err) => {
                            console.log('GetAllCandidates err ' + JSON.stringify(err));
                    });
                }

                //TODO, problem with sync
                $scope.GetAllCandidates();
                // #endregion    

                //csv file needs data in format
                $scope.exportData = [];
                $scope.fileName = $translate.instant('RegisteredCandidatesFileName') 
                                    + $filter('date')(new Date(), 'yyyyMMddHHmm') + '.csv';

                $scope.skills =[];
                dataService.get('skills').then( (data) => {
                    angular.extend($scope.skills, data);
                }, (err) => {
                        console.log('skills err ' + JSON.stringify(err));
                });            

                $scope.getExportData = function(){
                    candidateService.getFormatedData().then( (data) => {
                        console.log("getFormatedData data = " + JSON.stringify(data));
                        angular.extend($scope.exportData, data);

                        lodash.forEach($scope.exportData, function(row) {
                            if(row.skills.length >0){
                                var skillsText = []
                                 lodash.forEach(row.skills, function(item) {
                                    var skill = lodash.find($scope.skills, ['id', item.id]);
                                    //console.log('id ' + item.id + 'skill ' + skill.label);
                                    skillsText.push(skill.label);
                                });
                                console.log('skillsText ' + skillsText.join(","));
                                row.skillsText = skillsText.join(",");
                             }
                        });
                    }, (err) => {
                            console.log('getFormatedData err ' + JSON.stringify(err));
                    });
                }

                $scope.getExportData();
                $scope.reportHeader = [ "firstName", "lastName", "languages","emailId", "phoneNumber", "highestQualification", 
                                        "qualificationDate",  'currentRole',"role","skillsText","certification","certificationName"
                                        ,"potential", "linkedInUrl", "preferredLocation",
                                         "subscribeToNewsLetter", "privacyDisclaimer", "sector", "cgiContact", "comment"];

               $scope.reportHeaderText = [ $translate.instant('First_Name')
                                        ,$translate.instant('Last_Name')
                                        ,$translate.instant('languages')
                                        ,$translate.instant('Email_Address')
                                        ,$translate.instant('Phone_Number')
                                        ,$translate.instant('Highest_Qualification')
                                        ,$translate.instant('Graduation_Date')
                                        ,$translate.instant('CurrentRole')
                                        ,$translate.instant('role')
                                        ,$translate.instant('skills')
                                        ,$translate.instant('certification')
                                        ,$translate.instant('Certification_Name_Hint')
                                        ,$translate.instant('potential')
                                        ,$translate.instant('LinkedIn_URL')
                                        // ,$translate.instant('skills')
                                        ,$translate.instant('preferredLocation')
                                        ,$translate.instant('subscribeToNewsLetter')
                                        ,$translate.instant('terms') //privacyDisclaimer
                                        ,$translate.instant('sector')
                                        ,$translate.instant('cgiContact')
                                        ,$translate.instant('comment')
                                        ];

                // #region Grid,
                $scope.serviceGrid = {
                    enableRowSelection : true,
                    enableRowHeaderSelection : false,
                    multiSelect : false,
                    enableSorting : true,
                    enableFiltering : true,
                    enableGridMenu : true,
                    rowTemplate : "<div ng-dblclick=\"grid.appScope.editRow(grid, row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>"
                };

                $scope.serviceGrid.columnDefs = [ {
                        field : '_id',
                        displayName : 'Id',
                        enableSorting : true,
                        type : 'number',
                        enableCellEdit : false,
                        width : 60,
                        sort : {
                            direction : uiGridConstants.ASC,
                            priority : 1,
                        },
                        cellTemplate: 'edit-button'
                    }, {
                        field : 'firstName',
                        displayName : $translate.instant('First_Name'),
                        enableSorting : true,
                        enableCellEdit : false
                    }, {
                        field : 'lastName',
                        displayName : $translate.instant('Last_Name'),
                        enableSorting : true,
                        enableCellEdit : false
                    }, {
                        field : 'emailId',
                        displayName : $translate.instant('Email_Address'),
                        enableSorting : true,
                        enableCellEdit : false
                    } ];

                $scope.editRow = function (grid, row) {
                        $uibModal.open({
                            templateUrl : 'assets/views/candidateDetails.html',
                            controller : 'candidateDetailsController',
                            resolve : {
                                grid : function() {
                                    return grid;
                                },
                                row : function() {
                                    return row;
                                }
                            }
                        });
                    }
                
                 // #endregion 

            };

            return ["$scope", '$filter','$uibModal', 'uiGridConstants','candidateService', 'dataService', '$translate', 'lodash', adminController];
        });

}( define ));