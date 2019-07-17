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
            var column = new Column(resp.id, name);
            self.addColumn(column);
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
      group: "Kanban",
      sort: true,
      onUnchoose: function(evt) {
        var item = evt.item;
        var elem = item.firstElementChild;
        var to = evt.to;
        var name = elem.children[0].innerText;
        console.log(elem.children[0].innerText);
        fetch(baseUrl + "/card/" + elem.id, {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify({
            name: name,
            bootcamp_kanban_column_id: to.id
          })
        })
          .then(function(resp) {
            // console.log(resp);
            return resp.json();
          })
          .then(function(resp) {
            console.log(resp);
            // self.element.parentNode.removeChild(self.element);
          });
        // console.log(elem);
        // console.log(item);
      }
    });
  }
};
