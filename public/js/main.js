

const t11 = document.getElementById("t11");
const t12 = document.getElementById("t12");
const t13 = document.getElementById("t13");
const t14 = document.getElementById("t14");
const t15 = document.getElementById("t15");
const t16 = document.getElementById("t16");
const t21 = document.getElementById("t21");
const t22 = document.getElementById("t22");
const t23 = document.getElementById("t23");
const t24 = document.getElementById("t24");
const t25 = document.getElementById("t25");
const t26 = document.getElementById("t26");
const t31 = document.getElementById("t31");
const t32 = document.getElementById("t32");
const t33 = document.getElementById("t33");
const t34 = document.getElementById("t34");
const t35 = document.getElementById("t35");
const t36 = document.getElementById("t36");
const t41 = document.getElementById("t41");
const t42 = document.getElementById("t42");
const t43 = document.getElementById("t43");
const t44 = document.getElementById("t44");
const t45 = document.getElementById("t45");
const t46 = document.getElementById("t46");
const t51 = document.getElementById("t51");
const t52 = document.getElementById("t52");
const t53 = document.getElementById("t53");
const t54 = document.getElementById("t54");
const t55 = document.getElementById("t55");
const t56 = document.getElementById("t56");
const t61 = document.getElementById("t61");
const t62 = document.getElementById("t62");
const t63 = document.getElementById("t63");
const t64 = document.getElementById("t64");
const t65 = document.getElementById("t65");
const t66 = document.getElementById("t66");
const t71 = document.getElementById("t71");
const t72 = document.getElementById("t72");
const t73 = document.getElementById("t73");
const t74 = document.getElementById("t74");
const t75 = document.getElementById("t75");
const t76 = document.getElementById("t76");
const t81 = document.getElementById("t81");
const t82 = document.getElementById("t82");
const t83 = document.getElementById("t83");
const t84 = document.getElementById("t84");
const t85 = document.getElementById("t85");
const t86 = document.getElementById("t86");
const t91 = document.getElementById("t91");
const t92 = document.getElementById("t92");
const t93 = document.getElementById("t93");
const t94 = document.getElementById("t94");
const t95 = document.getElementById("t95");
const t96 = document.getElementById("t96");

const board = [t11, t12, t13, t14, t15, t16,
               t21, t22, t23, t24, t25, t26,
               t31, t32, t33, t34, t35, t36,
               t41, t42, t43, t44, t45, t46,
               t51, t52, t53, t54, t55, t56,
               t61, t62, t63, t64, t65, t66,
               t71, t72, t73, t74, t75, t76,
               t81, t82, t83, t84, t85, t86,
               t91, t92, t93, t94, t95, t96]

let grid = [];
let nRows = 9;
let nCol = 6;

for (let i = 1; i < nRows + 1; i++) {

  for (let j = 1; j < nCol + 1; j++) {
    grid.push({

      id: "t" + i.toString() + j.toString(),
      row: i,
      col: j,
    });
  }
}

// Set adjacent cells

grid.forEach(tile => {
  tile.adjacentCells = [
    grid.filter(t => t.row === tile.row - 1 && t.col == tile.col)[0] != undefined ? grid.filter(t => t.row === tile.row - 1 && t.col == tile.col)[0].id : null,
    grid.filter(t => t.row === tile.row + 1 && t.col == tile.col)[0] != undefined ? grid.filter(t => t.row === tile.row + 1 && t.col == tile.col)[0].id : null,
    grid.filter(t => t.col === tile.col - 1 && t.row == tile.row)[0] != undefined ? grid.filter(t => t.col === tile.col - 1 && t.row == tile.row)[0].id : null,
    grid.filter(t => t.col === tile.col + 1 && t.row == tile.row)[0] != undefined ? grid.filter(t => t.col === tile.col + 1 && t.row == tile.row)[0].id : null
  ]
});

// Set player

grid[0].isPlayer = true;

// Set treasure

const xMarkTheSpot = "t96"
grid.filter(t => t.id == xMarkTheSpot)[0].treasue = true;



board.forEach(element => {

  let tileClicked = grid.filter(t => t.id === element.id)[0].id;
  let jsonTileClickded = JSON.stringify({ tileClicked })

  element.addEventListener("click", () => {
    fetch("http://localhost:3000/api/clicked", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: jsonTileClickded
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  })
});




// Practicando con promesa

// const succes = true  // <- Esto simula que ha llegado el movimiento bien pero la condicion que determina si se acepta o no dependera d q haya llegado bien el objeto

// const playerAction = new Promise((resolve, reject) => {

//   if (succes) resolve("Todo correcto");

//   if (!succes) reject("Algo ha ido mal...")

// })

// playerAction
//   .then((value) => {
//     console.log(value);
//   })
//   .catch((err) => {
//     console.log(err)
//   });
