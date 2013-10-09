require.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        tpl: '../tpl'
    },
    map: {
        '*': {
            'app/models/employee': 'app/models/json/employee'
        }
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery','jquery-ui','fullcalendar.min','jquery.cookie'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_',
            init: function () {
                this._.extend(this._.templateSettings, {
                    interpolate : /\$\{(.+?)\}/g 
                 });
        return this._;
      }

        }
    }
});

require(['jquery', 'backbone', 'app/router'], function ($, Backbone, Router) {
         //If Backbone sync gets an unauthorized header, it means the user's
         //session has expired, so send them back to the homepage
/*        
 var sync = Backbone.sync;
         Backbone.sync = function(method, model, options) {
             options.error = function(xhr, ajaxOptions, thrownError) {
                 if (xhr.status == 401) {
                     window.location = '/';
                 }
             }
             sync(method, model, options);
         };
*/

    var router = new Router();
    Backbone.history.start();

});



