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

// Onload
app.get("/api/onload", (req, res) => {
  res.send(infoMov);
});

// Cuando clicas en un botón del juego
app.post("/api/clicked", (req, res) => {
  console.log("peticíon de movimiento recibida");
  tileClicked = req.body
  movementsEmitter.emit("playerWantToMove", tileClicked)
  res.send(infoMov)
  infoMov.enterDeath = false;

})

// Cuando se pulsa el botón de nuevo código
app.post("/api/newcode", (req, res) => {
  console.log("petición de nuevo códgio recibida");
  infoMov.lives++;
  res.send({lives : infoMov.lives});
  console.log(`Player tiene ${infoMov.lives} vidas`);
})

// Prueba
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

// Set posición inicial y botella

const initialPosXY = "t11";
let initialPos = grid.filter(t => t.id == initialPosXY)[0];
const treasue = "t96";

// Objeto para devolver al front

infoMov = {
  lives: 1,
  playerMoved: false,
  newPos: initialPos,
  enterDeath: false,
  enterWint: false,
  treasure: treasue,
  trail: [initialPos],
  canMove: true

}


// Lo que pasa cuando se llama el evento
movementsEmitter.on("playerWantToMove", (tileClicked) => {

   
  const playerDestiny = grid.filter(t => t.id == tileClicked.tileClicked)[0];
  const treasureTile = grid.filter(t => t.treasue == true)[0];

  // Si no se cumplen (que el player esté vivo + la casilla esté al lado) no hace nada:
  if (!(infoMov.lives > 0 && infoMov.newPos.adjacentCells.includes(playerDestiny.id) && infoMov.canMove)) {
    return console.log("No llega o no está vivo");
  }

  // Si entra aquí es porq está vivo y le ha dado a la casilla de al lado

  if (playerDestiny.death) {
    // Si la casilla destino es muerte:
    console.log("Ha entrado en una casilla de muerte");
    infoMov.playerMoved = false;
    infoMov.enterDeath = true;
    infoMov.lives --;
    infoMov.newPos = initialPos;
    infoMov.canMove = false;
    setTimeout(() => {infoMov.canMove = true} , 2000)

    // Si la casilla no es muerte
  } else {

    // logica de moverse
    console.log(`Player se ha movido a ${playerDestiny.id}`);
    infoMov.newPos = grid.filter(t => t.id == playerDestiny.id)[0];
    infoMov.playerMoved = true;
    infoMov.trail.push(infoMov.newPos);
    // infoMov.newPos = player.position;


    if (treasureTile.adjacentCells.includes(playerDestiny.id)) {
      // logica de ganar
      console.log("has ganado");
      infoMov.canMove = false;

    }
  }




});














