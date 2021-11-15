const functions = require('firebase-functions');
const fetch = require("node-fetch");

function setCorsHeader(request, response) {
  if (request.get('origin') == 'https://post-i-dag.web.app') {
    response.set('Access-Control-Allow-Origin', 'https://post-i-dag.web.app');
  }
  if (request.get('origin') == 'https://post.vestera.as') {
    response.set('Access-Control-Allow-Origin', 'https://post.vestera.as');
  }
  if (process.env.FUNCTIONS_EMULATOR) {
    response.set('Access-Control-Allow-Origin', '*');
  }
}

exports.neste = functions.region('europe-west1').https.onRequest((request, response) => {
  setCorsHeader(request, response);
  const postnr = request.query.postnr;
  if (!postnr) {
    response.status(400);
    response.send('Feil: ?postnr=nnnn manglet.');
    return;
  }
  fetch('https://www.posten.no/levering-av-post/_/component/main/1/leftRegion/1?postCode=' + postnr, {
    headers: {
      "Accept": "*/*",
      "x-requested-with": "XMLHttpRequest"
    }
  })
    .then(res => {
      if (res.status > 399) {
        throw new Error(`Fikk HTTP ${res.status} fra posten.no`)
      }
      return res.json();
    })
    .then(res => {
      response.send(res.nextDeliveryDays[0]);
    })
    .catch(err => {
      response.status(500);
      response.send("" + err);
    })
});
