const canvas = document.getElementById("gameCanvas");

canvas.width = 800;
canvas.height = 600;

const ctx = canvas.getContext("2d");

const bossImg = new Image();
bossImg.src = "assets/boss.png";

const naveImg = new Image();
naveImg.src = "assets/nave.png"

// NEW BRICK BOSS

const LADRILLO = {
    F: 3,  // Filas
    C: 8,  // Columnas
    w: 10.24*6,
    h: 10.24*6,
    origen_x: 50,
    origen_y: 100,
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
                ctx.drawImage(bossImg,brick.x, brick.y, brick.w, brick.h)
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
            ladrillos[i][j].y += 0.2;
            if (ladrillos[i][j].y >= player.y-80 && !victory) {
                perder = true;
                LooseSound.play();
            }
        }
    }
}


/////////////////////////////////////////////////////////////////



const explosionImg = new Image();
explosionImg.src = "assets/explosion.png";

const explosions = [];

const shootSounds = [
    new Audio("sound/shoot.mp3"),
    new Audio("sound/shoot.mp3"),
    new Audio("sound/shoot.mp3")
];
let shootIndex = 0;
let hitIndex = 0;

const hitSounds = [
    new Audio("sound/hit.mp3"),
    new Audio("sound/hit.mp3"),
    new Audio("sound/hit.mp3")
];
const victorySound = new Audio("sound/victory.mp3");

const LooseSound = new Audio("sound/loose.mp3");

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    points: 0
};

const bullets = [];

const texto = {
    x: 10, 
    y:40
}

function puntuacion() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Puntuación: "+player.points,texto.x,texto.y);
    

}



let victory = false;
let perder = false;

function drawPlayer() {
    ctx.drawImage(naveImg,player.x, player.y, player.width, player.height);
}


function drawBullets() {
    ctx.fillStyle = "red";
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

function moveBullets() {
    bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        if (bullet.y < 0) bullets.splice(index, 1);
    });
}

function checkCollisions() {
    bullets.forEach((bullet, bIndex) => {
        for (let i = 0; i < LADRILLO.F; i++) {
            for (let j = 0; j < LADRILLO.C; j++) {
                const brick = ladrillos[i][j];
                if (brick.visible) {
                    if (
                        bullet.x > brick.x &&
                        bullet.x < brick.x + brick.w &&
                        bullet.y > brick.y &&
                        bullet.y < brick.y + brick.h
                    ) {
                        bullets.splice(bIndex, 1);
                        brick.visible = false;
                        bullet.dy *= -1;
                        player.points += 10;

                        //boss.damageTimer = 10;
                        hitSounds[hitIndex].currentTime = 0;
                        hitSounds[hitIndex].play();
                        hitIndex = (hitIndex + 1) % hitSounds.length;
            
                        explosions.push({
                            x: bullet.x - 20, // centramos un poco la explosión
                            y: bullet.y - 20,
                            width: 40,
                            height: 40,
                            timer: 10
                        });

                        if (player.points == 240) {
                            victory = true;
                            victorySound.play();
                        }


                    }
                }
            }
        }
            
        

        
    });
}




function shoot() {
    bullets.push({ x: player.x + player.width / 2 - 2.5, y: player.y, width: 5, height: 10, speed: 5 });
    shootSounds[shootIndex].currentTime = 0;
    shootSounds[shootIndex].play();
    shootIndex = (shootIndex + 1) % shootSounds.length;
}


function drawExplosions() {
    explosions.forEach((explosion, index) => {
        ctx.drawImage(explosionImg, explosion.x, explosion.y, explosion.width, explosion.height);
        explosion.timer--;
        if (explosion.timer <= 0) {
            explosions.splice(index, 1);
        }
    });
}



function drawVictory() {
    ctx.fillStyle = "green";
    ctx.font = "40px Arial";
    ctx.fillText("VICTORY!", canvas.width / 2 - 80, canvas.height / 2);
}

function drawDefeat() {
    ctx.fillStyle = "red";
    ctx.font = "40px Arial";
    ctx.fillText("¡GAME OVER!", canvas.width / 2 - 80, canvas.height / 2);
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    puntuacion();
    drawPlayer();
    drawBricks();
    drawExplosions();
    drawBullets();
    if (victory) drawVictory();
    if (perder) drawDefeat();
}

function update() {
    if (!victory) {
        player.x += player.dx;
        if (player.x < 0) player.x = 0;
        if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
        moveBullets();
        checkCollisions();
    }
    moveBricks();
    draw();
    requestAnimationFrame(update);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") player.dx = -player.speed;
    if (e.key === "ArrowRight") player.dx = player.speed;
    if (e.key === " ") shoot();
});
document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") player.dx = 0;
});

update();