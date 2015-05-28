var Backbone = require('backbone');

var CurrentYear = Backbone.View.extend({
  render: function () {
    var d = new Date();
    this.el.textContent = d.getFullYear();
  }
});

module.exports = CurrentYear;
