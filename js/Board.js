function Board(id, name) {
  const self = this;

  this.id = id;
  this.name = name;
  this.element = generateTemplate("board-template", {
    name: this.name,
    id: this.id
  });

  this.element
    .querySelector(".board")
    .addEventListener("click", function(event) {
      if (event.target.classList.contains("create-column")) {
        let name = prompt("Enter a column name"),
          data = new FormData();

        data.append("name", name);

        callApi("/column", "POST", data).then(function(resp) {
          const column = new Column(resp.id, name);
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
    const el = document.getElementById(id),
      sortable = Sortable.create(el, {
        group: "Kanban",
        sort: true,
        onAdd: function(evt) {
          const item = evt.item,
            elem = item.querySelector(".card"),
            id = elem.getAttribute("id"),
            url = "/card/" + id,
            description = item.querySelector(".card-description"),
            to = evt.target.getAttribute("id");

          let name = description.innerText,
            body = JSON.stringify({
              name: name,
              bootcamp_kanban_column_id: to
            });

          callApi(url, "PUT", body);
        }
      });
  }
};
