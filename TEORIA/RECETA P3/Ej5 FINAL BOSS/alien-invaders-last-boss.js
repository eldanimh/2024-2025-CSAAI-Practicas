const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const bossImg = new Image();
bossImg.src = "assets/boss.png";


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

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0
};

const bullets = [];

const boss = {
    x: canvas.width / 2 - 75,
    y: 100,
    width: 150,
    height: 150,
    health: 10,
    alive: true,
    dx: 2, // velocidad horizontal
    dy: 0.5, // velociadad horizontal
    damageTimer: 0
};


function drawBossHealthBar() {
    if (!boss.alive) return;
    const barWidth = 200;
    const barHeight = 20;
    const x = canvas.width - barWidth - 20;
    const y = 20;

    const healthRatio = boss.health / 10; // suponiendo 10 impactos totales

    ctx.fillStyle = "gray";
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = "red";
    ctx.fillRect(x, y, barWidth * healthRatio, barHeight);

    ctx.strokeStyle = "white";
    ctx.strokeRect(x, y, barWidth, barHeight);
}

function moveBoss() {
    if (!boss.alive) return;

    boss.x += boss.dx;
    boss.y += boss.dy;

    // Rebote en bordes
    if (boss.x <= 0 || boss.x + boss.width >= canvas.width) {
        boss.dx *= -1;
    }
    if (boss.y <= 50 || boss.y + boss.height >= canvas.height / 2) {
        boss.dy *= -1;
    }

    // Cambio aleatorio de dirección cada X frames
    if (Math.random() < 0.01) boss.dx *= -1;
    if (Math.random() < 0.01) boss.dy *= -1;
}

let victory = false;

function drawPlayer() {
    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBoss() {
    if (!boss.alive) return;

    ctx.drawImage(bossImg, boss.x, boss.y, boss.width, boss.height);

    if (boss.damageTimer > 0) {
        if (boss.damageTimer % 2 === 0) {
            ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
            ctx.fillRect(boss.x, boss.y, boss.width, boss.height);
        }
        boss.damageTimer--;
    }
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
        if (boss.alive &&
            bullet.x < boss.x + boss.width &&
            bullet.x + bullet.width > boss.x &&
            bullet.y < boss.y + boss.height &&
            bullet.y + bullet.height > boss.y) {
            bullets.splice(bIndex, 1);
            boss.health--;
            boss.damageTimer = 10;
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

            if (boss.health <= 0) {
                boss.alive = false;
                victory = true;
                crearTracaFinal();
                victorySound.play();
            }
        }
    });
}

function crearTracaFinal() {
    const numExplosiones = 12;

    for (let i = 0; i < numExplosiones; i++) {
        const delay = i * 100; // separamos en el tiempo

        setTimeout(() => {
            const offsetX = Math.random() * boss.width;
            const offsetY = Math.random() * boss.height;

            explosions.push({
                x: boss.x + offsetX - 20,
                y: boss.y + offsetY - 20,
                width: boss.width,
                height: boss.height,
                timer: 15
            });
        }, delay);
    }
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
    ctx.fillText("¡Victoria!", canvas.width / 2 - 80, canvas.height / 2);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBossHealthBar();
    drawPlayer();
    drawBoss();
    drawExplosions();
    drawBullets();
    if (victory) drawVictory();
}

function update() {
    if (!victory) {
        player.x += player.dx;
        if (player.x < 0) player.x = 0;
        if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
        moveBullets();
        checkCollisions();
        moveBoss();
    }
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