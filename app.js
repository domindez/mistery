const express = require("express");
const cors = require("cors");
const EventEmitter = require("events");
const rutasApi = require("./routers/misteryRout");
const Bottles = require("./models/bottles.js");
// Importar el grid
const { initialPos, treasure } = require("./game-board/board")
const { recordingNewPath, BOTTLEID } = require("./game-config")
const { CloseIsland, CheckPlayTime, CreateNewPath, TakeBottle, Die } = require("./backend-functions/back-func")

// Inicialización
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/api", rutasApi);

// Poniendo el servidor a andar
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}...`);
})



/* -------------- -------------- ----  -------------- -------------- */
/*                          Lógica del Juego                         */
/* -------------- -------------- ----  -------------- -------------- */



// Objeto para devolver al front

const infoMov = {
  Id: null,
  playTime: true,
  lives: 20,
  firstClickValid: false,
  playerMoved: false,
  startPos: initialPos,
  newPos: initialPos,
  enterDeath: false,
  chupito: false,
  chupitoCode: null,
  treasure: treasure,
  trail: [initialPos],
  canMove: true,
  winCode: null,
  winnerNameSent: false,
  isWin: false,
  anyOtherWin: false,
  helped: false
}

const newPath = [];
const chupitosPath = [];
const movementsEmitter = new EventEmitter();


// Crear array de todas las sesiones
const allGames = []

// Lo que pasa cuando se llama el evento
movementsEmitter.on("playerWantToMove", async (tileClickedAndId, grid) => {

  const currentUserInfoMov = allGames.filter(x => x.Id == tileClickedAndId.id)[0];
  const playerDestiny = grid.filter(t => t.id == tileClickedAndId.tileClicked)[0];
  const treasureTile = grid.filter(t => t.treasue == true)[0];

  currentUserInfoMov.helped = true;
  CloseIsland(currentUserInfoMov);
  if (!currentUserInfoMov.isWin) CheckPlayTime(currentUserInfoMov);

  // Comprobar si alguien ha ganado ya
  let anyWin;
  let winnerGame;
  allGames.forEach(game => {
    if (game.isWin) {
      anyWin = true;
      winnerGame = game.Id;
    }
  });

  if (anyWin && winnerGame != tileClickedAndId.id) {
    currentUserInfoMov.anyOtherWin = true;
    currentUserInfoMov.canMove = false;
  }

  // Si no se cumplen (que el player esté vivo + la casilla esté al lado) no hace nada:

  if (!(currentUserInfoMov.lives > 0 && currentUserInfoMov.newPos.adjacentCells.includes(playerDestiny.id) && currentUserInfoMov.canMove)) {
    console.log("No se puede ir");
    // Si está activo el recording entonces poner chupitos
    if (recordingNewPath && currentUserInfoMov.newPos == playerDestiny) {
      chupitosPath.push(playerDestiny.id);
    console.log("chupito añadido");
  }
    return;
  }

  // Si entra aquí es porq está vivo y le ha dado a la casilla de al lado
  currentUserInfoMov.firstClickValid = true;
  
  if (playerDestiny.death) {
    Die(currentUserInfoMov, initialPos);
    return;
  }

  else {
    // logica de moverse
    console.log(`Player se ha movido a ${playerDestiny.id}`);
    currentUserInfoMov.newPos = grid.filter(t => t.id == playerDestiny.id)[0];
    currentUserInfoMov.playerMoved = true;
    currentUserInfoMov.trail.push(currentUserInfoMov.newPos);
    
    console.log("moviendo");


    // const doc = await Bottles.findById(BOTTLEID);
    // let chupitos = doc.chupitos;
    // const tileList = []
    // chupitos.forEach(obj => {
    //   tileList.push(obj.tile)
    // });

    // if (tileList.includes(playerDestiny.id)){
    //   currentUserInfoMov.chupito = true;
    //   console.log("aqui hay chupito");
    //   const chupito = chupitos.filter(chup => chup.tile == playerDestiny.id)[0];
    //   chupitoCode = chupito.code;

    //   console.log(chupitos);
    //   currentUserInfoMov.chupitoCode = chupitoCode
    //   chupitos = chupitos.filter(chup => chup != chupito)
    //   doc.chupitos = chupitos;
    //   await doc.save();
    //   console.log(chupitos);
    // }



    
      
    
    
    // Si está activado para grabar un nuevo camino:
    if (recordingNewPath) {
      if (!newPath.includes(currentUserInfoMov.newPos.id)) newPath.push(currentUserInfoMov.newPos.id);
    }

    // logica de ganar
    if (playerDestiny == treasureTile) {
      console.log("has ganado");
      currentUserInfoMov.canMove = false;
      currentUserInfoMov.isWin = true;
      const bottle = await Bottles.findById(BOTTLEID);
      currentUserInfoMov.winCode = bottle.codeToWin;     
      if (recordingNewPath) CreateNewPath(newPath, chupitosPath);
      if (!recordingNewPath) TakeBottle();
      console.log("Todo actualizado");
      return;
         
    }

    console.log("preparando");
  }
});

module.exports.infoMov = infoMov;
module.exports.allGames = allGames;
module.exports.movementsEmitter = movementsEmitter;






