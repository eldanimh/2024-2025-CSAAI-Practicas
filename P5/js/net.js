// Variables de trabajo
const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');

let redAleatoria;
let nodoOrigen = 0, nodoDestino = 0;
let rutaMinimaConRetardos;

const nodes = document.getElementById("nodes");

const nodeRadius = 40;
const numNodos = 5;
const nodeConnect = 2;
const nodeRandomDelay = 1000;
const pipeRandomWeight = 100; // No hay retardo entre nodos 100

// Localizando elementos en el DOM
const btnCNet = document.getElementById("btnCNet");
const btnMinPath = document.getElementById("btnMinPath");

// Clase para representar un nodo en el grafo
class Nodo {

  constructor(id, x, y, delay) {
    this.id = id; // Identificador del nodo
    this.x = x; // Coordenada X del nodo
    this.y = y; // Coordenada Y del nodo
    this.delay = delay; // Retardo del nodo en milisegundos
    this.conexiones = []; // Array de conexiones a otros nodos
  }
  
  // Método para agregar una conexión desde este nodo a otro nodo con un peso dado
  conectar(nodo, peso) {
    this.conexiones.push({ nodo, peso });
  }

}
  




// Función para generar una red aleatoria con nodos en diferentes estados de congestión
function crearRedAleatoriaConCongestion(numNodos, numConexiones) {
  
  const nodos = [];
  let x = 0, y = 0, delay = 0;
  let nodoActual = 0, nodoAleatorio = 0, pickNode = 0, peso = 0;
  let bSpace = false;

  const xs = Math.floor(canvas.width / numNodos);
  const ys = Math.floor(canvas.height / 2 );
  const xr = canvas.width - nodeRadius;
  const yr = canvas.height - nodeRadius;
  let xp = nodeRadius;
  let yp = nodeRadius;
  let xsa = xs;
  let ysa = ys;

  // Generamos los nodos
  for (let i = 0; i < numNodos; i++) {

    //var random_boolean = Math.random() < 0.5;
    if (Math.random() < 0.5) {
      yp = nodeRadius;
      ysa = ys;
    } 
    else {
      yp = ys;
      ysa = yr;
    }

    x = randomNumber(xp, xsa); // Generar coordenada x aleatoria
    y = randomNumber(yp, ysa); // Generar coordenada y aleatoria

    xp = xsa;
    xsa = xsa + xs;

    if ( xsa > xr && xsa <= canvas.width ) {
      xsa = xr;
    }

    if ( xsa > xr && xsa < canvas.width ) {
      xp = nodeRadius;
      xsa = xs;
    }    

    delay = generarRetardo(); // Retardo aleatorio para simular congestión
    nodos.push(new Nodo(i, x, y, delay)); // Generar un nuevo nodo y añadirlo a la lista de nodos de la red
  }

  // Conectamos los nodos
  for (let i = 0; i < numNodos; i++) {
    nodoActual = nodos[i];
    for (let j = 0; j < numConexiones; j++) {
      pickNode = Math.floor(Math.random() * numNodos);
      nodoAleatorio = nodos[pickNode];
      //peso = Math.random() * pipeRandomWeight; // Peso aleatorio para simular la distancia entre nodos
      peso = pipeRandomWeight; // El mismo peso para todas las conexiones
      nodoActual.conectar(nodoAleatorio, peso);
    }
  }

  return nodos;
}






// Función para generar un retardo aleatorio entre 0 y 1000 ms
function generarRetardo() {
  return Math.random() * nodeRandomDelay;
}

// Generar un número aleatorio dentro de un rango
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Dibujar la red en el canvas
function drawNet(nnodes) {
  // Dibujamos las conexiones entre nodos
  nnodes.forEach(nodo => {
    nodo.conexiones.forEach(({ nodo: conexion, peso }) => {
      ctx.beginPath();
      ctx.moveTo(nodo.x, nodo.y);
      ctx.lineTo(conexion.x, conexion.y);
      ctx.stroke();

      ctx.font = '12px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      pw = "N" + nodo.id + " pw " + peso;
      const midX = Math.floor((nodo.x + conexion.x)/2);
      const midY = Math.floor((nodo.y + conexion.y)/2);
      ctx.fillText(pw, midX, midY);  

    });
  });

  let nodoDesc; // Descripción del nodo

  // Dibujamos los nodos
  nnodes.forEach(nodo => {
    ctx.beginPath();
    ctx.arc(nodo.x, nodo.y, nodeRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.stroke();
    ctx.font = '12px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    nodoDesc = "N" + nodo.id + " delay " + Math.floor(nodo.delay);
    ctx.fillText(nodoDesc, nodo.x, nodo.y + 5);
  });
}


// Función de calback para generar la red de manera aleatoria
btnCNet.onclick = () => {

  // Generar red de nodos con congestión creada de manera aleatoria redAleatoria
  // Cada nodo tendrá un delay aleatorio para simular el envío de paquetes de datos
  redAleatoria = crearRedAleatoriaConCongestion(numNodos, nodeConnect);

  // Limpiamos el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar la red que hemos generado
  drawNet(redAleatoria);
  nodes.innerHTML=numNodos

}


btnMinPath.onclick = () => {

  // Supongamos que tienes una red de nodos llamada redAleatoria y tienes nodos origen y destino
  nodoOrigen = redAleatoria[0]; // Nodo de origen
  nodoDestino = redAleatoria[numNodos - 1]; // Nodo de destino

  // Calcular la ruta mínima entre el nodo origen y el nodo destino utilizando Dijkstra con retrasos
  rutaMinimaConRetardos = dijkstraConRetardos(redAleatoria, nodoOrigen, nodoDestino);
  console.log("Ruta mínima con retrasos:", rutaMinimaConRetardos);

}