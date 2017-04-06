/**
 * Register the info Controller class with RequireJS
 */
(function( define ) {
    "use strict";

    define( ['model/appModel'],

        function (appModel)
        {
            /**
             * @constructor
             */
            var registrationController = function($rootScope, $scope, $state, dataService, candidateService,$translate,ngDialog,lodash)
            {
                console.log("registration Controller Initialized");
                $scope.candidate = {};
                $scope.candidate.skills = [];
                //form name
                $scope.regForm = {};
                $scope.saveClicked = false;
                
                $scope.setTime = 3000;
                $scope.responsive = true;

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

                $scope.termsText = $translate.instant('termsText');
                
                 //name are key's from language files
                $scope.genders = [];
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
                        {label: 'English', selected: false},
                        {label: 'Dutch', selected: false},
                ];
                
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

                $scope.gradDatePicker = {
                    date: new Date('2015-03-01T00:00:00Z'),
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
                
                $scope.formatSkillLabel = function(model) {
                    console.log("model " + model);
                    for (var i=0; i< $scope.roles.length; i++) {
                        if (model === $scope.roles[i].code) {
                            return $scope.roles[i].name;
                        }
                    }
                }

                $scope.OpenTerms = function(){
                   console.log('Terms and conditions dialog open'); 
                   ngDialog.openConfirm({
                        template: 'termsDialog',
                        className: 'ngdialog-theme-default custom-width',
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: false,
                        cache: true,
                    }).then(
                        function(value) {
                            //console.log('Terms and conditions accepted ' + value); 
                            $scope.candidate.privacyDisclaimer = true;
                        },
                        function(value) {
                            //Cancel or do nothing
                            //console.log('Terms and conditions rejected ' + value); 
                            $scope.candidate.privacyDisclaimer = false;
                        }
                    );
                }

                $scope.CalendarClick = function(e) {
                    //e.preventDefault();
                    //e.stopPropagation();

                    $scope.gradDatePicker.Open = !$scope.gradDatePicker.Open;
                }
                
                $scope.saveCandidateDetails =  () => {
                    // call save service;
                    console.log("Inside saveCandidateDetails : save triggered...");

                    $scope.candidate.eventId = $rootScope.selectedEvent.code;
                    $scope.candidate.skills = $scope.selectedSkills;

                   var lang = [];
                   lodash.forEach($scope.Languages, function(item) {
                       if(item.selected ==="true")
                            lang.push(item.label);
                   });
                   $scope.candidate.languages = lang.join(',');

                   candidateService.save($scope.candidate).then(function(result){
                        console.log('save result ' + JSON.stringify(result));
                        ngDialog.openConfirm({
                            template: 'registerConfDialog',
                            className: 'ngdialog-theme-default',
                            width: 400,
                        }).then( (value) => {
                            $state.go('home');
                        }, (reason) => {
                             //dialog closed
                             $state.go('home');
                            console.log('Modal promise rejected. Reason: ', reason);
                        });
                    });
                }

               //reset the form 
                $scope.reset = function() {
                    ngDialog.openConfirm({
                        template: 'confirmDialog',
                        className: 'ngdialog-theme-default',
                        width: 400,
                        }).then( (value) => {
                            $scope.candidate = {};
                            $scope.regForm.$setPristine();
                            $scope.regForm.$setUntouched();
                            $scope.regForm.$setValidity();
                            $scope.saveClicked = false;
                            console.log('Reset confirmed:');
                        },  (reason) => {
                            console.log('Modal promise rejected. Reason: ', reason);
                    });
                }
            };

            return ['$rootScope','$scope','$state','dataService','candidateService', '$translate', 'ngDialog', 'lodash', registrationController];
        });

}( define ));