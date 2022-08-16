
// Board

let grid = [];
let nRows = 9;
let nCol = 6;

for (let i = 1; i < nRows + 1; i++) {

  for (let j = 1; j < nCol + 1; j++) {
    grid.push({

      id: "t" + i.toString() + j.toString(),
      row: i,
      col: j,
    });
  }
}

// Set adjacent cells


grid.forEach(tile => {
    console.log(grid.filter(t => t.row === tile.row - 1 && t.col == tile.col)[0]);
  tile.adjacentCells = [
    grid.filter(t => t.row === tile.row - 1 && t.col == tile.col)[0] != undefined ? grid.filter(t => t.row === tile.row - 1 && t.col == tile.col)[0].id : null,
    grid.filter(t => t.row === tile.row + 1 && t.col == tile.col)[0] != undefined ? grid.filter(t => t.row === tile.row + 1 && t.col == tile.col)[0].id : null,
    grid.filter(t => t.col === tile.col - 1 && t.row == tile.row)[0] != undefined ? grid.filter(t => t.col === tile.col - 1 && t.row == tile.row)[0].id : null,
    grid.filter(t => t.col === tile.col + 1 && t.row == tile.row)[0] != undefined ? grid.filter(t => t.col === tile.col + 1 && t.row == tile.row)[0].id : null
  ]
});

// Set player

grid[0].isPlayer = true;

// Set treasure

const xMarkTheSpot = "t96"
grid.filter(t => t.id == xMarkTheSpot)[0].treasue = true;

// List of death tiles

const deathTiles = grid.filter(t =>
  (t.id == "t25") ||
  (t.id == "t22") ||
  (t.id == "t41") ||
  (t.id == "t42") ||
  (t.id == "t65")
)

// Set death tiles

deathTiles.forEach(tile => {
  tile.death = true
});

// console.log(grid);

module.exports.grid = grid;

