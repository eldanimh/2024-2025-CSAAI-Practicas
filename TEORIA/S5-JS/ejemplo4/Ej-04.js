console.log("Ejecutando JS...");

//-- Crear objeto gui, con los elementos de la interfaz gráfica
//-- Al tenerlo agrupado podemos pasarlo como parámetro o asignárselo
//-- a otro objeto
const gui = {
  display: document.getElementById("display"),
  boton_inc: document.getElementById("boton_inc"),
  boton_dec: document.getElementById("boton_dec")
}

//-- Objeto contador: Contiene el valor y el método para incrementarse
const counter = {
  valor: 0,
  inc : function(value) {
    this.valor += value; // "this" se pone cuando estás dentro de un objeto
    gui.display.innerHTML = this.valor;
  }
}

//-- Acciones:
//-- Incrementar contador
gui.boton_inc.onclick = () => {
  counter.inc(1); // Cambio de valores aumenta de 1 en 1
}

//-- Decrementar contador
gui.boton_dec.onclick = () =>{
  counter.inc(-1); // Cambio de valores disminuye de 1 en 1
}