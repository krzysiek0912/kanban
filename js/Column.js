function setupColumns(columns) {
  for (column of columns) {
    let col = new Column(column.id, column.name);
    board.addColumn(col);
    setupCards(col, column.cards);
  }
}

function Column(id, name) {
  var self = this;

  this.id = id;
  this.name = name;
  this.element = generateTemplate("column-template", {
    name: this.name,
    id: this.id
  });

  this.element
    .querySelector(".column")
    .addEventListener("click", function(event) {
      if (event.target.classList.contains("add-card")) {
        self.addColumn();
      } else if (event.target.classList.contains("btn-delete")) {
        self.removeColumn();
      } else if (event.target.classList.contains("column-title")) {
        self.editColumn();
      }
    });
}

Column.prototype = {
  addCard: function(card) {
    this.element.querySelector("ul").appendChild(card.element);
  },
  renameCard: function(card) {
    this.element.querySelector("h2").innerHTML = card.name;
  },
  addColumn: function() {
    const self = this;

    let cardName = prompt("Enter the name of the card"),
      data = new FormData();

    data.append("name", cardName);
    data.append("bootcamp_kanban_column_id", self.id);

    callApi("/card", "POST", data).then(function(resp) {
      var card = new Card(resp.id, cardName);
      self.addCard(card);
    });
  },
  editColumn: function() {
    const self = this,
      url = "/column/" + self.id;

    let data = new FormData(),
      cardName = prompt("Enter rename of the Column");

    data.append("name", cardName);
    data.append("bootcamp_kanban_column_id", self.id);

    callApi(url, "PUT", data).then(function(resp) {
      let card = new Card(resp.id, cardName);
      self.renameCard(card);
    });
  },
  removeColumn: function() {
    const self = this,
      url = "/column/" + self.id;

    callApi(url, "DELETE").then(function(resp) {
      self.element.parentNode.removeChild(self.element);
    });
  }
};
