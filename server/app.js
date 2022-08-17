const express = require("express");


const { grid } = require("./game.js");

const app = express();

// Routing

app.get("/", (req, res) => {
  res.send("Esto funciona!");
})

app.get("/api/grid", (req, res) => {
  res.send(JSON.stringify(grid));
})

// Poniendo el server a escuchar 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}...`);
})















