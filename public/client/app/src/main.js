/**
 * Now let's start our Cops15 app...
 * which uses RequireJS to load  packages and code
 *
 */
define(['angular'
        ,'ngTouch'
        ,'ngAnimate'
        ,'ngDialog'
        ,'uiRouter'
        ,'uiBootstrapTpls'
        ,'uiBootstrapDatetimePicr'
        ,'ngSanitize'
        ,'ngCsv'
        ,'ngCookies'
        ,'ngTranslate'
        ,'ngTranslateLog'
        ,'ngTranslateMesFormat'
        ,'ngTranslateLoaderStaticFiles'
        ,'tmhDynamicLocale'
        ,'ghiscodingValidation'
        ,'uiGrid'
        ,'framework/modules'
        ,'framework/routeManager'
        ,'framework/translationManager'
        ],
         function(angular, ngTouch, ngAnimate, ngDialog, uiRouter, uiBootstrapTpls, uiBootstrapDatetimePicr
                    ,ngSanitize, ngCsv, ngCookies, ngTranslate, ngTranslateLog
                    ,ngTranslateMesFormat, ngTranslateLoaderStaticFiles, tmhDynamicLocale, ghiscodingValidation
                    ,uiGrid
                    ,modules, routeManager, translationManager) {

    var app, appName = 'app';
    /** 
     * Start the main application
     */
    var initialize = function() {

        app = angular.module(appName, ['ngTouch'
                                        ,'ngAnimate',
                                        ,'ngDialog'
                                        ,'ghiscoding.validation'
                                        ,'ui.grid' 
                                        ,'ui.grid.moveColumns'
                                        ,'ui.grid.selection'
                                        ,'ui.grid.resizeColumns'
                                        ,'ui.bootstrap'
                                        ,'ui.bootstrap.datetimepicker'
                                        ,'ui.router'
                                        ,'ngSanitize'
                                        ,'ngCsv'
                                        ,'ngCookies'
                                        ,'pascalprecht.translate'
                                        ,'tmh.dynamicLocale', modules])
        // configure routeManager
        .config(routeManager);

        app.config(translationManager);

        /*app.config(['$qProvider', function ($qProvider) {
            $qProvider.errorOnUnhandledRejections(false);
        }]);
        */
        angular.element(document).ready(function() {
            console.log('App: bootstrapping');
            angular.bootstrap(document, [appName]);
        });
    }
    return {
        start: initialize
    };
});