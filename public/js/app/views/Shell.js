define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        EditView            = require('app/views/editview'),
        EmployeeListView    = require('app/views/EmployeeList'),
        models              = require('app/models/employee'),
        tpl                 = require('text!tpl/Shell.html'),

        template = _.template(tpl),
        $menuItems;

    return Backbone.View.extend({

        initialize: function () {
            this.employeeList = new models.EmployeeCollection();
        },

        render: function () {
            this.$el.html(template());
            var listView = new EmployeeListView({collection: this.employeeList, el: $(".employee-list", this.el)});
            listView.render();
            $menuItems = $('.navbar .nav li', this.el);
            return this;
        },

        events: {
            "keyup .search-query": "search",
            "keypress .search-query": "onkeypress",
            "click  #btn-logout":    "logout",
            "click  #btn-addvacation":     "addvacation"

        },

     addvacation: function(e) {
         e.preventDefault();
         //router.navigate("bookmarks", true);
        var edview = new EditView({ model: new models.Employee() });
        alert(JSON.stringify(edview));
        edview.render();
     },


  logout: function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/V1/logout',
            dataType: 'json',
            success: function(data) {
            //alert(JSON.stringify(Appuser));
  
            $.cookie('full_name',null, {expires:7,path:'/'});
            $.cookie('status',null, {expires:7,path:'/'});
            $.cookie('message',null, {expires:7,path:'/'});
            $.cookie('role_id',null,{expires:7,path:'/'});
            $.cookie('manager',null,{expires:7,path:'/'});
            $.cookie('teammember',null,{expires:7,path:'/'});
            window.location = '/';
            }
        });  
    },
   
search: function (event) {
            var key = $('#searchText').val();
 /*       
     //this.employeeList.fetch({reset: true, data: {name: key}, success: function () {
              this.employeeList.fetch({reset: true, data: {}, success: function () {
              setTimeout(function () {
                    $('.dropdown').addClass('open');
                });
            }});
*/
        },

        onkeypress: function (event) {
            if (event.keyCode === 13) { // enter key pressed
                event.preventDefault();
            }
        },

selectMenuItem: function (menuItem) {
            $menuItems.removeClass('active');
            if (menuItem) {
                $('.' + menuItem).addClass('active');
            }
        }

    });

});
