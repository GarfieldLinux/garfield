define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/ContactListItem.html'),

        template = _.template(tpl);

    return Backbone.View.extend({

        tagName: "li",

        initialize: function () {
            this.model.on("change", this.render, this);
        },

        render: function () {
            this.$el.html(template(this.model.attributes));
            //alert(JSON.stringify(this.model));
            return this;
        }

    });

});
