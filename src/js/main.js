document.body.id = 'rax-status-page';

var StatusBannerView = require('./status/status-banner');
var UnresolvedIncidentsList = require('./unresolved-incidents/unresolved-incidents-list');

var StatusBanner = new StatusBannerView({el: document.querySelector('#rax-banner')});
StatusBanner.render();

var incidentsList = new UnresolvedIncidentsList({
  el: document.querySelector('.unresolved-incidents')
});
incidentsList.render();


// (function getStatus () {
//     var request = new XMLHttpRequest();
//     request.open('GET', '/api/v2/status.json', true);

//     request.onload = function () {
//         var data = JSON.parse(request.responseText);
//         document.querySelector('.rax-banner h1').textContent = data.status.description;
//         document.querySelector('.rax-banner').classList.add(data.status.indicator);
//     };

//     request.send();
// })();

var theirBanner = document.querySelector('.page-status');

if(theirBanner && theirBanner.classList.contains('status-none')) {
    document.querySelector('.components-section').remove();
    document.querySelector('.page-status').remove();
}
