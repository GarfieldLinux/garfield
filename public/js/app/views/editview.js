define(function (require) {

     "use strict";

     var $                   = require('jquery'),
         _                   = require('underscore'),
         Backbone            = require('backbone'),
         EmployeeListView    = require('app/views/EmployeeList'),
         models              = require('app/models/employee'),
         tpl                 = require('text!tpl/editview.html'),
         template = _.template(tpl);

        return  Backbone.View.extend({
    
    events: {
      "click .save":            "save",
      "click .cancel":          "cancel",
      "submit form":            "save",
      "click  input"   :        "picker"

    },
    
    initialize: function() {
        _.bindAll(this, 'render', 'unrender', 'save', 'cancel');
    },

    render: function() {
        alert(JSON.stringify(this.model.attributes));
        this.$el.html(template(this.model.attributes));//将model数据传输给view      
        $('body').append(this.el);
       //by garfield
       /* 
        this.$el.modal({
            backdrop: true,
            keyboard: false,
            show: true
        });
   */
 },
    
    unrender: function() {
        //this.$el.modal('hide');
        $(this.el).remove();
    },
   
picker: function() {
   $('#releaseDate').datepicker({format: "yyyy-MM-dd"});
   $('#releaseDate1').datepicker({format: "yyyy-MM-dd"});
//alert($.fn.jquery);//打印加载的jquery版本信息
},
 
    save: function(e) {
        e.preventDefault();
        
        var startime = this.$('input[name=startime]').val();
        var endtime = this.$('input[name=endtime]').val();
        var reason = this.$('input[name=reason]').val();
        
        this.model.set({ startdate: Date.parse(startime), enddate: Date.parse(endtime), reason: reason, curTimestamp:Date.parse(new Date())});
        this.model.save(null, {
        success :function(model) {
alert("保存成功哦");
 
 var obj = new Object();
             obj.title = $.cookie('full_name');
             obj.start = new Date(startime);
             obj.end   = new Date(endtime);
 alert(JSON.stringify(obj));
     $('#calendar').fullCalendar('renderEvent',obj, true);

 //  window.location = '/';  不采取这种方式
},
error :function(model) {
         alert("保存错误 请联系维护人员");
       }
});

//         $("#calendar").fullCalendar( 'refetchEvents' );
       /* //刷新自身页面的collection 
        if (this.model.isNew()) {
            router.view.body.collection.add(this.model, { at: 0 });
        } else {
            $(router.view.body.el).masonry('reload');
        }
        */
        this.unrender();
    },
    
    cancel: function(e) {
        e.preventDefault();
        this.unrender();
    }
    
});

});


