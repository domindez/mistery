const Bottles = require("../models/bottles.js");
const { openingTime, closingTime } = require("../game-config.js")
const miApp = require("../app");
const { BOTTLEID, startPos, recordingNewPath } = require("../game-config")


// Quitar la botella para cerrar la Isla a cierta hora
const CloseIsland = async (infoMov) => {
  const close = closingTime;
  const open = openingTime;
  let timeNow = new Date().getUTCHours();
  if (timeNow >= close && timeNow <= open) {
    await Bottles.updateOne({ isBottle: true }, { isBottle: false })
    return infoMov.playTime = false;
  }
}

// Cerrar la isla si no hay botella y nadie ha ganado
async function CheckPlayTime(userInfoMov){
 
  let noBottle = await Bottles.findOne({ isBottle : false})
  let anyWin;
  if (noBottle){
    miApp.allGames.forEach(element => {
      if (element.isWin) anyWin = true;
    });
  }
  if (noBottle && !anyWin) userInfoMov.playTime = false;
}

// Crear códigos aleatorios
function CreateRandomCode(length) {
  var result           = '';
  var characters       = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

// Crear el nuevo camino
async function CreateNewPath(newPath, chupitosPath){
  const doc = await Bottles.findById(BOTTLEID)
  doc.path = newPath;
  doc.path.push(startPos)
  console.log('Nuevo Path :>> ', doc.path);
  chupitosConCodigo = []
  chupitosPath.forEach(tileId => {
    chupitosConCodigo.push({
      tile : tileId,
      code : CreateRandomCode(6)
    })
  });
  doc.chupitos = chupitosConCodigo;
  doc.save()
  console.log('Chupitos en :>> ', doc.chupitos);
}

// Morir
function Die(currentUserInfoMov, initialPos){
  console.log("Ha entrado en una casilla de muerte");
  currentUserInfoMov.playerMoved = false;
  currentUserInfoMov.enterDeath = true;
  currentUserInfoMov.lives--;
  currentUserInfoMov.newPos = initialPos;
  currentUserInfoMov.canMove = false;
  setTimeout(() => { currentUserInfoMov.canMove = true }, 2000)
}

// Coger la botella
const TakeBottle = async () => await Bottles.updateOne({ isBottle: true }, { isBottle: false });

// Set death tiles y chupitos
const setDeathTilesAndChupitos = async (grid) =>{
  if (recordingNewPath) return
  doc = await Bottles.findById(BOTTLEID);
  const path = doc.path;
  const chupitos = doc.chupitos
  // Poner casillas de muerte
  deathTiles = grid.filter(t => (path.includes(t.id) == false))
  deathTiles.forEach(tile => {
    tile.death = true
  });
  
  // Poner casillas de chupitos
  console.log(chupitos);
  const tileList = []
  chupitos.forEach(obj => {
    tileList.push(obj.tile)
  });
  chupitosTiles = grid.filter(t => tileList.includes(t.id))
  chupitosTiles.forEach(tile => {
    tile.chupito = true
  });
}


module.exports = { CloseIsland: CloseIsland,
  CheckPlayTime : CheckPlayTime,
  CreateRandomCode : CreateRandomCode,
  CreateNewPath : CreateNewPath,
  TakeBottle : TakeBottle,
  Die : Die,
  setDeathTilesAndChupitos: setDeathTilesAndChupitos
}