var Backbone = require('backbone');

var ComponentsRollup = Backbone.View.extend({
    show: false,
    firstRenderComplete: false,
    render: function () {
        if(!this.firstRenderComplete) {
            return this.firstRender();
        }

        if(this.show) {
            this.el.classList.add('show');
        }
        else {
            this.el.classList.remove('show');
        }
    },
    firstRender: function () {
        var rollupLink = document.createElement('button');
        rollupLink.className = 'components-toggle';
        rollupLink.innerHTML = '<span class="show">Show</span><span class="hide">Hide</span> All Components/Statuses <span class="fa fa-caret-down"></span>';

        this.el.insertBefore(rollupLink, this.el.children[0]);
        this.addEventListeners();

        this.firstRenderComplete = true;
    },
    addEventListeners: function () {
        var ComponentsRollup = this;
        $(this.el).on('click', '.components-toggle', function (e) {
            ComponentsRollup.show = !ComponentsRollup.show;
            ComponentsRollup.render();
        });
    }
});

module.exports = ComponentsRollup;
