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
          e.remove();
        });

        this.model.fetch().then(function (data) {
          data._ = _;
          data.moment = moment;
            var template = require('./unresolved-incidents-list.html')['unresolved-incidents'];
            UnresolvedIncidentsList.el.innerHTML = template(data);

            document.querySelector('.status-index .container').classList.add('show');
            document.querySelector('#loading-message').classList.add('fade-out');

            setTimeout(function () {
                document.querySelector('#loading-message').remove();
            }, 300);
        });

    }
});

module.exports = UnresolvedIncidentsList;
