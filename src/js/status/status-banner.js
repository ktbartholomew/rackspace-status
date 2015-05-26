var Backbone = require('backbone'),
    StatusModel = require('./status-model');

var StatusBanner = Backbone.View.extend({
    model: new StatusModel(),
    render: function () {
        var StatusBanner = this;
        this.model.fetch().then(function (data) {
            if(data.status.indicator !== 'none') {
              return;
            }
            
            var template = require('./status-banner.html')['status-banner-template'];
            StatusBanner.el.innerHTML = template(data);

            window.setTimeout(function () {
              StatusBanner.el.querySelector('.rax-banner').classList.add('enter-active');
            }, 0);
        });

    }
});

module.exports = StatusBanner;
