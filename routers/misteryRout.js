const express = require("express");
const routerApi = express.Router();
const miApp = require("../app");
const { grid, initialPos } = require("../game-board/board")
const { connectDB } = require("../db")
const Code = require("../models/code.js")
const Winner = require("../models/winner.js");
const Bottles = require("../models/bottles.js");
const { CloseIsland, CheckPlayTime } = require("../backend-functions/back-func");
const { BOTTLEID } = require("../game-config");

// Conectar a la base de datos
connectDB();


// Anular sesiones anteriores a este time limit.
let timeLimit;
function setTimeLimit() {
  timeLimit = new Date().getTime();
}

setTimeLimit();


// Onload
routerApi.post("/onload", async (req, res) => {
  try {
    if (req.body.userID == null || req.body.userID < timeLimit) {
      const newID = new Date().getTime();
      const userInfoMov = JSON.parse(JSON.stringify(miApp.infoMov));
      userInfoMov.Id = newID;
      await CloseIsland(userInfoMov);
      await CheckPlayTime(userInfoMov);
      miApp.allGames.push(userInfoMov);
      res.send(userInfoMov);
    } else {
      const currentUserInfoMov = miApp.allGames.filter(x => x.Id == req.body.userID)[0];
      if (await Bottles.findOne({ isBottle: true })) currentUserInfoMov.playTime = true;
      res.send(currentUserInfoMov);
    }
  } catch (error) {
      console.log(error);
  }
});

// Cuando clicas en un botón del juego
routerApi.post("/clicked", async (req, res) => {
  try {
    miApp.movementsEmitter.emit("playerWantToMove", req.body, grid);
    const currentUserInfoMov = miApp.allGames.filter(x => x.Id == req.body.id)[0];
    res.send(currentUserInfoMov);
    console.log("Enviado al Front");

    if (currentUserInfoMov.chupito) currentUserInfoMov.chupito = false
    if (currentUserInfoMov.chupitoCode != null) currentUserInfoMov.chupitoCode = null
    if (currentUserInfoMov.enterDeath) currentUserInfoMov.trail = [initialPos]
    currentUserInfoMov.enterDeath = false;
    
  } catch (error) {
    console.log(error)  
  }
})

// Enviar nuevo código de consumución
routerApi.post("/newcode", async (req, res) => {
  try {
    const currentUserInfoMov = miApp.allGames.filter(x => x.Id == req.body.userID)[0];
    const codeMatch = await Code.findOneAndDelete(req.body);

    if (codeMatch != null || req.body.code == "spx" || req.body.code == "BigWhoop") {
      Code.deleteOne(codeMatch);
      currentUserInfoMov.lives++;
      res.send({
        lives: currentUserInfoMov.lives,
        codeValid: true
      });
      console.log(`Player tiene ${currentUserInfoMov.lives} vidas`);
    } else {
      res.send({
        lives: currentUserInfoMov.lives,
        codeValid: false
      });
      console.log("Código no valido");
    }
  } catch (error) {
    console.error(error);
  }
})

// Enviar nuevo ganador
routerApi.post("/newwinner", async (req, res) => {
  try {
    const currentUserInfoMov = miApp.allGames.filter(x => x.Id == req.body.userID)[0];
    const winner = req.body;
    winner.botellas = 1;
    const matchNombre = await Winner.findOne({ nombre: winner.nombre });
    if (matchNombre != null) {
      await Winner.findOneAndUpdate({ nombre: winner.nombre }, { botellas: matchNombre.botellas + 1 })
    } else {
      Winner.create(winner);
    }
    currentUserInfoMov.winnerNameSent = true;
    currentUserInfoMov.winner = winner;
    res.send(currentUserInfoMov);

  } catch (error) {
    console.log(error);
  }
})

// Mostrar tabla
routerApi.get("/winnertable", async (req, res) => {
  try {
    res.send(await Winner.find().sort({ botellas: "desc" }));
  } catch (error) {
    console.log(error);
  }
});


module.exports = routerApi;