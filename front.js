

let movimiento = {
  "playerAlive" : true,
  "whereIsPlayer" : "t11",
  "tileToGo" : "t12",
}

movimientoJSON = JSON.stringify(movimiento);


// Practicando con promesa

const succes = true  // <- Esto simula que ha llegado el movimiento bien pero la condicion que determina si se acepta o no dependera d q haya llegado bien el objeto

const playerAction = new Promise((resolve, reject) => {

  if (succes) resolve("Todo correcto");

  if (!succes) reject("Algo ha ido mal...")

})

playerAction
  .then((value) => {
    console.log(value);
  })
  .catch((err) =>{
    console.log(err)
  });
