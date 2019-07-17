//Board
function Board(id, name) {
  var self = this;

  this.id = id;
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
        var name = prompt("Enter a column name");
        var data = new FormData();

        data.append("name", name);

        fetch(baseUrl + "/column", {
          method: "POST",
          headers: myHeaders,
          body: data
        })
          .then(function(resp) {
            return resp.json();
          })
          .then(function(resp) {
            console.log(resp);
            var column = new Column(resp.id, name);
            board.addColumn(column);
          });
      }
    });
}

Board.prototype = {
  addColumn: function(column) {
    this.element.querySelector(".column-container").appendChild(column.element);
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
