//-- Manejador del evento clic sobre el párrafo test
//-- Cada vez que se hace clic en el párrafo se invoca a esta función
// function manejador_parrafo() {
//     console.log("Clic sobre el párrafo...")
// }

  

// console.log("Ejecutando js...")

// //-- Leer el párrafo identificado como test
// const test = document.getElementById('test')

// //-- Configurar el manejador para el evento de
// //-- pulsación de botón: que se ejecute la
// //-- funcion manejador_parrafo()
// test.onclick = manejador_parrafo;


// MEJOR

console.log("Ejecutando js...")

//-- Leer el párrafo identificado como test
const test = document.getElementById('test')

//-- Configurar el manejador para el evento de
//-- pulsación de botón
test.onclick = function () {
  console.log("Click sobre el párrafo...")
}
