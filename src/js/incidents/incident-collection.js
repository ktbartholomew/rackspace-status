var Backbone = require('backbone');
var IncidentModel = require('./incident-model');

var IncidentCollection = Backbone.Collection.extend({
  model: IncidentModel
});

module.exports = IncidentCollection;
