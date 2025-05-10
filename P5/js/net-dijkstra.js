
function dijkstraConRetardos(red, origen, destino) {
    const distancia = {}; // Almacena la distancia mínima desde el nodo origen hasta cada nodo
    const anterior = {}; // Almacena el nodo anterior en la ruta mínima desde el nodo origen hasta cada nodo
    const nodosNoVisitados = new Set(); // Conjunto de nodos no visitados
  
    // Inicializar las distancias a cada nodo como infinito y el nodo anterior como null
    for (const nodo of red) {
      distancia[nodo.id] = Infinity;
      anterior[nodo.id] = null;
      nodosNoVisitados.add(nodo.id);
    }
  
    // La distancia al nodo origen es 0
    distancia[origen.id] = 0;
  
    while (nodosNoVisitados.size > 0) {
      // Encontrar el nodo no visitado con la distancia mínima
      let nodoActual = null;
      for (const nodoId of nodosNoVisitados) {
        if (nodoActual === null || distancia[nodoId] < distancia[nodoActual]) {
          nodoActual = nodoId;
        }
      }
  
      // Si no se encuentra un nodo actual, salir del bucle
      if (nodoActual === null) break;
  
      nodosNoVisitados.delete(nodoActual); // Marcar el nodo actual como visitado
  
      // Actualizar las distancias a los nodos adyacentes al nodo actual
      auxNode = red[nodoActual];
      for (const { nodo, peso } of auxNode.conexiones) {
        const distanciaTotal = distancia[nodoActual] + peso + nodo.delay; // Considerar el retardo en el procesamiento del nodo
        if (distanciaTotal < distancia[nodo.id]) {
          distancia[nodo.id] = distanciaTotal;
          anterior[nodo.id] = nodoActual;
        }
      }
    }
  
    // Reconstruir la ruta mínima desde el nodo destino hasta el nodo origen
    const rutaMinima = [];
    let nodoActual = destino.id;
    
    while (anterior[nodoActual] !== null) {
      rutaMinima.unshift(nodoActual);
      nodoActual = anterior[nodoActual];
    }
    rutaMinima.unshift(origen.id);
  
    // Devolver la ruta mínima como una lista de nodos
    return rutaMinima.map(id => red.find(nodo => nodo.id === id));
  }
  
  