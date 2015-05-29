var Backbone = require('backbone'),
    _ = require('underscore'),
    moment = require('moment'),
    UnresolvedIncidentModel = require('./unresolved-incidents-model');

var UnresolvedIncidentsList = Backbone.View.extend({
    model: new UnresolvedIncidentModel(),
    render: function () {
        var UnresolvedIncidentsList = this;

        var staticIncidents = this.el.querySelectorAll('.unresolved-incident');
        _.forEach(staticIncidents, function (e,i,a) {
            var incidentTitle = $(e).find('.incident-title');
            var idLink = $(e).find('[id*="btn-subscribe-modal-"]');

            var incidentId = idLink.attr('id').replace('btn-subscribe-modal-', '');

            var details = $(
                require('./unresolved-incidents-list.html')['incident-details']({})
            );

            var oldUpdates = $(e).find('.updates');
            var newUpdates = details.find('.updates .list');
            newUpdates.html(oldUpdates.html());

            oldUpdates.remove();
            details.insertAfter(incidentTitle);
            $(e).attr('data-incident-id', incidentId);
        });

        this.model.fetch().then(function (data) {
            _(data.incidents).forEach(function (incident, index, scope) {
                incident._ = _;

                var incidentContainer = $('[data-incident-id="' + incident.id + '"]');
                var componentContainer = incidentContainer.find('.components .list');

                var template = require('./unresolved-incidents-list.html')['incident-components'];
                componentContainer.html(template(incident));
            });
        });

    }
});

module.exports = UnresolvedIncidentsList;
