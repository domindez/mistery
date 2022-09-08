
    /*-------------------------------------------------------#
    | |                PARA RECONFIGURAR:                    |
    | |                                                      |
    | |  1. Poner el isBottle en MongoDB en true             |
    | |  2. Poner la Posición Inicial y el tesoro.           |
    | |  3. Poner el Recording Path en true                  |
    | |  4. Hacer el camino, pinchar doble para chupito      |
    | |  5. Poner el Recording Path en false                 |
    | |  6. REINICIAR EL SERVIDOR                            |
    | |                                                      |             
    | /------------------------------------------------------|
    /------------------------------------------------------*/


    
const test = "631a0547dafbb5edf68889f6"
const oficial = "6312254de399891863306867"

const BOTTLEID = oficial

let recordingNewPath = false;
let startPos = "t11";
let treasurePos ="t95";


const closingTime = 01
const openingTime = 03

// Para borrar todos los códigos en el shell del MongoDB Compass:
// db.codes.deleteMany( { "code" : { $ne : null} } );

module.exports = {
    startPos : startPos,
    treasurePos : treasurePos,
    recordingNewPath : recordingNewPath,
    openingTime : openingTime,
    closingTime : closingTime,
    BOTTLEID : BOTTLEID,
}