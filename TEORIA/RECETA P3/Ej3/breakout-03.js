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
    visible: true,
    brickSpeed: 2
};

//-- Dirección de los ladrillos
let brickDirection = 1; // 1 = derecha, -1 = izquierda

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

//-- Dibujar ladrillos
function drawBricks() {
    for (let i = 0; i < LADRILLO.F; i++) {
        for (let j = 0; j < LADRILLO.C; j++) {
            const brick = ladrillos[i][j];
            if (brick.visible) {
                ctx.beginPath();
                ctx.rect(brick.x, brick.y, brick.w, brick.h);
                ctx.fillStyle = 'blue';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

//-- Mover ladrillos
function moveBricks() {
    let changeDirection = false;

    for (let i = 0; i < LADRILLO.F; i++) {
        for (let j = 0; j < LADRILLO.C; j++) {
            const brick = ladrillos[i][j];
            if (brick.visible) {
                const nextX = brick.x + LADRILLO.brickSpeed * brickDirection;
                if (nextX < 0 || nextX + brick.w > canvas.width) {
                    changeDirection = true;
                    break;
                }
            }
        }
        if (changeDirection) break;
    }

    if (changeDirection) {
        brickDirection *= -1;
    }

    for (let i = 0; i < LADRILLO.F; i++) {
        for (let j = 0; j < LADRILLO.C; j++) {
            ladrillos[i][j].x += LADRILLO.brickSpeed * brickDirection;
        }
    }
}

//-- Dibujar todo
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
}

//-- Bucle principal
function update() {
    moveBricks();
    draw();
    requestAnimationFrame(update);
}

update();
