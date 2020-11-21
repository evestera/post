const functions = require('firebase-functions');
const fetch = require("node-fetch");

exports.neste = functions.region('europe-west1').https.onRequest((request, response) => {
  const postnr = request.query.postnr;
  if (!postnr) {
    response.status(400);
    response.send('Feil: ?postnr=nnnn manglet.');
    return;
  }
  fetch('https://www.posten.no/levering-av-post-2020/_/component/main/1/leftRegion/1?postCode=' + postnr, {
    headers: {
      "Accept": "*/*",
      "x-requested-with": "XMLHttpRequest"
    }
  })
    .then(res => res.json())
    .then(res => {
      if (request.get('origin') == 'https://post-i-dag.web.app') {
        response.set('Access-Control-Allow-Origin', 'https://post-i-dag.web.app');
      }
      if (request.get('origin') == 'https://post.vestera.as') {
        response.set('Access-Control-Allow-Origin', 'https://post.vestera.as');
      }
      response.send(res.nextDeliveryDays[0]);
    })
    .catch(err => {
      response.send("Feil: " + err);
    })
});
