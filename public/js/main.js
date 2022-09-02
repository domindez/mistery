import CreateShareIconsIsla from "./resources.js";



// Sonidos
const newlifeSound = new Audio("newLife.mp3");
const winSound = new Audio("win.mp3"); 

// Pop Ups

// Play Time Off
const playTimeOff = document.getElementById("play-time-off")
// Ayuda
const help = document.getElementById("help");
// Codigo
const popupBtn = document.getElementById("popUp-btn");
const helpPopup = document.getElementById("popup-overlay");
const codeWindow = document.getElementById("code-overlay");
const newCodeBtn = document.getElementById("new-code-btn");
const codeForm = document.getElementById("code-form");
const codeMsgIcon = document.getElementById("code-msg-icon");
let codeMsg = document.getElementById("code-msg");
let codeBox = document.getElementById("code-input");
const closePopup = document.getElementById("close-popup");
// Victoria Popup
const codePopup = document.getElementById("code-overlay");
const winCode = document.getElementById("win-code");
const winPopup = document.getElementById("win-pannel-overlay");
const victoryBtn = document.getElementById("victory-btn");
const winnerForm = document.getElementById("winner-form");
const nameNoted = document.getElementById("name-noted");
const closeWinPannel = document.getElementById("close-win-pannel");
// Any Other Win
const anyOtherWin = document.getElementById("any-other-win");
const closeAnyOtherWin = document.getElementById("close-any-other-win");


// Winner Table
const winnerTable = document.getElementById("winner-table");
const closewinnerTable = document.getElementById("close-winner");
const tableBtn = document.getElementById("table-btn");


// Add events
victoryBtn.addEventListener("click", () => winPopup.classList.add("active"));
newCodeBtn.addEventListener("click", () => codePopup.classList.add("active"));
popupBtn.addEventListener("click", () => helpPopup.classList.remove("active"));
closePopup.addEventListener("click", () => codeWindow.classList.remove("active"));
help.addEventListener("click", () => helpPopup.classList.add("active"));
closeAnyOtherWin.addEventListener("click", () => anyOtherWin.classList.remove("active"));


// Close Popups
if (codeWindow) {
  codeWindow.addEventListener("click", e => {
    if (e.target !== codeWindow && e.target !== closePopup) return;
    codeWindow.classList.remove("active");
    codeMsg.innerHTML = "";
    codeBox.value = "";
    codeMsgIcon.classList.remove("fa-solid");
    codeMsgIcon.classList.remove("fa-heart");
  })
}

if (winnerTable) {
  winnerTable.addEventListener("click", e => {
    if (e.target !== winnerTable && e.target !== closewinnerTable) return;
    winnerTable.classList.remove("active");
  })
}

if (anyOtherWin) {
  anyOtherWin.addEventListener("click", e => {
    if (e.target !== anyOtherWin) return;
    anyOtherWin.classList.remove("active");
  })
}

if (winPopup) {
  winPopup.addEventListener("click", e => {
    if (e.target !== winPopup && e.target !== closeWinPannel) return;
    winPopup.classList.remove("active");
  })
}

CreateShareIconsIsla();

// PrevTile
let prevTile;

