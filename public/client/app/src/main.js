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
        //,'uiRouterExtra'
        ,'ngSanitize'
        ,'ngCookies'
        ,'ngTranslate'
        ,'ngTranslateLog'
        ,'ngTranslateMesFormat'
        ,'ngTranslateLoaderStaticFiles'
        ,'tmhDynamicLocale'
        ,'ghiscodingValidation'
        ,'framework/modules'
        ,'framework/routeManager'
        ,'framework/translationManager'
        ],
         function(angular, ngTouch, ngAnimate, ngDialog, uiRouter, uiBootstrapTpls, uiBootstrapDatetimePicr
                    ,ngSanitize, ngCookies, ngTranslate, ngTranslateLog
                    ,ngTranslateMesFormat, ngTranslateLoaderStaticFiles, tmhDynamicLocale, ghiscodingValidation,
                    modules, routeManager, translationManager) {

    var app, appName = 'app';
    /** 
     * Start the main application
     */
    var initialize = function() {

        app = angular.module(appName, ['ngTouch'
                                        ,'ngAnimate',
                                        ,'ngDialog'
                                        ,'ghiscoding.validation'
                                        ,'ui.bootstrap'
                                        ,'ui.bootstrap.datetimepicker'
                                        ,'ui.router'
                                        //,'ct.ui.router.extras'
                                        ,'ngSanitize'
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