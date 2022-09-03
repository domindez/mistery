const Bottles = require("../models/bottles.js");
const { openingTime, closingTime } = require("../game-config.js")
const miApp = require("../app");


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
  let anyWin;
  miApp.allGames.forEach(element => { 
    if (element.isWin) {
      anyWin = true;
    }else{
      anyWin = false;
    }     
  });

  if (await Bottles.findOne({ isBottle : false}) && !anyWin) userInfoMov.playTime = false;

}

module.exports = { CloseIsland: CloseIsland,
  CheckPlayTime : CheckPlayTime
}