var Backbone = require('backbone'),
    _ = require('underscore'),
    UnresolvedIncidentModel = require('./unresolved-incidents-model');

var UnresolvedIncidentsList = Backbone.View.extend({
    model: new UnresolvedIncidentModel(),
    render: function () {
        var UnresolvedIncidentsList = this;

        var staticIncidents = this.el.querySelectorAll('.unresolved-incident');
        _.forEach(staticIncidents, function (e,i,a) {
          e.remove();
        });

        this.model.fetch().then(function (data) {
          data._ = _;
            console.log(data.incidents[0]);
            var template = require('./unresolved-incidents-list.html')['unresolved-incidents'];
            UnresolvedIncidentsList.el.innerHTML = template(data);
        });

    }
});

module.exports = UnresolvedIncidentsList;