const t11 = document.getElementById("t11");
const t12 = document.getElementById("t12");
const t13 = document.getElementById("t13");
const t14 = document.getElementById("t14");
const t15 = document.getElementById("t15");
const t16 = document.getElementById("t16");
const t17 = document.getElementById("t17");
const t21 = document.getElementById("t21");
const t22 = document.getElementById("t22");
const t23 = document.getElementById("t23");
const t24 = document.getElementById("t24");
const t25 = document.getElementById("t25");
const t26 = document.getElementById("t26");
const t27 = document.getElementById("t27");
const t31 = document.getElementById("t31");
const t32 = document.getElementById("t32");
const t33 = document.getElementById("t33");
const t34 = document.getElementById("t34");
const t35 = document.getElementById("t35");
const t36 = document.getElementById("t36");
const t37 = document.getElementById("t37");
const t41 = document.getElementById("t41");
const t42 = document.getElementById("t42");
const t43 = document.getElementById("t43");
const t44 = document.getElementById("t44");
const t45 = document.getElementById("t45");
const t46 = document.getElementById("t46");
const t47 = document.getElementById("t47");
const t51 = document.getElementById("t51");
const t52 = document.getElementById("t52");
const t53 = document.getElementById("t53");
const t54 = document.getElementById("t54");
const t55 = document.getElementById("t55");
const t56 = document.getElementById("t56");
const t57 = document.getElementById("t57");
const t61 = document.getElementById("t61");
const t62 = document.getElementById("t62");
const t63 = document.getElementById("t63");
const t64 = document.getElementById("t64");
const t65 = document.getElementById("t65");
const t67 = document.getElementById("t66");
const t66 = document.getElementById("t67");
const t71 = document.getElementById("t71");
const t72 = document.getElementById("t72");
const t73 = document.getElementById("t73");
const t74 = document.getElementById("t74");
const t75 = document.getElementById("t75");
const t76 = document.getElementById("t76");
const t77 = document.getElementById("t77");
const t81 = document.getElementById("t81");
const t82 = document.getElementById("t82");
const t83 = document.getElementById("t83");
const t84 = document.getElementById("t84");
const t85 = document.getElementById("t85");
const t86 = document.getElementById("t86");
const t87 = document.getElementById("t87");
const t91 = document.getElementById("t91");
const t92 = document.getElementById("t92");
const t93 = document.getElementById("t93");
const t94 = document.getElementById("t94");
const t95 = document.getElementById("t95");
const t96 = document.getElementById("t96");
const t97 = document.getElementById("t97");
const t101 = document.getElementById("t101");
const t102 = document.getElementById("t102");
const t103 = document.getElementById("t103");
const t104 = document.getElementById("t104");
const t105 = document.getElementById("t105");
const t106 = document.getElementById("t106");
const t107 = document.getElementById("t107");

const board = [t11, t12, t13, t14, t15, t16, t17,
  t21, t22, t23, t24, t25, t26, t27,
  t31, t32, t33, t34, t35, t36, t37,
  t41, t42, t43, t44, t45, t46, t47,
  t51, t52, t53, t54, t55, t56, t57,
  t61, t62, t63, t64, t65, t66, t67,
  t71, t72, t73, t74, t75, t76, t77,
  t81, t82, t83, t84, t85, t86, t87,
  t91, t92, t93, t94, t95, t96, t97,
  t101, t102, t103, t104, t105, t106, t107]

// Player lives
const livesMsg = document.getElementById("lives-msg");
livesMsg.innerHTML = "Tienes  vidas";


/* ----------------- Peticiones al backend ----------------- */


// Al cargar la página
window.onload = function () {
  let userID = localStorage.getItem("userID");
  const JsonUserID = JSON.stringify({ userID })

  fetch("/api/onload", {
    // fetch("http://localhost:3000/api/onload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JsonUserID
  })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      setCurrentStatus(response);
      prevTile = response.newPos.id
      localStorage.setItem("userID", response.Id)

      if (response.winCode != null) {
        winPopup.classList.add("active");
        winCode.innerHTML = response.winCode;
      }

    });
}

// Nuevo código
codeForm.addEventListener("submit", e => {

  let userID = localStorage.getItem("userID");
  let code = document.getElementById("code-input").value;
  const JSONcode = JSON.stringify({ code, userID });

  fetch("/api/newcode", {
    // fetch("http://localhost:3000/api/newcode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSONcode
  })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      if (response.codeValid) {
        newlifeSound.currentTime = 0;
        newlifeSound.play();
        writeLivesMsg(response);
        codeMsg.innerHTML = "¡Se ha añadido una vida!"
        codeMsgIcon.classList.add("fa-solid");
        codeMsgIcon.classList.add("fa-heart");
      } else {
        codeMsg.innerHTML = "Este código no es válido"

      }
    });

  e.preventDefault()

})

