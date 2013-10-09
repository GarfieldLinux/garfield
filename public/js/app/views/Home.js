define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Home.html'),
        template            = _.template(tpl);

    return Backbone.View.extend({
/*
     events: {
            "submit #frm-login":           "login",
            "click  #btn-logout":          "logout"
      },
*/

 events: { 
      "submit #frm-login":     "login"
},

render: function() {
            this.$el.html(template());
//判断用户是否登录
if (typeof $.cookie('full_name') != null){ 
   $('#header .logout').hide();
   //alert("用户已经登录");

           require(["app/views/ContentMain", "app/models/employee"], function (ContentMainView, models) {
                 var employee = new models.Employee();
                  // alert(JSON.stringify(employee));
                 //用于从服务器接口获取集合的初始化数据，覆盖或追加到集合列表中 
                     employee.fetch({
                     success: function (data) {
                         // Note that we could also 'recycle' the same instance of EmployeeFullView
                         // instead of creating new instances
                        // alert("取得model返回数据");
                         alert(JSON.stringify(data));
                         var view = new ContentMainView({model: data, el: $content});
                        // alert(JSON.stringify(view));
                         view.render();//渲染单个雇员个人页面的信息
                     },
                     error: function (data) {
                    // alert("服务器返回数据出错  重新渲染登录页面");
                        $.cookie('full_name',null, {expires:7,path:'/'});
                        $.cookie('status',null, {expires:7,path:'/'});
                        $.cookie('message',null, {expires:7,path:'/'});
                        $.cookie('role_id',null,{expires:7,path:'/'});
                        $.cookie('manager',null,{expires:7,path:'/'});
                        $.cookie('teammember',null,{expires:7,path:'/'});
                        
                     }
                 });
             });


//window.location = '/#contact'
  }else{
          alert("用户未登录");
       }
return this;
},


 login: function(e) {
         e.preventDefault();
 
         var username = $('#loginmain input[name=username]').val();
         var password = $('#loginmain input[name=password]').val();
 
         $.ajax({
             type: 'POST',
             url: '/V1/login',
             dataType: 'json',
             data: { username: username, password: password },
             success: function(data) {
               alert("从验证服务器获取到登录验证数据");
               if(data.status==100){
               //$('#Shell .public').hide();
               $('#login').hide();
               //登录成功失败控制UI显示
               alert(JSON.stringify(data));
                $.cookie('full_name',data.full_name, {expires:7,path:'/'});
                $.cookie('status',data.status, {expires:7,path:'/'});
                $.cookie('message',data.message, {expires:7,path:'/'});
                $.cookie('role_id',data.role_id,{expires:7,path:'/'});
                $.cookie('manager',data.manager,{expires:7,path:'/'});
                $.cookie('teammember',data.teammember,{expires:7,path:'/'});
               // Appuser = data;//接受数据
/*
                alert(JSON.stringify($.cookie('full_name')));
                alert(JSON.stringify($.cookie('status')));
                alert(JSON.stringify($.cookie('message')));
                alert(JSON.stringify($.cookie('role_id')));
                alert(JSON.stringify($.cookie('manager')));
                alert(JSON.stringify($.cookie('teammember')));
*/
                  window.location = '/'; 
                }else{
                         alert(data.status);
                     }
             },
             error: function() {
                 alert("登录失败");
                 $('#login-error').html('That username &amp; password was not found.').addClass('alert-message').addClass('error');
             }
        });
     }
    });

});


