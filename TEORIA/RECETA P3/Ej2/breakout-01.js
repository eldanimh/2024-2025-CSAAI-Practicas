const canvas = document.getElementById("canvas");

canvas.width = 800;
canvas.height = 600;

const ctx = canvas.getContext("2d");

//-- Constantes de los ladrillos
const LADRILLO = {
    F: 3,  // Filas
    C: 8,  // Columnas
    w: 60,
    h: 20,
    origen_x: 50,
    origen_y: 50,
    padding: 5,
    visible: true
};

//-- Estructura de los ladrillos
const ladrillos = [];

//-- Crear los ladrillos
for (let i = 0; i < LADRILLO.F; i++) {
    ladrillos[i] = [];
    for (let j = 0; j < LADRILLO.C; j++) {
      ladrillos[i][j] = {
          x: LADRILLO.origen_x + ((LADRILLO.w + LADRILLO.padding) * j),
          y: LADRILLO.origen_y + ((LADRILLO.h + LADRILLO.padding) * i),
          w: LADRILLO.w,
          h: LADRILLO.h,
          padding: LADRILLO.padding,
          visible: LADRILLO.visible
        };
    }
}

//ladrillos[0][1].visible = false;


//-- Dibujar ladrillos
for (let i = 0; i < LADRILLO.F; i++) {
    for (let j = 0; j < LADRILLO.C; j++) {

      //-- Si el ladrillo es visible se pinta
      if (ladrillos[i][j].visible) {
        ctx.beginPath();
        ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, LADRILLO.w, LADRILLO.h);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
      }
    }
}