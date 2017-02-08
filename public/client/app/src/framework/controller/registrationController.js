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
            var registrationController = function($scope,candidateService,$translate,ngDialog)
            {
                console.log("registration Controller Initialized");
                $scope.candidate = {};

                //form name
                $scope.regForm = {};
                $scope.saveClicked = false;
                
                //name are key's from language files
                $scope.genders = [{code: "M", name:"TXT_MALE"}, {code: "F", name:"TXT_FEMALE"}];

                $scope.termsText = $translate.instant('termsText');
                
                $scope.cgiContacts = [{code:"1", name:"Jolanda Phillipson"}
                                      ,{code:"2", name:"Felix Timmerman"}
                                      ,{code:"91331", name:"Manjunath Keshava"}
                                     ];

                $scope.locations = [{code:"1", name:"Hoofddorp"}
                                    ,{code:"2", name:"Rotterdam"}
                                    ,{code:"3", name:"Groningen"}
                                    ,{code:"4", name:"Arnhem"}
                                    ,{code:"5", name:"Maastricht"}
                                    ,{code:"6", name:"Eindhoven"}
                                ];
                $scope.sectors = [  {code:"1", name:"Banking"}
                                    ,{code:"2", name:"Insurances"}
                                    ,{code:"3", name:"Government"}
                                    ,{code:"4", name:"Health"}
                                    ,{code:"5", name:"Manufacturing"}
                                    ,{code:"6", name:"Retail"}
                                    ,{code:"7", name:"Oil"}
                                    ,{code:"8", name:"Gas"}
                                    ,{code:"9", name:"Communications"}
                                    ,{code:"10", name:"Telecommunications"}
                                    ,{code:"11", name:"Service Delivery"}
                                    ,{code:"12", name:"GIS"}
                                    ,{code:"13", name:"Space"}
                                    ,{code:"14", name:"Defence"}
                                    ,{code:"15", name:"Transport"}
                                    ,{code:"16", name:"Logistics"}
                                ];
            
                $scope.roles = [
                                {code:"1", name:".Net / C# Experienced Software Engineer"},
                                {code:"2", name:".Net / C# Software Architect"},
                                {code:"3", name:".Net Developer (Medior)"},
                                {code:"4", name:"Applicatiebeheerder Infrastructure Technnisch "},
                                {code:"5", name:"Big data Business Consultant "},
                                {code:"6", name:"Bleuriq software Architect"},
                                {code:"7", name:"Blueriq Modelleur (Junior)"},
                                {code:"8", name:"Blueriq Software Engineer experienced"},
                                {code:"9", name:"Business (Process) Analyst"},
                                {code:"10", name:"Business Analist medior"},
                                {code:"11", name:"Business Analist (Banking Compliancy)"},
                                {code:"12", name:"Business Analist Payments (Filtering)"},
                                {code:"13", name:"Business Analist Payments (Transaction management)"},
                                {code:"14", name:"Business Analist Pensioenen"},
                                {code:"15", name:"Business Analist Retail Omnichannel"},
                                {code:"16", name:"Business Analist Senior"},
                                {code:"17", name:"Business Consultant (Politie en Veiligheid)"},
                                {code:"18", name:"Business Consultant (Retail)"},
                                {code:"19", name:"Business Consultant Agile Coach "},
                                {code:"20", name:"Business Consultant Energy (Retail & Wholesale)"},
                                {code:"21", name:"Business Consultant Food Sector "},
                                {code:"22", name:"Business Consultant High End"},
                                {code:"23", name:"Business Consultant junior"},
                                {code:"24", name:"Business Consultant Pensioenen"},
                                {code:"25", name:"Business- en Informatie Analist (Banking)"},
                                {code:"26", name:"Business Informatie Analist Risk & Compliance Bancair"},
                                {code:"27", name:"Business Intelligence  Consultant experienced"},
                                {code:"28", name:"Business Intelligence Consultant"},
                                {code:"29", name:"Business Intelligence Ontwerper/Ontwikkelaar"},
                                {code:"30", name:"Citrix Software Engineer"},
                                {code:"31", name:"Cloud Specialist"},
                                {code:"32", name:"Cloud Specialist Experienced "},
                                {code:"33", name:"Consultant Functionele Ketenmonitoring"},
                                {code:"34", name:"Data Scientist (medior)"},
                                {code:"35", name:"Data Scientist (Senior)"},
                                {code:"36", name:"Data Scientist experienced "},
                                {code:"37", name:"Dev Engineer"},
                                {code:"38", name:"Director Consulting - Expert"},
                                {code:"39", name:"Director Consulting - Expert (Thoughtleader Politie en Veiligheid)"},
                                {code:"40", name:"Director Consulting - Expert Zorginstellingen"},
                                {code:"41", name:"Director Consulting Services"},
                                {code:"42", name:"Director Consulting Services Banking"},
                                {code:"43", name:"Director Consulting Services Sociaal Domein (Sales & Accountmanager)"},
                                {code:"44", name:"ECM Consultant (Filenet)"},
                                {code:"45", name:"ECM Consultant (Filenet)"},
                                {code:"46", name:"Enterprise Solution Architect"},
                                {code:"47", name:"Esri Ontwikkelaar"},
                                {code:"48", name:"ETL Experienced Software Engineer"},
                                {code:"49", name:"ETL Experienced Software Engineer"},
                                {code:"50", name:"Experienced Software Engineer"},
                                {code:"51", name:"Experienced Software Engineer (Technical) Manufacturing"},
                                {code:"52", name:"Frontend Developer (UX)"},
                                {code:"53", name:"Functioneel beheerder medior"},
                                {code:"54", name:"Functioneel beheerder senior"},
                                {code:"55", name:"Functioneel Ontwerper medior"},
                                {code:"56", name:"Functioneel Ontwerper Senior"},
                                {code:"57", name:"GE Smallworld Ontwikkelaar"},
                                {code:"58", name:"GEO-ICT developer"},
                                {code:"59", name:"GEO-ICT Experienced Software Engineer"},
                                {code:"60", name:"Graduate Class Technical Software Engineering (TSE) Space"},
                                {code:"61", name:"IAM consultant"},
                                {code:"62", name:"IAM specialist"},
                                {code:"63", name:"ICT Infrastructure Engineer experienced "},
                                {code:"64", name:"Informatie Analist (Telco) junior"},
                                {code:"65", name:"Information Analyst"},
                                {code:"66", name:"Infrastructure Architect"},
                                {code:"67", name:"Infrastructure Architect (Ketenmanagement)"},
                                {code:"68", name:"Infrastructure Data Engineers "},
                                {code:"69", name:"Infrastructure Engineer (Red Hat/Linux)"},
                                {code:"70", name:"Infrastructure Requirements Engineer Mission Critical Systems "},
                                {code:"71", name:"Infrastructure Solutions Architect"},
                                {code:"72", name:"Infrastructuur Engineer Experienced (Back-up, Storage, Virtualisatie)"},
                                {code:"73", name:"Infrastructuur Engineer junior"},
                                {code:"74", name:"Infrastructuur Engineer Medior"},
                                {code:"75", name:"Infrastructuur Engineer senior"},
                                {code:"76", name:"Internship Determine the impact of blockchain on peer-to-peer energy exchange"},
                                {code:"77", name:"Internship, Innovatieve Duo-Afstudeerstage"},
                                {code:"78", name:"Internship, Ruimtevaart"},
                                {code:"79", name:"Internship: Blockchain Innovation in Insurance"},
                                {code:"80", name:"iOS Android Developer"},
                                {code:"81", name:"Java developer"},
                                {code:"82", name:"Java Developer (Telco)"},
                                {code:"83", name:"Java developer Experienced "},
                                {code:"84", name:"Java developer Experienced (Space)"},
                                {code:"85", name:"Java ontwikkelaar Customer Experience "},
                                {code:"86", name:"JDA Consultant"},
                                {code:"87", name:"Lead Data Scientist (Banking & Insurance)"},
                                {code:"88", name:"Linux Ervaren Netwerkbeheerder"},
                                {code:"89", name:"MES Consultant"},
                                {code:"90", name:"MES Service consultant experienced "},
                                {code:"91", name:"MES/MOMS Experienced Software Engineer"},
                                {code:"92", name:"Microsoft .NET developer"},
                                {code:"93", name:"Microsoft Software Architect"},
                                {code:"94", name:"Mobile App Ontwikkelaars Customer Experience"},
                                {code:"95", name:"MS Cloud Infrastructuur specialist junior"},
                                {code:"96", name:"MS Cloud Infrastructuur specialist medior"},
                                {code:"97", name:"MS Cloud Infrastructuur specialist senior"},
                                {code:"98", name:"Netwerk specialist Virtualisatie"},
                                {code:"99", name:"Omni Channel Solution Designer"},
                                {code:"100", name:"Ops Engineer"},
                                {code:"101", name:"Outsystems Software Engineer"},
                                {code:"102", name:"Payments Solution Designer"},
                                {code:"103", name:"PEGA Consultant Senior"},
                                {code:"104", name:"PLM Teamcenter Engineer"},
                                {code:"105", name:"Principal Solution Architect"},
                                {code:"106", name:"Product Lifecycle Management  "},
                                {code:"107", name:"Project en Transitie manager"},
                                {code:"108", name:"Project management ondersteuner (PMO)"},
                                {code:"109", name:"Project Manager Health"},
                                {code:"110", name:"SAP HANA Projectmanager"},
                                {code:"111", name:"SAP Hybris Senior Software Engineer "},
                                {code:"112", name:"SAP Hybris Software Engineer"},
                                {code:"113", name:"SAP ME Consultant"},
                                {code:"114", name:"Security Architect"},
                                {code:"115", name:"Security consultant Cyber  "},
                                {code:"116", name:"Security Consultant Cyber experienced"},
                                {code:"117", name:"Security Engineer (Telco)"},
                                {code:"118", name:"Security Specialist (Endpoint) "},
                                {code:"119", name:"Security Specialist Experienced "},
                                {code:"120", name:"Senior Technical Software Engineer"},
                                {code:"121", name:"Service Support Specialist"},
                                {code:"122", name:"SharePoint Experienced Software Engineer"},
                                {code:"123", name:"Software Configuration Management Engineer"},
                                {code:"124", name:"Solutions Architect (Infrastructure)"},
                                {code:"125", name:"Technical Application Manager"},
                                {code:"126", name:"Technical Software Architect"},
                                {code:"127", name:"Technical Software Engineer"},
                                {code:"128", name:"Technisch Applicatie Beheerder"},
                                {code:"129", name:"Technisch ICT beheerder (Defense)"},
                                {code:"130", name:"Test coordinator"},
                                {code:"131", name:"Test Engineer (Technisch)"},
                                {code:"132", name:"Test Engineer Bancair"},
                                {code:"133", name:"Test Engineer experienced (Agile tester)"},
                                {code:"134", name:"Test engineer experienced (Automated Testing Banking)"},
                                {code:"135", name:"Test Engineer Junior"},
                                {code:"136", name:"Test Engineer Medior"},
                                {code:"137", name:"Test Engineer Senior"},
                                {code:"138", name:"Thought leader Sociaal Domein"},
                                {code:"139", name:"Tibco/soa applicatie beheerder senior"},
                                {code:"140", name:"TIBCO/SOA Software Architect "},
                                {code:"141", name:"Vice President Consulting - Expert (MRCS)"},
                                {code:"142", name:"Non of the above"}
                                ];


             
    
    
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
                   $scope.terms = 'no';
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
                            console.log('Terms and conditions accepted ' + value); 
                            $scope.candidate.privacyDisclaimer = true;
                        },
                        function(value) {
                            //Cancel or do nothing
                            console.log('Terms and conditions rejected ' + value); 
                            $scope.candidate.privacyDisclaimer = false;
                        }
                    );
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

                    candidateService.save($scope.candidate).then(function(result){
                        console.log('save result ' + JSON.stringify(result));
                    });

                    // clear the form
                    $scope.candidate = {};
                    $scope.regForm.$setPristine();
                    $scope.regForm.$setUntouched();
                    $scope.saveClicked = true;
                }
                //$scope.content = appModel.getInstance().getData().pages[1].content;
            };

            return ["$scope",'candidateService', '$translate', 'ngDialog',registrationController];
        });

}( define ));