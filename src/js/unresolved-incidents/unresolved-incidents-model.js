var Backbone = require('backbone');

var UnresolvedIncidentModel = Backbone.Model.extend({
    url: function () {
        return '/api/v2/incidents/unresolved.json';
    }
});

module.exports = UnresolvedIncidentModel;
