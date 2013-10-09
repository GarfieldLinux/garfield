define(function (require) {

    "use strict";

    var $                     = require('jquery'),
        _                     = require('underscore'),
        Backbone              = require('backbone'),
        ContentListItemView   = require('app/views/Contact'),
        models              = require('app/models/employee'),
        EditView            = require('app/views/editview'),
        tpl                   = require('text!tpl/fullc.html'),
        template              = _.template(tpl),
        stringevents          = [] ;

    return Backbone.View.extend({

        initialize: function () {
        },

reload: function(data) {
        stringevents          = []  ;
       alert("加载表格数据");
       alert(JSON.stringify(this.model.models));
       _.each(this.model.models, function (employee) { 
                //alert(JSON.stringify(employee));
                 var emp = JSON.parse(JSON.stringify(employee));
                 var data = {};  
                  //alert(emp.daysoff_start_date);
                  //alert(emp.daysoff_end_date);
                  //alert(new Date(parseInt(emp.daysoff_start_date)));
                  //alert(new Date(parseInt(emp.daysoff_end_date)));
                  data['title'] = emp.full_name;
                  data['start'] = new Date(parseInt(emp.daysoff_start_date));
                  data['end']   = new Date(parseInt(emp.daysoff_end_date));
                  stringevents.push(data); 
                //alert(JSON.stringify(employee));
             }, this);
      alert(JSON.stringify(stringevents)); 
},

        render: function () {
//this.$el.empty();
       alert("传入的model");
       alert(JSON.stringify(this.model));
       //alert(JSON.stringify(Appuser));
       alert("渲染表格");
      this.reload();
      this.$el.html(template());
      
        var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();

$('#calendar').fullCalendar({
                   header: {
                     left: 'prev,next today',
                     center: 'title',
                     right: 'month,basicWeek,basicDay'
                 },
                 firstDay: 1,
                 contentHeight: 600,
                 //draggable: true, 
                 selectable: true,
                 selectHelper: true,
                 editable: false,
                 ignoreTimezone: false,
                 select: this.select,//日期选择事件  与点击事件取其一即可
				 //dayClick: this.dayClick,//日期点击时间 该方法用来生成假期申请表格 使用上面的选择事件
                 //eventClick: this.eventClick,
                 //eventDrop: this.eventDropOrResize,
                 //eventResize: this.eventDropOrResize,
                 events:   stringevents, 
				
             });
        return this;
        },

dayClick: function(date, allDay, jsEvent, view) {
    alert("某天的单击事件");
},

eventClick: function (event) {

             },



select: function(start, end, allDay) {
				//alert("select 事件");
				var startdate = $.fullCalendar.formatDate(start, "yyyy-MM-dd");
				var enddate = $.fullCalendar.formatDate(end, "yyyy-MM-dd");
				var vacation_data = new Object();
				vacation_data.startime = startdate;
				vacation_data.endtime  = enddate;
				var edview = new EditView({ model: new models.Employee(vacation_data) });
				alert(vacation_data);
				edview.render();
		}
});
});


