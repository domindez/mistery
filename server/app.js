const express = require("express");
const cors = require("cors");
const EventEmitter = require("events");

const app = express();

const movementsEmitter = new EventEmitter();



app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


let tileClicked;

// Routing

app.post("/api/clicked", (req, res) => {
  console.log("me está llegando un post");
  tileClicked = req.body
  movementsEmitter.emit("playerWantToMove", tileClicked, player)
  res.send(objMovement)
  objMovement.enterDeath = false;

})


app.get("/api/clicked", (req, res) => {
  console.log("me está llegando un get a la url post");
  res.send(tileClicked)
  console.log(req.body);
})

app.get("/", (req, res) => {
  res.send("Esto funciona!");
  console.log("recibí algo");
})

// Poniendo el server a escuchar 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}...`);
})






/*--                           Juego                           --*/


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
  tile.adjacentCells = [
    grid.filter(t => t.row === tile.row - 1 && t.col == tile.col)[0] != undefined ? grid.filter(t => t.row === tile.row - 1 && t.col == tile.col)[0].id : null,
    grid.filter(t => t.row === tile.row + 1 && t.col == tile.col)[0] != undefined ? grid.filter(t => t.row === tile.row + 1 && t.col == tile.col)[0].id : null,
    grid.filter(t => t.col === tile.col - 1 && t.row == tile.row)[0] != undefined ? grid.filter(t => t.col === tile.col - 1 && t.row == tile.row)[0].id : null,
    grid.filter(t => t.col === tile.col + 1 && t.row == tile.row)[0] != undefined ? grid.filter(t => t.col === tile.col + 1 && t.row == tile.row)[0].id : null
  ]
});

// Set treasure

const xMarkTheSpot = "t96"
const treasureTile = grid.filter(t => t.id == xMarkTheSpot)[0];
treasureTile.treasue = true;

// List of death tiles

const deathTiles = grid.filter(t =>
  (t.id == "t12") ||
  (t.id == "t32") ||
  (t.id == "t42") ||
  (t.id == "t42") ||
  (t.id == "t65")
)

// Set death tiles

deathTiles.forEach(tile => {
  tile.death = true
});


// Current Status

let currentStatus = {

}


// Set player

let playerPosXY = "t11"
let posTile = grid.filter(t => t.id == playerPosXY)[0]

let player = {
  isAlive: true,
  position: posTile,
}

// Objeto para devolver al front

objMovement = {
  playerMoved: false,
  newPos: player.position,
  enterDeath: false,
  enterWint: false

}


// Lo que pasa cuando se llama el evento
movementsEmitter.on("playerWantToMove", (tileClicked) => {

  const playerTile = player.position;  //grid.filter(t => t.id == movimiento.whereIsPlayer)[0];
  const playerDestiny = grid.filter(t => t.id == tileClicked.tileClicked)[0];
  const treasureTile = grid.filter(t => t.treasue == true)[0];

  // Si no se cumplen (que el player esté vivo + la casilla esté al lado) no hace nada:
  if (!(player.isAlive == true && playerTile.adjacentCells.includes(playerDestiny.id))) {
    return console.log("No llega o no está vivo");
  }

  // Si entra aquí es porq está vivo y le ha dado a la casilla de al lado

  if (playerDestiny.death) {
    // Si la casilla destino es muerte:
    console.log("Ha entrado en una casilla de muerte");
    objMovement.playerMoved = false;
    objMovement.enterDeath = true;
    player.isAlive = false;

    // Si la casilla no es muerte
  } else {

    // logica de moverse
    console.log(`Player se ha movido a ${playerDestiny.id}`);
    player.position = grid.filter(t => t.id == playerDestiny.id)[0]

    objMovement.playerMoved = true;
    objMovement.newPos = player.position;


    if (treasureTile.adjacentCells.includes(playerDestiny.id)) {
      // logica de ganar
      console.log("has ganado");
    }
  }




});














