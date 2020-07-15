import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../css/style.css";
import Funko from "./funko";

let listaProductos = [];
leerDatos();

window.agregarProducto = function (e) {
  e.preventDefault();
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
  } else {
    alert("Faltan completar datos");
  }
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
    dibujarFilas(arregloLS);
  }
}

function dibujarFilas(arregloLS) {
  let tbody = document.getElementById("tablaProducto");
  let codigoHTML = "";

  for (let i in arregloLS){
    codigoHTML = `<tr>
                        <th scope="row">${arregloLS[i].codigo}</th>
                        <td>${arregloLS[i].nombre}</td>
                        <td>${arregloLS[i].numSerie}</td>
                        <td>${arregloLS[i].categoria}</td>
                        <td>${arregloLS[i].descripcion}</td>
                        <td>${arregloLS[i].imagen}.png</td>
                        <td>
                            <button class="btn btn-outline-info">Modificar</button>
                            <button class="btn btn-outline-danger">Eliminar</button>
                        </td>
                    </tr>`;
    tbody.innerHTML += codigoHTML;
  }
}