function setupCards(col, cards) {
  cards.forEach(function(card) {
    var cardObj = new Card(card.id, card.name);
    col.addCard(cardObj);
  });
}
function Card(id, name) {
  var self = this;

  this.id = id;
  this.name = name || "No name given";
  this.element = generateTemplate(
    "card-template",
    { name: this.name, id: this.id },
    "li"
  );
  this.element
    .querySelector(".card")
    .addEventListener("click", function(event) {
      event.stopPropagation();

      if (event.target.classList.contains("btn-delete")) {
        self.removeCard();
      } else {
        self.editCard();
      }
    });
}

Card.prototype = {
  removeCard: function() {
    var self = this;

    fetch(baseUrl + "/card/" + self.id, {
      method: "DELETE",
      headers: myHeaders
    })
      .then(function(resp) {
        return resp.json();
      })
      .then(function(resp) {
        self.element.parentNode.removeChild(self.element);
      });
  },
  editCard: function() {
    let self = this,
      cardName = prompt("Enter rename of the card"),
      id = self.element.parentNode.getAttribute("id"),
      description = self.element.querySelectorAll(".card-description")[0];

    event.preventDefault();

    fetch(baseUrl + "/card/" + self.id, {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        name: cardName,
        bootcamp_kanban_column_id: id
      })
    })
      .then(function(resp) {
        return resp.json();
      })
      .then(function(resp) {
        description.innerHTML = cardName;
      });
  }
};
