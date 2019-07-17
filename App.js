let prefix = "https://cors-anywhere.herokuapp.com/",
  baseUrl = prefix + "https://kodilla.com/pl/bootcamp-api",
  myHeaders = {
    "X-Client-Id": "4281",
    "X-Auth-Token": "a28d7a17e38d45383e577c95369dc612"
  };
var main = {
  name: "Kanban Board",
  addBoard: function(board) {
    this.element.appendChild(board.element);
  },
  element: document.querySelector("#main .board-container")
};
let board = new Board(name);
main.addBoard(board);
fetch(baseUrl + "/board", { headers: myHeaders })
  .then(function(resp) {
    return resp.json();
  })
  .then(function(resp) {
    console.log(resp);
    setupColumns(resp.columns);
  });

function generateTemplate(name, data, basicElement) {
  var template = document.getElementById(name).innerHTML;
  var element = document.createElement(basicElement || "div");

  Mustache.parse(template);
  element.innerHTML = Mustache.render(template, data);

  return element;
}

document
  .querySelector("#main .create-board")
  .addEventListener("click", function() {
    var name = prompt("Enter a Board name");
    let board = new Board(name);
    main.addBoard(board);
  });

// RUN

// // CREATING BOARD
// var boardFirst = new Board("Board");

// main.addBoard(boardFirst);

// // CREATING COLUMNS
// var todoColumn = new Column("To do");
// var doingColumn = new Column("Doing");
// var doneColumn = new Column("Done");

// // ADDING COLUMNS TO THE BOARD
// boardFirst.addColumn(todoColumn);
// boardFirst.addColumn(doingColumn);
// boardFirst.addColumn(doneColumn);

// // CREATING CARDS
// var card1 = new Card("New task");
// var card2 = new Card("Create kanban boards");

// // ADDING CARDS TO COLUMNS
// todoColumn.addCard(card1);
// doingColumn.addCard(card2);
