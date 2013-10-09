define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        models              = require('app/models/employee'),
        ContentListView     = require('app/views/ContentList'),
        tpl                 = require('text!tpl/ContactMain.html'),

        template = _.template(tpl);

    return Backbone.View.extend({

events: { 
                'click  [type="checkbox"]':'clicked',
            },


clicked : function(event ) { 
if($("input[type='checkbox']").is(':checked') ){
     //  alert("选中");
 alert("开始匹配所有雇员的vacation信息");
 var allemployee = new models.AllEmployeeCollection();
 allemployee.fetch({
                      success: function (data) {
                          // Note that we could also 'recycle' the same instance of EmployeeFullView
                          // instead of creating new instances
                          alert(JSON.stringify(data));
 _.each(data.models, function (employee) { 
                   //var emp = JSON.parse(JSON.stringify(employee));
                   var emp = JSON.parse(JSON.stringify(employee));
                   var obj = new Object();
                    //alert(emp.daysoff_start_date);
                    //alert(emp.daysoff_end_date);
                    //alert(new Date(parseInt(emp.daysoff_start_date)));
                   //alert(new Date(parseInt(emp.daysoff_end_date)));
                    obj.title = emp.full_name;
                    obj.color = '#BCE8F1';
                    obj.start = new Date(parseInt(emp.daysoff_start_date));
                    obj.end   = new Date(parseInt(emp.daysoff_end_date));
 $('#calendar').fullCalendar('renderEvent',obj, true);
 },this);
}});

alert(JSON.stringify(models));

}else{
       //alert("没有选中");
    var listView = new ContentListView({model: this.model.vacations, el: $('.report-calendar', this.el)});
    listView.render();
}
        },

        render: function () {
            alert("开始传入employee页面的model");
            this.model.vacations.fetch({
                   success: function (data) {
                       if (data.length === 0) {
                           $('.no-reports').show();//没有数据  显示ContactMain.html 中的 no-reports DIV 
                        }
                    }
                });

            var Appuser = new Object();
            Appuser.full_name = $.cookie('full_name');
            Appuser.teammember = $.cookie('teammember');
            Appuser.manager = $.cookie('manager');
            var pp = 0 ;
            alert(JSON.stringify(this.model.vacations));
            _.each(this.model.vacations.models, function (employee) {
                  var emp = JSON.parse(JSON.stringify(employee));
                  pp = pp+1+(parseInt(emp.daysoff_end_date) - parseInt(emp.daysoff_start_date))/86400000;
}, this);    
Appuser.count = pp ;
alert(pp);
            //alert(JSON.stringify(this.model.attributes));//by garfield
            this.$el.html(template(Appuser));
            alert("渲染结束");
//根据teammember 来确定是否为manager 来显示不通的区域
if($.cookie('teammember')!=""){
   //alert("组员不为空");
   $('.managerbox').show();
}else{
    //alert("组员为空");
   $('.managerbox').hide();
}

 var listView = new ContentListView({model: this.model.vacations, el: $('.report-calendar', this.el)});
 listView.render();
         return this;
        },
    });
});
