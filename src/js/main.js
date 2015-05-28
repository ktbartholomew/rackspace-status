document.body.id = 'rax-status-page';

var StatusBannerView = require('./status/status-banner');
var UnresolvedIncidentsList = require('./unresolved-incidents/unresolved-incidents-list');

new StatusBannerView({
  el: document.querySelector('.layout-content.status-index #rax-banner')
}).render();

new UnresolvedIncidentsList({
  el: document.querySelector('.layout-content.status-index .unresolved-incidents')
}).render();


$('.powered-by').appendTo('#vendor-credit');

$('.component-inner-container').each(function () {
  $(this).find('.group-parent-indicator').remove();
  $(this).find('.component-status').prependTo($(this).find('.name'));
});
