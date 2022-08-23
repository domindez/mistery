const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codeSchema = new Schema({
    code: String
})

// Crear modelo
const Code = mongoose.model("codes", codeSchema);

module.exports = Code;