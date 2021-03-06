/**
 * Now let's start our Cops15 app...
 * which uses RequireJS to load  packages and code
 *
 */
define(['angular'
        ,'ngAnimate'
        ,'uiRouter'
        ,'uiBootstrap'
        ,'uiBootstrapDatetimePicr'
        ,'uiRouterExtra'
        ,'ngSanitize'
        ,'ngCookies'
        ,'ngTranslate'
        ,'ngTranslateLog'
        ,'ngTranslateMesFormat'
        ,'ngTranslateLoaderStaticFiles'
        ,'tmhDynamicLocale'
        ,'framework/modules'
        ,'framework/routeManager'
        ,'framework/translationManager'
        ],
         function(angular,ngAnimate, uiRouter, uiBootstrap, uiBootstrapDatetimePicr, uiRouterExtra, ngSanitize, ngCookies, ngTranslate, ngTranslateLog
                    ,ngTranslateMesFormat, ngTranslateLoaderStaticFiles, tmhDynamicLocale,
                    modules, routeManager, translationManager) {

    var app, appName = 'app';
    /**
     * Start the main application
     */
    var initialize = function() {

        app = angular.module(appName, ['ngAnimate'
                                        ,'ui.bootstrap'
                                        ,'ui.bootstrap.datetimepicker'
                                        ,'ui.router'
                                        ,'ct.ui.router.extras'
                                        ,'ngSanitize'
                                        ,'ngCookies'
                                        ,'pascalprecht.translate'
                                        ,'tmh.dynamicLocale', modules])
        // configure routeManager
        .config(routeManager);

        app.config(translationManager);

        angular.element(document).ready(function() {
            console.log('App: bootstrapping');
            angular.bootstrap(document, [appName]);
        });
    }
    return {
        start: initialize
    };
});