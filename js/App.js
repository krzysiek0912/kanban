const main = {
  name: "Kanban Board",
  addBoard: function(board) {
    this.element.appendChild(board.element);
  },
  element: document.querySelector("#main .board-container")
};

let board = new Board(name);
main.addBoard(board);

callApi("/board").then(function(resp) {
  setupColumns(resp.columns);
});
