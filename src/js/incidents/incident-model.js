var Backbone = require('backbone');

var IncidentModel = Backbone.Model.extend({
    url: function () {
        return '/api/v2/incidents.json';
    }
});

module.exports = IncidentModel;
