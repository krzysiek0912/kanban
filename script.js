document.addEventListener("DOMContentLoaded", function() {
  function randomString() {
    var chars = "0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ";
    var str = "";
    for (var i = 0; i < 10; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  function generateTemplate(name, data, basicElement) {
    var template = document.getElementById(name).innerHTML;
    var element = document.createElement(basicElement || "div");

    Mustache.parse(template);
    element.innerHTML = Mustache.render(template, data);

    return element;
  }

  //Column
  function Column(name) {
    var self = this;

    this.id = randomString();
    this.name = name;
    this.element = generateTemplate("column-template", {
      name: this.name,
      id: this.id
    });

    this.element
      .querySelector(".column")
      .addEventListener("click", function(event) {
        if (event.target.classList.contains("btn-delete")) {
          self.removeColumn();
        }

        if (event.target.classList.contains("add-card")) {
          self.addCard(new Card(prompt("Enter the name of the card")));
        }
      });
  }

  Column.prototype = {
    addCard: function(card) {
      this.element.querySelector("ul").appendChild(card.element);
    },
    removeColumn: function() {
      this.element.parentNode.removeChild(this.element);
    }
  };

  //Card
  function Card(description) {
    var self = this;

    this.id = randomString();
    this.description = description;
    this.element = generateTemplate(
      "card-template",
      { description: this.description },
      "li"
    );
    this.element
      .querySelector(".card")
      .addEventListener("click", function(event) {
        event.stopPropagation();

        if (event.target.classList.contains("btn-delete")) {
          self.removeCard();
        }
      });
  }

  Card.prototype = {
    removeCard: function() {
      this.element.parentNode.removeChild(this.element);
    }
  };
  //Board
  function Board(name) {
    var self = this;

    this.id = randomString();
    this.name = name;
    this.element = generateTemplate("board-template", {
      name: this.name,
      id: this.id
    });

    this.element
      .querySelector(".board")
      .addEventListener("click", function(event) {
        if (event.target.classList.contains("btn-delete-board")) {
          self.removeBoard();
        }

        if (event.target.classList.contains("create-column")) {
          self.addColumn(new Column(prompt("Enter the name of the Column")));
        }
      });
  }

  Board.prototype = {
    addColumn: function(column) {
      this.element
        .querySelector(".column-container")
        .appendChild(column.element);
      this.initSortable(column.id);
    },
    removeBoard: function() {
      this.element.parentNode.removeChild(this.element);
    },
    initSortable(id) {
      var el = document.getElementById(id);
      var sortable = Sortable.create(el, {
        group: this.id,
        sort: true
      });
    }
  };

  var main = {
    name: "Kanban Board",
    addBoard: function(board) {
      this.element.appendChild(board.element);
    },
    element: document.querySelector("#main .board-container")
  };

  document
    .querySelector("#main .create-board")
    .addEventListener("click", function() {
      var name = prompt("Enter a Board name");
      var board = new Board(name);
      main.addBoard(board);
    });

  // RUN

  // CREATING BOARD
  var boardFirst = new Board("Board");

  main.addBoard(boardFirst);

  // CREATING COLUMNS
  var todoColumn = new Column("To do");
  var doingColumn = new Column("Doing");
  var doneColumn = new Column("Done");

  // ADDING COLUMNS TO THE BOARD
  boardFirst.addColumn(todoColumn);
  boardFirst.addColumn(doingColumn);
  boardFirst.addColumn(doneColumn);

  // CREATING CARDS
  var card1 = new Card("New task");
  var card2 = new Card("Create kanban boards");

  // ADDING CARDS TO COLUMNS
  todoColumn.addCard(card1);
  doingColumn.addCard(card2);
});
