const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bottlesSchema = new Schema({
    isBottle: Boolean,
    codeToWin : String,
    path : Array,
    chupitos : Array
})

// Crear modelo
const Bottles = mongoose.model("bottles", bottlesSchema);

module.exports = Bottles;