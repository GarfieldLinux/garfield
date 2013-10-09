define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),

        Employee = Backbone.Model.extend({
            urlRoot: "/V1/vacation",
            defaults: {
         startime: 'unknown',
         endtime: 'unknow',
         reason: 'No reason'
     },
   
        
            initialize: function () {
               this.vacations = new EmployeeCollection();
               //this.reports.manager = 'unknown' ;
               //this.reports.members = 'unknown';
            }

        }),

       AllEmployee = Backbone.Model.extend({
             urlRoot: "/V1/overall",
             daysoff_id: 'unknown',
             user_id: 'unknow',
             daysoff_start_date: 'unknown',
             daysoff_end_date: 'unknown',
             applied_date: 'unknown',
             full_name: 'unknown',
             applied_reason: 'unknown'

             
             }),
AllEmployeeCollection=Backbone.Collection.extend({

         model: AllEmployee,
             url: "/V1/overall"
         }),

//保存新建的数据信息
        EmployeeCollection = Backbone.Collection.extend({

            model: Employee,

            url: "/V1/vacation"

        });


      //  alert("获取数据");
    return {
        Employee: Employee,
        AllEmployee: AllEmployee,
        AllEmployeeCollection: AllEmployeeCollection,
        EmployeeCollection: EmployeeCollection
    };

});
