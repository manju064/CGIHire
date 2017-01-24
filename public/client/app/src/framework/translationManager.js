
/**
 * ******************************************************************************************************
 *
 *   Language translation Manager
 *
 *
 * ******************************************************************************************************
 */

(function ( define ) {
    "use strict";


    define([
        ],
        function ( )
        {
            /**
             * Language translation Manager
             * - to be used in main.js -> angular.config()
             *
             */
            var TranslationManager = function ($translateProvider,tmhDynamicLocaleProvider)
            {
               var _vendorPath = "../../client/vendor/";
               var DEFAULT_LOCALE='nl';

                $translateProvider
                    .addInterpolation('$translateMessageFormatInterpolation')
                    .preferredLanguage(DEFAULT_LOCALE)
                    .fallbackLanguage('en')
                    .useStaticFilesLoader({
                        prefix: 'assets/i18n/',
                        suffix: '.json'
                    })
                    .useSanitizeValueStrategy('sanitize');

                    tmhDynamicLocaleProvider.defaultLocale(DEFAULT_LOCALE);

                    tmhDynamicLocaleProvider.localeLocationPattern(_vendorPath + '/angular-i18n/angular-locale_{{locale}}.js');
            };

            return ['$translateProvider', 'tmhDynamicLocaleProvider', TranslationManager];
        });

}( define ));
