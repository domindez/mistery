
    /*-------------------------------------------------------#
    | |                PARA RECONFIGURAR:                    |
    | |                                                      |
    | |  1. Poner la Posición Inicial y el tesoro.           |
    | |  2. Poner el Recording Path en true                  |
    | |  2. Hacer el camino, pinchar doble para chupito      |
    | |  4. Poner el Recording Path en false                 |
    | |  5. Poner el isBottle en MongoDB en true             |
    | |                                                      |             
    | /------------------------------------------------------|
    /------------------------------------------------------*/

    // test 631a0547dafbb5edf68889f6   // Buena 6312254de399891863306867

const BOTTLEID = "6312254de399891863306867"

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