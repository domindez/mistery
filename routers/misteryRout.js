
const express = require("express");
const routerApi = express.Router();
const miApp = require("../app");
const { grid, initialPos, treasure } = require("../game-board/board")
const { connectDB } = require("../db")
const Code = require("../models/code.js")
const Winner = require("../models/winner.js");
// const { findOne, findOneAndUpdate } = require("../models/code.js");

// Conectar a la base de datos
connectDB();

// Anular sesiones anteriores a este time limit.
let timeLimit;

function setTimeLimit(){
  timeLimit = new Date().getTime();
}

setTimeLimit();




// Onload
routerApi.post("/onload", async(req, res) => {
  if (req.body.userID == null || req.body.userID < timeLimit){
    const newID = new Date().getTime();
    const userInfoMov = JSON.parse(JSON.stringify(miApp.infoMov));
    userInfoMov.Id = newID;
    miApp.allGames.push(userInfoMov);
    res.send(userInfoMov);
  }else{
    const currentUserInfoMov = miApp.allGames.filter(x => x.Id == req.body.userID)[0];
    res.send(currentUserInfoMov);
  }

});

// Cuando clicas en un botón del juego
routerApi.post("/clicked", (req, res) => {

  miApp.movementsEmitter.emit("playerWantToMove", req.body, grid);
  const currentUserInfoMov = miApp.allGames.filter(x => x.Id == req.body.id)[0];
  res.send(currentUserInfoMov);
  if (currentUserInfoMov.enterDeath) currentUserInfoMov.trail = [initialPos]
  currentUserInfoMov.enterDeath = false;
})

// Coger códigos de MongoDB
routerApi.get("/codelist", async (req, res) => {
  try {
    const arrayCodes = await Code.find();
    console.log(arrayCodes);
  } catch (error) {
    console.log(error);
  }
})

// Enviar nuevo código de consumución
routerApi.post("/newcode", async (req, res) => {
  try {
    const currentUserInfoMov = miApp.allGames.filter(x => x.Id == req.body.userID)[0];
    const codeMatch = await Code.findOneAndDelete(req.body);
    console.log("miapp", miApp.allGames.filter(x => x.Id == req.body.userID)[0]);
    if (codeMatch != null){
      Code.deleteOne(codeMatch);
      console.log("currentUserInfoMov", currentUserInfoMov);
      currentUserInfoMov.lives++;   
      res.send({ 
        lives: currentUserInfoMov.lives,
        codeValid: true
       });
      console.log(`Player tiene ${currentUserInfoMov.lives} vidas`);
    }else{
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
   const matchNombre = await Winner.findOne({nombre: winner.nombre});
   if (matchNombre != null){
     await Winner.findOneAndUpdate({nombre: winner.nombre}, {botellas: matchNombre.botellas+1})
   }else{
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
    res.send(await Winner.find().sort({botellas: "desc"}));
  } catch (error) {
    console.log(error);
  }
});





module.exports = routerApi;