define(function (require) {

    "use strict";

    var $                       = require('jquery'),
        _                       = require('underscore'),
        Backbone                = require('backbone'),
        ContentListItemView    = require('app/views/Contact'),
        tpl                    = require('text!tpl/fullc.html'),
 template = _.template(tpl); 



    return Backbone.View.extend({

events: {
       "click  input"   :        "picker"
     },


        initialize: function () {
            this.collection.on("reset", this.render, this);
            this.collection.on("add", this.render, this);
            this.collection.bind('change', this.change);
            this.eventView = new EventView();
        },

        render: function () {

this.$('#calendar').fullCalendar({
                 header: {
                     left: 'prev,next today',
                     center: 'title',
                     right: 'month,basicWeek,basicDay'
                 },
                 firstDay: 1,
                 selectable: true,
                 selectHelper: true,
                 editable: true,
                 ignoreTimezone: false,
                 select: this.select,
				 dayClick: this.dayClick,
                 eventClick: this.eventClick,
                 eventDrop: this.eventDropOrResize,
                 eventResize: this.eventDropOrResize,
/*   events: [
{title: 'All Day Event',start: '2013/09/1'},
{title: 'Long Event',start: '2013/09/1',end: '2013/09/1'},
{title: 'Click for Google',start: '2013/09/4',end: '2013/09/20',url: 'http://google.com/'}
]   */
             });



//this.$el.empty();
       alert(JSON.stringify(this.collection.models));
       this.$el.html(template(this.collection.models.attributes));
/*
 *
            this.$el.empty();
            _.each(this.collection.models, function (employee) {
                //alert(JSON.stringify(employee));
                this.$el.append(new ContentListItemView({model: employee}).render().el);
            }, this);
*/    
        return this;
        },
   dayClick: function(date, allDay, jsEvent, view) {
             alert("某天的单击事件");
var selectdate = $.fullCalendar.formatDate(date, "yyyy-MM-dd");//选择当前日期的时间转换
alert(selectdate);//OK 获取到点击那天的日期
 $("#end").datepicker('setDate', selectdate);//给时间空间赋值
 $("#reservebox").dialog({
       autoOpen: true,
       height: 450,
       width: 600,
       title: 'Vacation  ' + selectdate,
       modal: true,
       position: "center",
       draggable: false,
       beforeClose: function (event, ui) {
           //$.validationEngine.closePrompt("#meeting");
           //$.validationEngine.closePrompt("#start");
           //$.validationEngine.closePrompt("#end");
           },
       timeFormat: 'HH:mm{ - HH:mm}',
       buttons: {
          "close": function () {
          $(this).dialog("close");
       },
       "reserve": function () {
           var startdatestr = $("#start").val(); //开始时间
           var enddatestr = $("#end").val(); //结束时间
           var det = $("#details").val(); //内容 
           var id2;
           var startdate = $.fullCalendar.parseDate(selectdate + "T" + startdatestr);//时间和日期拼接
           var enddate = $.fullCalendar.parseDate(enddatestr);
           var schdata = { reason: det, startdate: selectdate  + startdatestr, enddate: enddatestr };
                alert(JSON.stringify(schdata));
           $.ajax({
               type: "POST", //使用post方法访问后台
               url: "http://10.110.162.58:4000/V1/vacation", //要访问的后台地址
               data: schdata, //要发送的数据
               success: function (data) {
               //对话框里面的数据提交完成，data为操作结果
               id2 = data;
               var schdata2 = {  fullname: Appuser.user_id, description: det,   start: selectdate + ' ' + startdatestr, end: enddatestr, id: id2 };
               $('#calendar').fullCalendar('renderEvent', schdata2, true);
               $("#start").val(''); //开始时间
               $("#end").val(''); //结束时间
               $("#details").val(''); //内容 
            }
        });
        $(this).dialog("close");
}
                     }
});
        $("#reservebox").dialog("open");
                return false;
},

eventClick: function (event) {
             },
picker: function() {
 alert($.fn.jquery);//打印加载的jquery版本信息
   this.$('#start').datepicker({format: "dd/MM/yyyy"});
    this.$('#end').datepicker({format: "dd/MM/yyyy"});
 },


  select: function(startDate, endDate) {
             alert("select 事件");
new EventView().render();
             //this.eventView.collection = this.collection;
             //this.eventView.model = new Event({start: startDate, end: endDate});
             //this.eventView.render();
         }


    });

});


var EventView = Backbone.View.extend({
   // el: $('#eventDialog'),
    initialize: function() {
        _.bindAll(this);
    },
    render: function() {
        this.$('#eventDialog').dialog({
            modal: true,
            title: 'New Event',
            buttons: {'Cancel': this.close},
             open: this.open

        });
alert("初始化对话框"); 
        return this;
    },
open: function() {
             this.$('#title').val(this.model.get('title'));
             this.$('#color').val(this.model.get('color'));
         },

    close: function() {
        this.$('#eventDialog').dialog('close');
    }
});


