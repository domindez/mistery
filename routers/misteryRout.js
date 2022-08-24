
const express = require("express");
const routerApi = express.Router();
const miApp = require("../app");
const { initialPos } = require("../game-board/board");
const { connectDB } = require("../db")
const Code = require("../models/code.js")

// Conectar a la base de datos
connectDB();

// Onload
routerApi.get("/onload", (req, res) => {
  res.send(miApp.infoMov);
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
    console.log(req.body);
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





module.exports = routerApi;