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
    var self = this;
    console.log(this.id);
    var cardName = prompt("Enter rename of the card");
    event.preventDefault();

    fetch(baseUrl + "/card/" + self.id, {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        name: cardName,
        bootcamp_kanban_column_id: self.id
      })
    })
      .then(function(resp) {
        console.log(resp);
        return resp.json();
      })
      .then(function(resp) {
        self.element.parentNode.removeChild(self.element);
      });
  }
};