// Agregar botón para hacer el fetch a cada cuadrado
board.forEach(element => {

  element.addEventListener("click", () => {

    let tileClickedAndId = {};
    tileClickedAndId.tileClicked = board.filter(t => t.id === element.id)[0].id;
    tileClickedAndId.id = localStorage.getItem("userID");
    let jsonTileClickedAndId = JSON.stringify(tileClickedAndId)

    fetch("/api/clicked", {
      // fetch("http://localhost:3000/api/clicked", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: jsonTileClickedAndId
    })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        manejarRespuesta(response, tileClickedAndId.tileClicked);
      });
  })
});

// Añadir nombre a la lista
winnerForm.addEventListener("submit", e => {
  e.preventDefault()

  let userID = localStorage.getItem("userID");
  let winnerName = document.getElementById("winner-name").value;
  const JSONcode = JSON.stringify({ nombre: winnerName, userID });

  fetch("/api/newwinner", {
    // fetch("http://localhost:3000/api/newwinner", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSONcode
  })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      setNameWinner(response)
    });
})


// Abrir y mostrar lista de buscadores
tableBtn.addEventListener("click", () => {

  fetch("/api/winnertable", {
    // fetch("http://localhost:3000/api/winnertable", {
    method: "GET"
  })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      const winnerList = document.getElementById("winner-table-list");
      winnerList.innerHTML = ""
      response.forEach(element => {
        const newRow = winnerList.insertRow(-1);
        let col1 = newRow.insertCell(0)
        let col2 = newRow.insertCell(1)

        col1.innerHTML = element.nombre;
        col2.innerHTML = element.botellas;
      });
    });
  winnerTable.classList.add("active");
});


/* ----------------- Lógica del tablero ----------------- */

// Variables
const arrowUp = document.createElement("i");
arrowUp.classList.add("fa-solid");
arrowUp.classList.add("fa-caret-up");

const arrowDown = document.createElement("i");
arrowDown.classList.add("fa-solid");
arrowDown.classList.add("fa-caret-down");

const arrowLeft = document.createElement("i");
arrowLeft.classList.add("fa-solid");
arrowLeft.classList.add("fa-caret-left");

const arrowRight = document.createElement("i");
arrowRight.classList.add("fa-solid");
arrowRight.classList.add("fa-caret-right");

const playerIcon = document.createElement("i");
playerIcon.classList.add("fa-solid");
playerIcon.classList.add("fa-person-walking");

const deadPlayer = document.createElement("i");
deadPlayer.classList.add("fa-solid");
deadPlayer.classList.add("fa-skull");

const bottle = document.createElement("i");
bottle.classList.add("fa-solid");
bottle.classList.add("fa-wine-bottle");
bottle.classList.add("fa-flip-horizontal");


// Reacción del juego al objeto recibido
function manejarRespuesta(infoMov, tileClicked) {
  
  if (!infoMov.playTime){
    playTimeOff.classList.add("active")
  }else{

    
    showAnyOtherWin(infoMov);
    if (infoMov.firstClickValid) {

    const upTile = board.filter(t => t.id == (infoMov.startPos.adjacentCells)[0])[0];
    const downTile = board.filter(t => t.id == (infoMov.startPos.adjacentCells)[1])[0];
    const leftTile = board.filter(t => t.id == (infoMov.startPos.adjacentCells)[2])[0];
    const rightTile = board.filter(t => t.id == (infoMov.startPos.adjacentCells)[3])[0];
    
    if (upTile != null) upTile.innerHTML = "";
    if (downTile != null) downTile.innerHTML = "";
    if (leftTile != null) leftTile.innerHTML = "";
    if (rightTile != null) rightTile.innerHTML = "";
  }
  
  if (infoMov.playerMoved) {
    const newPlayerPosID = infoMov.newPos.id;
    if (prevTile != infoMov.treasure) document.getElementById(prevTile).innerHTML = "";
    document.getElementById(newPlayerPosID).classList.add("green");
    document.getElementById(newPlayerPosID).insertAdjacentElement('afterbegin', playerIcon);
    prevTile = newPlayerPosID;
    if (infoMov.newPos.id == infoMov.treasure) {
      winSound.currentTime = 0;
      winSound.play();
      setTimeout(() => {
        winPopup.classList.add("active");
        winCode.innerHTML = infoMov.winCode;
        victoryBtn.classList.add("active");
      }, 1000)
    }
    
    return
  }
  
  if (infoMov.enterDeath) {
    
    document.getElementById(tileClicked).classList.add("red");
    document.getElementById(tileClicked).appendChild(deadPlayer);
    document.getElementById(prevTile).innerHTML = "";
    writeLivesMsg(infoMov);
    setTimeout(function () { playerKilled(infoMov, tileClicked) }, 2000);
  }
  }
}

