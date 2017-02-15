(function (define){
    "use strict";

    define([], function() {
        var _vendorPath = "../../vendor/";

        require.config(
            {
                waitSeconds:120,
                appDir:'',
                baseUrl:'../app/src',
                paths: {
                    'jquery': _vendorPath + 'jquery/dist/jquery',
                    'uiBootstrapTpls': _vendorPath + 'angular-bootstrap/ui-bootstrap-tpls',
                    'uiBootstrapDatetimePicr': _vendorPath + 'bootstrap-ui-datetime-picker/dist/datetime-picker',
                    'messageformat': _vendorPath + 'messageformat/messageformat',
                    'angular': _vendorPath + 'angular/angular',
                    'ngSanitize':_vendorPath + 'angular-sanitize/angular-sanitize',
                    'ngAnimate':_vendorPath + 'angular-animate/angular-animate',
                    'ngDialog':_vendorPath + 'ng-dialog/js/ngDialog',
                    'ngTouch':_vendorPath + 'angular-touch/angular-touch',
                    'uiRouter': _vendorPath + 'angular-ui-router/release/angular-ui-router',
                    //'uiRouterExtra': _vendorPath + 'ui-router-extras/release/ct-ui-router-extras',
                    'ngCookies':_vendorPath + 'angular-cookies/angular-cookies',
                    'ngTranslate':_vendorPath + 'angular-translate/angular-translate',
                    'ngTranslateLog':_vendorPath +'angular-translate-handler-log/angular-translate-handler-log',
                    'ngTranslateMesFormat':_vendorPath+'angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat',
                    'ngTranslateLoaderStaticFiles': _vendorPath +'angular-translate-loader-static-files/angular-translate-loader-static-files',
                    'tmhDynamicLocale':_vendorPath + 'angular-dynamic-locale/dist/tmhDynamicLocale',
                    'ghiscodingValidation':_vendorPath + 'angular-validation-ghiscoding/dist/angular-validation.min',
                    'uiGrid':_vendorPath + 'angular-ui-grid/ui-grid',
                    'framework':'./framework',
                    'common':'./framework/common',
                    'service':'./framework/service',
                    'controller':'./framework/controller',
                    'model':'./framework/model'
                },
                urlArgs:'v=1.0',
                shim :{
                    'angular':{ 'deps': ['jquery'],'exports':'angular' },
                    'ngAnimate':{ 'deps': ['angular'] },
                    'ngTouch':{ 'deps': ['angular'] },
                    'ngDialog':{ 'deps': ['angular'] },
                    'uiBootstrapTpls':{ 'deps': ['angular','ngAnimate','ngTouch'] },
                    'uiBootstrapDatetimePicr':{ 'deps': ['uiBootstrapTpls'] },
                    'uiRouter':{ 'deps': ['angular','ngAnimate'] },
                    //'uiRouterExtra':{ 'deps': ['uiRouter'] },
                    'ngSanitize':{ 'deps': ['angular'] },
                    'ngCookies':{ 'deps': ['angular'] },
                    'ngTranslate': { 'deps': ['angular','ngSanitize'] },
                    'ngTranslateLog': { 'deps': ['ngTranslate'] }, 
                    'ngTranslateMesFormat': { 'deps': ['messageformat','ngTranslate'] }, 
                    'ngTranslateLoaderStaticFiles': { 'deps': ['ngTranslate'] }, 
                    'tmhDynamicLocale':{ 'deps': ['angular'] },
                    'ghiscodingValidation':{ 'deps': ['angular'] },
                    'uiGrid':{ 'deps': ['angular'] },
                    'bootStrap':{ 'deps': ['jquery'] },
                    'common':{ 'deps': ['angular'] },
                    'service':{ 'deps': ['angular'] },
                    'controller':{ 'deps': ['angular', 'common', 'service'] }
                },
                priority: ['angular']
            }
        );
        return require.config;
    });
}(define));