const EventEmitter = require("events");

// Board

let nRows = 9;
let nCol = 6; 
let grid = []; 

for (let i=1 ; i < nRows+1 ; i++){

  for(let j=1 ; j < nCol+1 ; j++){
    grid.push({
      id : "t" + i.toString() + j.toString(),
      row : i,
      col : j, 
    });
  }
}

// Set adjacent cells

grid.forEach(tile => {
  tile.adjacentCells = [ 
    grid.filter(t => t.row === tile.row-1 && t.col == tile.col)[0], 
    grid.filter(t => t.row === tile.row+1 && t.col == tile.col)[0],
    grid.filter(t => t.col === tile.col-1 && t.row == tile.row)[0], 
    grid.filter(t => t.col === tile.col+1 && t.row == tile.row)[0]
  ]
});

// Set player

grid[0].isPlayer = true;

// Set treasure

grid[53].treasue = true;

// List of death tiles

const deathTiles = grid.filter(t => 
  (t.id == "t25") || 
  (t.id == "t22") ||
  (t.id == "t41") ||
  (t.id == "t52") ||
  (t.id == "t61") 
)

// Set death tiles

deathTiles.forEach(tile => {
tile.death = true
});


// Practicando con el objeto movimiento

const movimiento = {
  "playerAlive" : true,
  "whereIsPlayer" : "t52",
  "tileToGo" : "t53",
}

const movementsEmitter = new EventEmitter();

movementsEmitter.on("playerWantToMove", () => {

  const playerTile = grid.filter(t => t.id == movimiento.whereIsPlayer)[0];
  const playerDestiny = grid.filter(t => t.id == movimiento.tileToGo)[0]
  
  if(movimiento.playerAlive == true && playerTile.adjacentCells.includes(playerDestiny) && !playerDestiny.death){
    
    // lógica de moverse
    console.log("se ha movido")

  }
  else if(movimiento.playerAlive == true && !playerTile.adjacentCells.includes(playerDestiny)){

    // no llega esto creo que se puede borrar
    console.log("no llega")

  }
  else if(movimiento.playerAlive == true && playerTile.adjacentCells.includes(playerDestiny) && playerDestiny.death){
    
    // logica de muerte
    console.log("se ha muerto")

  }else if(movimiento.playerAlive == true && playerTile.adjacentCells.includes(playerDestiny) && playerDestiny.treasue){

    // lógica de encontrar el tesoro. No llega porq se mete antes en la de moverse. Igual hay que anidar esta dentro, o mejor anidar una que
    // sea ganar si estás en una adjacente al tesoro.
    console.log("Has encontrado el tesoro!")
  }
  
});

movementsEmitter.emit("playerWantToMove");
