document.body.id = 'rax-status-page';


var UnresolvedIncidentsList = require('./unresolved-incidents/unresolved-incidents-list');
var CurrentYear = require('./current-year');

if(document.querySelector('.layout-content.status-index #rax-banner')) {
    var StatusBannerView = require('./status/status-banner');
    new StatusBannerView({
        el: document.querySelector('.layout-content.status-index #rax-banner')
    }).render();
}

if(document.querySelector('.layout-content.status-index .unresolved-incidents')) {
  new UnresolvedIncidentsList({
    el: document.querySelector('.layout-content.status-index .unresolved-incidents')
  }).render();
}

if(document.querySelector('.scheduled-maintenances-container')) {
    var MaintenanceView = require('./maintenance/scheduled-maintenance');

    new MaintenanceView({
        el: document.querySelector('.scheduled-maintenances-container')
    }).render();
}

if(document.querySelector('.layout-content.status-index .components-section')) {
    var ComponentsRollup = require('./components/components-rollup');
    new ComponentsRollup({
        el: document.querySelector('.layout-content.status-index .components-section')
    }).render();
}

if(document.querySelector('.current-year')) {
  new CurrentYear({
    el: document.querySelector('.current-year')
  }).render();
}

$('.powered-by').appendTo('#vendor-credit');

$('.component-inner-container').each(function () {
  $(this).find('.group-parent-indicator').remove();
  $(this).find('.component-status').prependTo($(this).find('.name'));
});
