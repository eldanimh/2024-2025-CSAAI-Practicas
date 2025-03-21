//-- Elementos de la gui
const gui = {
    display : document.getElementById("display"),
    start : document.getElementById("start"),
    stop : document.getElementById("stop"),
    reset : document.getElementById("reset")
}

//Audios
ganar_audio = new Audio("auds/win.mp3");
perder_audio = new Audio("auds/loose.mp3");
pulsar = new Audio("auds/amongUs.mp3");

const Colorbox = document.getElementById("CambioFondo");
const Colorvalores = document.getElementById("ColorValores");
const ColorBotonTimer = document.getElementsByClassName("botones_timer");

const valor1 = document.getElementById("valor1")
const valor2 = document.getElementById("valor2")
const valor3 = document.getElementById("valor3")
const valor4 = document.getElementById("valor4")

valores = [valor1,valor2,valor3,valor4]

//intentos
const vidas = document.getElementById("intentos")

// Adivinar
adivinar = [4 ,1, 4, 4];

// Botones
const b0 = document.getElementById("cero")
const b1 = document.getElementById("one")
const b2 = document.getElementById("two")
const b3 = document.getElementById("three")
const b4 = document.getElementById("four")
const b5 = document.getElementById("five")
const b6 = document.getElementById("six") 
const b7 = document.getElementById("seven")
const b8 = document.getElementById("eight")
const b9 = document.getElementById("nine")

teclas = [b0,b1,b2,b3,b4,b5,b6,b7,b8,b9]

console.log("Ejecutando JS...");


//-- Definir un objeto cronómetro
const crono = new Crono(gui.display);

//---- Configurar las funciones de retrollamada

//-- Arranque del cronometro
gui.start.onclick = () => {
    pulsar.currentTime = 0;
    pulsar.play();
    alert("Bienvenido a ¡BOOM!, intenta descubrir cuales son los 4 valores para detener la bomba, CUIDADO solo tienes 10 intentos")
    jugar();
}


function jugar() {
    console.log("Start!!");
    crono.start();
    Colorbox.style.backgroundColor = "#000";
    Colorvalores.style.color= "#000";
    ColorBotonTimer[0].style.backgroundColor= "#fff";
    ColorBotonTimer[1].style.backgroundColor= "#fff";
    ColorBotonTimer[2].style.backgroundColor= "#fff";
}


//for (let j=0; j<=9; j++){
//for (let i = 0, j = 10; i <= 5 && j <= 15; i++, j++)


for (let j=0; j<=9; j++){
    teclas[j].onclick = () =>{
        pulsar.currentTime = 0;
        pulsar.play();
        jugar();
    for (let i=0; i<=3;i++){
        if (parseInt(teclas[j].innerHTML) === adivinar[i]) {
            valores[i].innerHTML = adivinar[i];
            valores[i].style.color ="#0f7";
            adivinar.splice(i,1);
            valores.splice(i,1);
            console.log("GREAT");
            if(adivinar.length===0) {
                crono.stop();
                console.log("WIN");
                ganar_audio.currentTime = 0;
                ganar_audio.play();
                alert("¡HAS GANADO!");
            }
            break;
            
        }
        
        if (parseInt(teclas[j].innerHTML) !== adivinar[i]){
            console.log("wrong")
            vidas.innerHTML=parseInt(vidas.innerHTML)-1
            if (parseInt(vidas.innerHTML)===0) {
                console.log("LOOSE")
                perder_audio.currentTime = 0;
                perder_audio.play();
                alert("BOOM! Te has quedado sin intentos");
                location.reload();
            }
            break;
    
        }
        
    }    
    }
}




//-- Detener el cronómetro
gui.stop.onclick = () => {
    console.log("Stop!");
    pulsar.currentTime = 0;
    pulsar.play();
    crono.stop();
}

//-- Reset del cronómetro
gui.reset.onclick = () => {
    console.log("Reset!");
    pulsar.currentTime = 0;
    pulsar.play();
    crono.reset();
    Colorbox.style.backgroundColor = "#6ac";
    Colorvalores.style.color= "#f00";
    ColorBotonTimer[0].style.backgroundColor= "#000";
    ColorBotonTimer[1].style.backgroundColor= "#000";
    ColorBotonTimer[2].style.backgroundColor= "#000";
    location.reload();
}



