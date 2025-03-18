console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del canvas
canvas.width = 300;
canvas.height = 100;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

//-- Coordenadas del objeto
let x = 0;
let y = 10;

//-- Velocidades del objeto
let velx = 3;
let vely = 1;

//-- Crear los elementos de sonido
const rebote_sound = new Audio("rebote.mp3");

//-- Función principal de animación
function update() 
{
  console.log("test");
  //-- Algoritmo de animación:
  //-- 1) Actualizar posición del  elemento
  //-- (física del movimiento rectilíneo uniforme)

   //-- Condición de rebote en extremos verticales del canvas
   if (x < 0 || x >= (canvas.width - 20) ) {
      rebote_sound.currentTime = 0;
      rebote_sound.play();
      velx = -velx;
  }

  //-- Condición de rebote en extremos horizontales del canvas
  if (y <= 0 || y > 80) {
    rebote_sound.currentTime = 0;
    rebote_sound.play();
    vely = -vely;
  }

  //-- Actualizar la posición
  x = x + velx;
  y = y + vely;

  //-- 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //-- 3) Dibujar los elementos visibles
  ctx.beginPath();
    ctx.rect(x, y, 20, 20);

    //-- Dibujar
    ctx.fillStyle = 'red';

    //-- Rellenar
    ctx.fill();

    //-- Dibujar el trazo
    ctx.stroke()
  ctx.closePath();

  //-- 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);
}

//-- ¡Que empiece la función!
update();