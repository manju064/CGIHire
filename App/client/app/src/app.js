//Self-Executing anonymous function
(function(document){
    "use strict";
    //Define init method
    function init(){
        console.log('App: Initializing');

        require(['config'], function(){
            console.log('Require config: loaded');

            require(['main'], function(App) {
                //Start from main.js
                App.start();
            });
        });
    }

    if(document.readyState != 'loading'){
        init();
    }else{
        document.addEventListener('DOMContentLoaded', init);
    }
}(document));