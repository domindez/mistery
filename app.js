const express = require("express");
const cors = require("cors");
const EventEmitter = require("events");

// Inicialización
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(express.static("public"))

// Router

const rutasApi = require("./routers/misteryRout");
app.use("/api", rutasApi);

// Poniendo el servidor a andar

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}...`);
})



/* -------------- -------------- ----  -------------- -------------- */
/*                          Lógica del Juego                         */
/* -------------- -------------- ----  -------------- -------------- */

// Importar el grid
const { grid, initialPos, treasure } = require("./game-board/board")
const { recordingNewPath, codeToWin } = require("./game-config")


// Objeto para devolver al front

const infoMov = {
  lives: 1,
  playerMoved: false,
  newPos: initialPos,
  enterDeath: false,
  treasure: treasure,
  trail: [initialPos],
  canMove: true,
  winCode: null
}

const newPath = [];

const movementsEmitter = new EventEmitter();

// Lo que pasa cuando se llama el evento
movementsEmitter.on("playerWantToMove", (tileClickedObj) => {

  const playerDestiny = grid.filter(t => t.id == tileClickedObj.tileClicked)[0];
  const treasureTile = grid.filter(t => t.treasue == true)[0];

  // Si no se cumplen (que el player esté vivo + la casilla esté al lado) no hace nada:
  if (!(infoMov.lives > 0 && infoMov.newPos.adjacentCells.includes(playerDestiny.id) && infoMov.canMove)) {
    console.log("No se puede ir");
    return;
  }

  // Si entra aquí es porq está vivo y le ha dado a la casilla de al lado

  if (playerDestiny.death) {
    console.log("Ha entrado en una casilla de muerte");
    infoMov.playerMoved = false;
    infoMov.enterDeath = true;
    infoMov.lives--;
    infoMov.newPos = initialPos;
    infoMov.canMove = false;
    setTimeout(() => { infoMov.canMove = true }, 2000)
    return;
  } 
  


  else{
    // logica de moverse
    console.log(`Player se ha movido a ${playerDestiny.id}`);
    infoMov.newPos = grid.filter(t => t.id == playerDestiny.id)[0];
    infoMov.playerMoved = true;
    infoMov.trail.push(infoMov.newPos);
    // Si está activado para grabar un nuevo camino:
    if (recordingNewPath){
      if(!newPath.includes(infoMov.newPos.id)) newPath.push(infoMov.newPos.id);
      console.log(newPath);
    }
    // logica de ganar
    if (playerDestiny == treasureTile){
      console.log("has ganado");
      infoMov.canMove = false;
      infoMov.winCode = codeToWin;
      return;
    }

  
  }
});

module.exports.infoMov = infoMov;
module.exports.movementsEmitter = movementsEmitter;






