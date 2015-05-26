document.body.id = 'rax-status-page';

var StatusBannerView = require('./status/status-banner');
var UnresolvedIncidentsList = require('./unresolved-incidents/unresolved-incidents-list');

new StatusBannerView({
  el: document.querySelector('#rax-banner')
}).render();

new UnresolvedIncidentsList({
  el: document.querySelector('.unresolved-incidents')
}).render();

$('.component-inner-container').each(function () {
  $(this).find('.group-parent-indicator').remove();
  $(this).find('.component-status').prependTo($(this).find('.name'));
});

var theirBanner = document.querySelector('.page-status');

if(theirBanner && theirBanner.classList.contains('status-none')) {
    document.querySelector('.components-section').remove();
    document.querySelector('.page-status').remove();
}
