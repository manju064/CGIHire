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
            var registrationController = function($scope,candidateService,$translate)
            {
                console.log("registration Controller Initialized");
                $scope.candidate = {};

                //form name
                $scope.regForm = {};
                $scope.saveClicked = false;
                
                //name are key's from language files
                $scope.genders = [{code: "M", name:"TXT_MALE"}, {code: "F", name:"TXT_FEMALE"}];

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

                $scope.CalendarClick = function(e) {
                    //e.preventDefault();
                    //e.stopPropagation();

                    $scope.gradDatePicker.Open = !$scope.gradDatePicker.Open;
                };
                
                $scope.saveCandidateDetails = function () {
                    // call save service;
                    console.log("Inside saveCandidateDetails : save triggered...");

                    console.log("Candidate " + JSON.stringify($scope.candidate));

                    candidateService.save($scope.candidate);

                    // clear the form
                    $scope.candidate = {};
                    $scope.regForm.$setPristine();
                    $scope.regForm.$setUntouched();
                    $scope.saveClicked = true;
                }
                //$scope.content = appModel.getInstance().getData().pages[1].content;
            };

            return ["$scope",'candidateService', '$translate',registrationController];
        });

}( define ));