function Card(id, name) {
  const self = this;

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
    const self = this,
      url = "/card/" + self.id;

    callApi(url, "DELETE").then(function(resp) {
      self.element.parentNode.removeChild(self.element);
    });
  },
  editCard: function() {
    const self = this,
      url = "/card/" + self.id;

    let cardName = prompt("Enter rename of the card"),
      id = self.element.parentNode.getAttribute("id"),
      description = self.element.querySelector(".card-description"),
      body = JSON.stringify({
        name: cardName,
        bootcamp_kanban_column_id: id
      });

    callApi(url, "PUT", body).then(function(resp) {
      description.innerHTML = cardName;
    });
  }
};
