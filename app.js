const express = require("express");
const http = require("http");
const EventEmitter = require("events");
const { grid } = require("./game.js");


const app = express();

app.get("/", (req, res) => {
  res.send("Esto funciona!");
})



app.get("/api/grid", (req, res) => {
  res.send(grid);
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}...`);
})










// Practicando con el objeto movimiento

const objMovimiento = {
  "playerAlive": true,
  "whereIsPlayer": "t24",
  "tileToGo": "t65",
}

// Crear el objeto emisor de eventos
const movementsEmitter = new EventEmitter();


// Lo que pasa cuando se llama el evento
movementsEmitter.on("playerWantToMove", (movimiento) => {

  const playerTile = grid.filter(t => t.id == movimiento.whereIsPlayer)[0];
  const playerDestiny = grid.filter(t => t.id == movimiento.tileToGo)[0];
  const treasureTile = grid.filter(t => t.treasue == true)[0];

  // Si no se cumplen (que el player esté vivo + la casilla esté al lado) no hace nada:
  if (!(movimiento.playerAlive == true && playerTile.adjacentCells.includes(playerDestiny))) {

    console.log("No llega o no está vivo");

  }
  else { // Si entra aquí es porq está vivo y le ha dado a la casilla de al lado

    if (playerDestiny.death) {
      // Si la casilla destino es muerte:
      console.log("Ha entrado en una casilla de muerte");

      // Si la casilla no es muerte
    } else {

      // logica de moverse
      console.log("Se ha movido");

      if (treasureTile.adjacentCells.includes(playerDestiny)) {
        // logica de ganar
        console.log("has ganado");
      }
    }
  }

});

movementsEmitter.emit("playerWantToMove", objMovimiento)




