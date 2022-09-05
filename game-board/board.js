const { startPos, treasurePos, BOTTLEID, recordingNewPath } = require("../game-config")
const Bottles = require("../models/bottles");

// Board

let grid = [];
let nRows = 10;
let nCol = 7;

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
  tile.adjacentCells = [
    grid.filter(t => t.row === tile.row - 1 && t.col == tile.col)[0] != undefined ? grid.filter(t => t.row === tile.row - 1 && t.col == tile.col)[0].id : null,
    grid.filter(t => t.row === tile.row + 1 && t.col == tile.col)[0] != undefined ? grid.filter(t => t.row === tile.row + 1 && t.col == tile.col)[0].id : null,
    grid.filter(t => t.col === tile.col - 1 && t.row == tile.row)[0] != undefined ? grid.filter(t => t.col === tile.col - 1 && t.row == tile.row)[0].id : null,
    grid.filter(t => t.col === tile.col + 1 && t.row == tile.row)[0] != undefined ? grid.filter(t => t.col === tile.col + 1 && t.row == tile.row)[0].id : null
  ]
});

// Set posición inicial y botella

const initialPosXY = startPos;
let initialPos = grid.filter(t => t.id == initialPosXY)[0];

const xMarkTheSpot = treasurePos
const treasureTile = grid.filter(t => t.id == xMarkTheSpot)[0];
treasureTile.treasue = true;

// Set death tiles con lo que viene del game config
const setDeathTilesAndChupitos = async () =>{
  if (recordingNewPath) return

  doc = await Bottles.findById(BOTTLEID);
  const path = doc.path;
  const chupitos = doc.chupitos
  // Poner casillas de muerte
  deathTiles = grid.filter(t => (path.includes(t.id) == false))
  deathTiles.forEach(tile => {
    tile.death = true
  });

  // Poner casillas de chupitos con su código
  chupitosTiles = grid.filter(t => chupitos.includes(t.id))
  chupitosTiles.forEach(tile => {
    tile.chupito = true
  });

}


setDeathTilesAndChupitos();



module.exports = {
  grid : grid,
  initialPos : initialPos,
  treasure : treasureTile.id
}

