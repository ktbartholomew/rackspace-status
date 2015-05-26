var Backbone = require('backbone');

var StatusModel = Backbone.Model.extend({
    url: function () {
        return '/api/v2/status.json';
    }
});

module.exports = StatusModel;