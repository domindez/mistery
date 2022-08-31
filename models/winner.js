const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const winnerSchema = new Schema({
    nombre: String,
    botellas: Number
})

// Crear modelo
const Winner = mongoose.model("Ganadores", winnerSchema);

module.exports = Winner;