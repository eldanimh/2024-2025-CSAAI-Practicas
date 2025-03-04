//-- Contador de clics de botón

console.log("Ejecutando JS...");

//-- Acceder a los elementos del DOM
const display = document.getElementById("display");
const boton = document.getElementById("boton");

//-- Contador de clics
let cont = 0;

//-- Configurar retrollamada del boton
boton.onclick = () => {
  console.log("Clic!");

  //-- Incrementar contador
  cont += 1;

  //-- Actualizar el display
  display.innerHTML += ' ' + cont;
}