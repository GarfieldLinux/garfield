define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        EmployeeListView    = require('app/views/EmployeeList'),
        tpl                 = require('text!tpl/Employee.html'),

        template = _.template(tpl);

    return Backbone.View.extend({

        render: function () {
            //alert("开始传入employee页面的model");
            //alert(JSON.stringify(this.model.attributes));
            //by garfield
            this.$el.html(template(this.model.attributes));//传入模班的model调用了attributes方法，也就是toJSON，因为在模板中通常直接调用JSON中的key
            this.model.reports.fetch({
                success: function (data) {
                    if (data.length === 0) {
                        $('.no-reports').show();//没有数据  显示Employee.html 中的 no-reports DIV 
                    }
                }
            });
     var listView = new EmployeeListView({collection: this.model.reports, el: $('.report-list', this.el)});
     listView.render();
      
         return this;
        }
    });

});
