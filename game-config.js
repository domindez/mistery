
    /*-------------------------------------------------------#
    | |                PARA RECONFIGURAR:                    |
    | |                                                      |
    | |  1. Vaciar el Path.                                  |
    | |  2. Poner la Posición Inicial y el tesoro.           |
    | |  3. Activar el RecordingPath                         |
    | |  4. Marcar el camino y copìar la array en el Path    |
    | |  5. DESACTIVAR el RecordingPath                      |
    | |                                                      |             
    | /------------------------------------------------------|
    /------------------------------------------------------*/


const startPos = "t23";
const treasurePos ="t95";

const codeToWin = "XJO3D"

let recordingNewPath = true;

const Path = [ 't13',  't12', 't11', 't21',  't31',
  't41',  't42', 't52', 't62',  't61',
  't71',  't81', 't91', 't101', 't102',
  't103', 't93', 't83', 't73',  't74',
  't84',  't64', 't65', 't23',  't24',
  't14',  't15', 't16', 't26',  't17',
  't36',  't37', 't46', 't45',  't44',
  't34',  't47', 't66', 't76',  't57',
  't86',  't87', 't97', 't107', 't106',
  't105', 't95' ]



// Test Path sin rojas:
// const Path = [ "t11", "t12", "t13", "t14", "t15", "t16", "t17",  
//                "t21", "t22", "t23", "t24", "t25", "t26", "t27", 
//                "t31", "t32", "t33", "t34", "t35", "t36", "t37", 
//                "t41", "t42", "t43", "t44", "t45", "t46", "t47", 
//                "t51", "t52", "t53", "t54", "t55", "t56", "t57", 
//                "t61", "t62", "t63", "t64", "t65", "t66", "t67", 
//                "t71", "t72", "t73", "t74", "t75", "t76", "t77", 
//                "t81", "t82", "t83", "t84", "t85", "t86", "t87", 
//                "t91", "t92", "t93", "t94", "t95", "t96", "t97", 
//                "t101", "t102", "t103", "t104", "t105", "t106", "t107", 
//             ];



Path.push(treasurePos);

module.exports = {
    startPos : startPos,
    treasurePos : treasurePos,
    Path : Path,
    recordingNewPath : recordingNewPath,
    codeToWin : codeToWin
}