/* ----------------- Definiciones Funciones ----------------- */

function writeLivesMsg(infoMov) {
  if (infoMov.lives != 1) livesMsg.innerHTML = `Tienes ${infoMov.lives} vidas`;
  else livesMsg.innerHTML = `Tienes ${infoMov.lives} vida`
}

function setTreasure(infoMov) {
  document.getElementById(infoMov.treasure).classList.add("yellow");
  document.getElementById(infoMov.treasure).appendChild(bottle);
}

function setPlayer(infoMov) {
  const newPlayerPosID = infoMov.newPos.id;
  document.getElementById(newPlayerPosID).classList.add("green");
  document.getElementById(newPlayerPosID).appendChild(playerIcon);

}

function setTrail(infoMov) {
  infoMov.trail.forEach(element => {
    board.filter(t => t.id == element.id)[0].classList.add("green");
  });
}

function setCurrentStatus(infoMov) {
  if (!infoMov.playTime){
    playTimeOff.classList.add("active")
  }else{
    writeLivesMsg(infoMov);
    setPlayer(infoMov)
    setTreasure(infoMov);
    setTrail(infoMov);
    setNameWinner(infoMov);
    showAnyOtherWin(infoMov);
    SetArrows(infoMov);
    if (!infoMov.helped) helpPopup.classList.add("active");
  }

}

function playerKilled(infoMov, tileClicked) {
  setPlayer(infoMov);
  infoMov.trail.forEach(element => {
    board.filter(t => t.id == element.id)[0].classList.remove("green");
  });
  board.filter(t => t.id == infoMov.newPos.id)[0].classList.add("green");
  document.getElementById(tileClicked).classList.remove("red");
  document.getElementById(tileClicked).innerHTML = "";
}

function setNameWinner(infoMov) {
  if (infoMov.winnerNameSent) {
    winnerForm.classList.add("hidden");
    nameNoted.classList.remove("hidden");
  }
  if (infoMov.isWin) victoryBtn.classList.add("active");
}

function showAnyOtherWin(infoMov) {
  if (infoMov.anyOtherWin) anyOtherWin.classList.add("active");
}

function SetArrows(infoMov) {

  if (!infoMov.helped) {

    const adjUp = infoMov.startPos.adjacentCells[0]
    const adjDown = infoMov.startPos.adjacentCells[1]
    const adjLeft = infoMov.startPos.adjacentCells[2]
    const adjRight = infoMov.startPos.adjacentCells[3]

    if (board.filter(t => t.id == adjUp)[0] != null) board.filter(t => t.id == adjUp)[0].appendChild(arrowUp)
    if (board.filter(t => t.id == adjDown)[0] != null) board.filter(t => t.id == adjDown)[0].appendChild(arrowDown)
    if (board.filter(t => t.id == adjLeft)[0] != null) board.filter(t => t.id == adjLeft)[0].appendChild(arrowLeft)
    if (board.filter(t => t.id == adjRight)[0] != null) board.filter(t => t.id == adjRight)[0].appendChild(arrowRight)
  }

}
