//Variables a utilizar
const botonGuardado = document.querySelector("#btnSave");
const botonEliminarTodas = document.querySelector("#btnDeleteAll");
const listado = document.querySelector("#lista");
const tarea = document.querySelector("#tarea");
const error = document.querySelector("#error");
//variable que guardo el objeto para mayor comodidad
const localStorage = window.localStorage;

//funcion que se encarga de recopilar la informacion e informar al usuario de posibles repeticiones de tarea no permitiedas
const obtenerDato = () => {
  //no permite el uso ni de espacios en blancos ni vacios
  const frase = tarea.value.trim();

  if (frase == "") {
    mensajeError("No puedes anadir una tarea vacia");
    return;
  }
  //Si no existe esa tarea la implementa
  if (!localStorage.getItem(frase)) {
    tarea.value = "";
    localStorage.setItem(frase, frase);
    //Quita el posible mensaje de error que hubiese
  } else {
    //añade el mensaje de error
    mensajeError("Ese valor ya existe ");
  }
  //resetea el html
  muestraDatos();
  tarea.value = "";
};
///funcion que va a mostrar los datos y resetear el html
const muestraDatos = () => {
  //elimina todos los nodos hijos
  while (listado.firstChild) {
    listado.removeChild(listado.firstChild);
  }
  //Recorre el local storage para recojer los datos almacenados en el y crear elementos html con su contenido
  for (let index = 0; index < localStorage.length; index++) {
    const dato = localStorage.key(index);
    const elemento = document.createElement("p");
    const boton = document.createElement("button");
    boton.innerText = "X";
    boton.addEventListener("click", (e) => eliminaUno(e));
    elemento.textContent = dato;
    elemento.append(boton);
    listado.append(elemento);
  }
};
//funcion para eliminar un solo elemento
const eliminaUno = (e) => {
  //desestructura el evento
  const { target } = e;
  //desestructura el elemento
  const {
    parentElement: { textContent },
  } = target;
  //obtengo la frase solo la cual es el id
  const elemento = textContent.slice(0, -1);
  localStorage.removeItem(elemento);
  muestraDatos();
};

//Eventos
botonGuardado.addEventListener("click", () => obtenerDato());

botonEliminarTodas.addEventListener("click", () => {
  localStorage.clear();
  muestraDatos();
});

document.addEventListener("DOMContentLoaded", () => muestraDatos());
document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    if (tarea.value != "") {
      obtenerDato();
    }
  }
});

const mensajeError = (texto) => {
  error.textContent = texto;
  error.classList.add("error");
  setTimeout(() => {
    error.classList.remove("error");
    error.textContent = "";
  }, 2000);
};
