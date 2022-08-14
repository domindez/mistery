const EventEmitter = require("events");

// Board

let grid = []; 
let nRows = 9;
let nCol = 6; 

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


// Practicando con el objeto movimiento

const objMovimiento = {
  "playerAlive" : true,
  "whereIsPlayer" : "t62",
  "tileToGo" : "t65",
}

// Crear el objeto emisor de eventos
const movementsEmitter = new EventEmitter();

// Lo que pasa cuando se llama el evento
movementsEmitter.on("playerWantToMove", (movimiento) => {

  const playerTile = grid.filter(t => t.id == movimiento.whereIsPlayer)[0];
  const playerDestiny = grid.filter(t => t.id == movimiento.tileToGo)[0]
  const treasureTile = grid.filter(t => t.treasue == true)[0]
  
  // Si no se cumplen (que el player esté vivo + la casilla esté al lado) no hace nada:
  if(!(movimiento.playerAlive == true && playerTile.adjacentCells.includes(playerDestiny))){  
    
    console.log("No llega o no está vivo")
    return
  } 
  else{ // Si entra aquí es porq está vivo y le ha dado a la casilla de al lado
   
    if(playerDestiny.death){ 
      // Si la casilla destino es muerte:
      console.log("Ha entrado en una casilla de muerte");
  
    // Si la casilla no es muerte
    }else{

      // logica de moverse
      console.log("Se ha movido");
      
      if(treasureTile.adjacentCells.includes(playerDestiny)){
        // logica de ganar
        console.log("has ganado")
      }
    }
  }
  
});


movementsEmitter.emit("playerWantToMove", objMovimiento);
