
const express = require("express");
const routerApi = express.Router();
const miApp = require("../app");
const { initialPos } = require("../game-board/board");
const { connectDB } = require("../db")
const Code = require("../models/code.js")
const Winner = require("../models/winner.js");
// const { findOne, findOneAndUpdate } = require("../models/code.js");

// Conectar a la base de datos
connectDB();

// Onload
routerApi.post("/onload", async(req, res) => {
  if (req.body.userID == null){
    const newID = new Date().getTime();
    const userInfoMov = {...miApp.infoMov}
    userInfoMov.Id = newID;
    miApp.allGames.push(userInfoMov);
    console.log(miApp.allGames);
    res.send(userInfoMov);
  }else{
    const currentUserInfoMov = miApp.allGames.filter(x => x.Id == req.body.userID)[0];
    res.send(currentUserInfoMov);
  }

});

// Cuando clicas en un botón del juego
routerApi.post("/clicked", (req, res) => {
  miApp.movementsEmitter.emit("playerWantToMove", req.body);
  res.send(miApp.infoMov);
  if (miApp.infoMov.enterDeath) miApp.infoMov.trail = [initialPos]
  miApp.infoMov.enterDeath = false;
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
    const codeMatch = await Code.findOneAndDelete(req.body);
    if (codeMatch != null){
      Code.deleteOne(codeMatch);
      miApp.infoMov.lives++;   
      res.send({ 
        lives: miApp.infoMov.lives,
        codeValid: true
       });
      console.log(`Player tiene ${miApp.infoMov.lives} vidas`);
    }else{
      res.send({ 
        lives: miApp.infoMov.lives,
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
    const winner = req.body;
    winner.botellas = 1;
   const matchNombre = await Winner.findOne({nombre: winner.nombre});
   if (matchNombre != null){
     await Winner.findOneAndUpdate({nombre: winner.nombre}, {botellas: matchNombre.botellas+1})
   }else{
     Winner.create(winner);
   }
   miApp.infoMov.winnerNameSent = true;
   miApp.infoMov.winner = winner;
   res.send(miApp.infoMov);
  
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