import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../css/style.css";
import Funko from "./funko";
import $ from "jquery";

let listaProductos = [];
leerDatos();
let productoExistente = false;
// si es false, boton enviar agrega nuevo producto. Si es true, modifica.

window.agregarProducto = function () {
  console.log("en la funcion");
  let codigo = document.getElementById("codigo"),
    nombre = document.getElementById("nombre"),
    numSerie = document.getElementById("numSerie"),
    descripcion = document.getElementById("descripcion"),
    categoria = document.getElementById("categoria"),
    imagen = document.getElementById("imagen");
  //Validar formulario
  if (
    revisarCodigo(codigo) &&
    requerido(nombre) &&
    requerido(numSerie) &&
    requerido(descripcion) &&
    requerido(categoria) &&
    requerido(imagen)
  ) {
    let producto = new Funko(
      codigo.value,
      nombre.value,
      numSerie.value,
      categoria.value,
      descripcion.value,
      imagen.value
    );
    listaProductos.push(producto);
    localStorage.setItem("funkoKey", JSON.stringify(listaProductos));
    leerDatos();
    limpiarForm();
  } else {
    alert("Faltan completar datos");
  };
  let ventanaModal = document.getElementById("modalProducto");
  $(ventanaModal).modal("hide");
};

window.revisarCodigo = function (checkCodigo) {
  if (checkCodigo.value != "" && !isNaN(checkCodigo.value)) {
    console.log(checkCodigo);
    checkCodigo.className = "form-control is-valid";
    return true;
  } else {
    checkCodigo.className = "form-control is-invalid";
    return false;
  }
};

window.requerido = function (checkNombre) {
  if (checkNombre.value != "") {
    checkNombre.className = "form-control is-valid";
    return true;
  } else {
    checkNombre.className = "form-control is-invalid";
    return false;
  }
};

function leerDatos() {
  if (localStorage.length > 0) {
    let arregloLS = JSON.parse(localStorage.getItem("funkoKey"));
    if (listaProductos.length == 0) {
      listaProductos = arregloLS;
    }
    //Borrar filas
    //Dibujar las filas de la tabla
    borrarFila();
    dibujarFilas(arregloLS);
  }
}

function dibujarFilas(arregloLS) {
  let tbody = document.getElementById("tablaProducto");
  let codigoHTML = "";

  for (let i in arregloLS) {
    codigoHTML = `<tr>
                        <th scope="row">${arregloLS[i].codigo}</th>
                        <td>${arregloLS[i].nombre}</td>
                        <td>${arregloLS[i].numSerie}</td>
                        <td>${arregloLS[i].categoria}</td>
                        <td>${arregloLS[i].descripcion}</td>
                        <td>${arregloLS[i].imagen}</td>
                        <td>
                            <button class="btn btn-outline-info" onclick="modificarProducto(${arregloLS[i].codigo})">Modificar</button>
                            <button class="btn btn-outline-danger" onclick="eliminarProducto(${arregloLS[i].codigo})">
                            Eliminar</button>
                        </td>
                    </tr>`;
    tbody.innerHTML += codigoHTML;
  }
}
function borrarFila(){
  let tbody = document.getElementById("tablaProducto");
  if(tbody.children.length > 0){
   while(tbody.firstChild){
     tbody.removeChild(tbody.firstChild)
   }
  }
}

window.limpiarForm = function(){
  let formProducto = document.getElementById("formProducto");
  formProducto.reset();
  productoExistente = false;
}

window.eliminarProducto = function(codigo){
  // buscar el objeto a eliminar en el arreglo(por su codigo, recibido por parametro)
  // eliminar este objeto del arreglo
  // Opcion 1
  // for(let i in listaProductos){
  //   if(listaProductos[i].codigo == codigo){
  //     // encontre el producto buscado 
  //   }
  // }
  // Opcion 2 
  let productosFiltrados = listaProductos.filter(function(producto){
    // filter devuelve un arreglo con una sola posicion por eso es importante que los codigos sean unicos
    return producto.codigo != codigo;
  });
  // actualizar localstorage
  localStorage.setItem("funkoKey", JSON.stringify(productosFiltrados));
  // dibujar tabla otra vez
  leerDatos();
  listaProductos = productosFiltrados;
}

window.modificarProducto = function (codigo){
  console.log(codigo)
  // buscar el objeto a modificar en el arreglo(por su codigo, recibido por parametro)
  let objetoEncontrado = listaProductos.find(function(producto){
    return producto.codigo == codigo;
  })
  console.log(objetoEncontrado);
  // asignar al modal los valores del pbjeto encontrado
  document.getElementById("codigo").value = objetoEncontrado.codigo;
  document.getElementById("nombre").value = objetoEncontrado.nombre;
  document.getElementById("numSerie").value = objetoEncontrado.numSerie;
  document.getElementById("categoria").value = objetoEncontrado.categoria;
  document.getElementById("descripcion").value = objetoEncontrado.descripcion;
  document.getElementById("imagen").value = objetoEncontrado.imagen;
  // mostrar la ventana modal
  let ventanaModal = document.getElementById("modalProducto");
  // simbolo pesos fuera de bartick es siempre sintaxis de jquery
  $(ventanaModal).modal("show");
  productoExistente = true;
};

window.agregarOmodificar = function(e){
  e.preventDefault();

  if(productoExistente == false){
    agregarProducto();
  }else{
    guardarModificacion();
  }
}

function guardarModificacion(){
  console.log("desde la funcion guardarModificacion");
  // tomar todos los valores del form y almacenarlos en variables
  let codigo = document.getElementById("codigo").value,
    nombre = document.getElementById("nombre").value,
    numSerie = document.getElementById("numSerie").value,
    descripcion = document.getElementById("descripcion").value,
    categoria = document.getElementById("categoria").value,
    imagen = document.getElementById("imagen").value;
  // buscar en arreglo listaProductos cual es el que estoy modificando y actualizarle los valores
  for (let i in listaProductos){
    if (listaProductos[i].codigo == codigo){
      listaProductos[i].nombre = nombre;
      listaProductos[i].numSerie = numSerie;
      listaProductos[i].descripcion = descripcion;
      listaProductos[i].categoria = categoria;
      listaProductos[i].imagen = imagen;
    }
  }
  // actualizar el localStorage
  localStorage.setItem("funkoKey", JSON.stringify(listaProductos));
  // vovler a dibujar la tabla
  leerDatos(); 
  limpiarForm();
  let ventanaModal = document.getElementById("modalProducto");
  $(ventanaModal).modal("hide");
}; 
