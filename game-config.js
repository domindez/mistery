
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


const startPos = "t93";
const treasurePos ="t96";


let recordingNewPath = false;

const Path = [  't34', 't44', 't45', 't55', 't56',
't66', 't76', 't33', 't35', 't36',
't26', 't23', 't13', 't12', 't11',
't21', 't31', 't41', 't42', 't52',
't53', 't63', 't64', 't74', 't73',
't72', 't71', 't81', 't91', 't92',
't93', 't94', 't95']



// Test Path sin rojas:
// const Path = [ "t11", "t12", "t13", "t14", "t15", "t16",  
//                "t21", "t22", "t23", "t24", "t25", "t26",  
//                "t31", "t32", "t33", "t34", "t35", "t36",  
//                "t41", "t42", "t43", "t44", "t45", "t46",  
//                "t51", "t52", "t53", "t54", "t55", "t56",  
//                "t61", "t62", "t63", "t64", "t65", "t66",  
//                "t71", "t72", "t73", "t74", "t75", "t76",  
//                "t81", "t82", "t83", "t84", "t85", "t86",  
//                "t91", "t92", "t93", "t94", "t95", "t96",  ];



Path.push(treasurePos);

module.exports = {
    startPos : startPos,
    treasurePos : treasurePos,
    Path : Path,
    recordingNewPath : recordingNewPath
}