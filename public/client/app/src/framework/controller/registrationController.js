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
            var registrationController = function($scope, $state, dataService, candidateService,$translate,ngDialog)
            {
                console.log("registration Controller Initialized");
                $scope.candidate = {};

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

                $scope.candidate.roleId = undefined;

                $scope.formatLabel = function(model) {
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
                            //save the contact form
                            //console.log('Terms and conditions accepted ' + value); 
                            $scope.candidate.privacyDisclaimer = true;
                        },
                        function(value) {
                            //Cancel or do nothing
                            //console.log('Terms and conditions rejected ' + value); 
                            $scope.candidate.privacyDisclaimer = false;
                        }
                    );
                };

                $scope.CalendarClick = function(e) {
                    //e.preventDefault();
                    //e.stopPropagation();

                    $scope.gradDatePicker.Open = !$scope.gradDatePicker.Open;
                };
                
                $scope.saveCandidateDetails =  () => {
                    // call save service;
                    console.log("Inside saveCandidateDetails : save triggered...");

                    console.log("Candidate " + JSON.stringify($scope.candidate));

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

            return ['$scope','$state','dataService','candidateService', '$translate', 'ngDialog',registrationController];
        });

}( define ));