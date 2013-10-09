define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        ShellView   = require('app/views/Shell'),
        HomeView    = require('app/views/Home'),

        $body = $('body'),
        shellView = new ShellView({el: $body}).render(),
        $content = $("#content", shellView.el),
        homeView = new HomeView({el: $content});

    // Close the search dropdown on click anywhere in the UI
    $body.click(function () {
        $('.dropdown').removeClass("open");
    });

    $("body").on("click", "#showMeBtn", function (event) {
        event.preventDefault();
        shellView.search();
    });

    return Backbone.Router.extend({

        routes: {
      //      "": "home",
      //      "contact":  "ContentDetails"
            "":  "ContentDetails"
         // "employees/:id": "employeeDetails"
        },

        home: function () {
            if (typeof $.cookie('full_name') != null){
            this.ContentDetails();
}else{
 
            shellView.selectMenuItem('home-menu');
            homeView.delegateEvents(); // delegate events when the view is recycled
            homeView.render();
            //shellView.selectMenuItem('home-menu');
}
        },

        contact: function () {
            require(["app/views/Contact"], function (ContactView) {
                var view = new ContactView({el: $content});
                view.render();
                shellView.selectMenuItem('contact-menu');
            });
        },

ContentDetails: function (id) {

            if (typeof $.cookie('full_name') != null){
            require(["app/views/ContentMain", "app/models/employee"], function (ContentMainView, models) {
                var employee = new models.Employee({id: id});
                 // alert(JSON.stringify(employee));
                //用于从服务器接口获取集合的初始化数据，覆盖或追加到集合列表中 
                    employee.fetch({
                    success: function (data) {
                        // Note that we could also 'recycle' the same instance of EmployeeFullView
                        // instead of creating new instances
                       // alert("取得model返回数据");
                        //alert(JSON.stringify(data));
                        var view = new ContentMainView({model: data, el: $content});
                       // alert(JSON.stringify(view));
                        view.render();//渲染单个雇员个人页面的信息
                    },
                    error: function (data) {
                    //alert("服务器返回数据出错");
                      $.cookie('full_name',null, {expires:7,path:'/'});
                      $.cookie('status',null, {expires:7,path:'/'});
                      $.cookie('message',null, {expires:7,path:'/'});
                      $.cookie('role_id',null,{expires:7,path:'/'});
                      $.cookie('manager',null,{expires:7,path:'/'});
                      $.cookie('teammember',null,{expires:7,path:'/'});
                      homeView.render();
                    
                    }
                });
            });
}else{
 shellView.selectMenuItem('home-menu');
            homeView.delegateEvents(); // delegate events when the view is recycled
            homeView.render();
}
        },

        employeeDetails: function (id) {
            require(["app/views/Employee", "app/models/employee"], function (EmployeeView, models) {
                var employee = new models.Employee({id: id});
                 // alert(JSON.stringify(employee));
                //用于从服务器接口获取集合的初始化数据，覆盖或追加到集合列表中 
                    employee.fetch({
                    success: function (data) {
                        // Note that we could also 'recycle' the same instance of EmployeeFullView
                        // instead of creating new instances
                       // alert(JSON.stringify(data));
                        var view = new EmployeeView({model: data, el: $content});
                       // alert(JSON.stringify(view));
                        view.render();//渲染单个雇员个人页面的信息
                    }
                });
                    //alert("fetch 数据结束");  
                shellView.selectMenuItem();
            });
        }

    });

});
