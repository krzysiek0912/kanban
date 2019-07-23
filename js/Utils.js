function callApi(url, method = "GET", body) {
  const prefix = "https://cors-anywhere.herokuapp.com/",
    baseUrl = prefix + "https://kodilla.com/pl/bootcamp-api",
    myHeaders = {
      "X-Client-Id": "4281",
      "X-Auth-Token": "a28d7a17e38d45383e577c95369dc612"
    };
  return fetch(baseUrl + url, { headers: myHeaders, method, body }).then(
    function(resp) {
      return resp.json();
    }
  );
}

function generateTemplate(name, data, basicElement) {
  const template = document.getElementById(name).innerHTML,
    element = document.createElement(basicElement || "div");

  Mustache.parse(template);
  element.innerHTML = Mustache.render(template, data);

  return element;
}

function setupCards(col, cards) {
  for (card of cards) {
    let cardObj = new Card(card.id, card.name);
    col.addCard(cardObj);
  }
}
