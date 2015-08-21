var Backbone = require('backbone');

var MaintenanceView = Backbone.View.extend({
    render: function () {
        var openModal = function () {
            var modalBG = document.querySelector('#maintenance-policy-modal .modal-backdrop');
            var modal = document.querySelector('#maintenance-policy-modal .modal');

            modalBG.classList.remove('hide');
            modalBG.classList.add('fade');

            modal.classList.remove('hide');
            modal.classList.add('fade');

            setTimeout(function () {
                modalBG.classList.add('in');
            }, 50);

            setTimeout(function () {
                modal.classList.add('in');
            }, 150);
        };

        var closeModal = function () {
            var modalBG = document.querySelector('#maintenance-policy-modal .modal-backdrop');
            var modal = document.querySelector('#maintenance-policy-modal .modal');

            modal.classList.remove('in');
            modalBG.classList.remove('in');

            setTimeout(function () {
                modal.classList.remove('fade');
                modal.classList.add('hide');

                modalBG.classList.remove('fade');
                modalBG.classList.add('hide');
            }, 600);
        };

        var title = this.el.querySelector('.font-largest');

        var maintenanceLink = document.createElement('a');
            maintenanceLink.className = 'maintenance-policy-link';
            maintenanceLink.textContent = 'Maintenance Policy';
            maintenanceLink.href = '#';

        maintenanceLink.addEventListener('click', function (e) {
            e.preventDefault();
            openModal();
        });

        title.appendChild(maintenanceLink);

        var template = require('./scheduled-maintenance.html')['maintenance-policy'];
        var templateWrapper = document.createElement('div');
            templateWrapper.id = 'maintenance-policy-modal';
            templateWrapper.innerHTML = template({});

        document.body.appendChild(templateWrapper);

        var closeLinks = document.body.querySelectorAll('#maintenance-policy-modal .close');
        var closeLinkHandler = function (e) {
            e.preventDefault();
            closeModal();
        };

        for(var i = 0; i < closeLinks.length; i++) {
            closeLinks[i].addEventListener('click', closeLinkHandler);
        }

        document.addEventListener('keyup', function (e) {
            if(e.keyCode === 27) {
                closeModal();
            }
        });
    }
});

module.exports = MaintenanceView;
