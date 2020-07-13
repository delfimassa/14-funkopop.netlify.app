import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../css/style.css";
import Funko from "./funko";

let listaProductos = [];

function agregarProducto() {
  let codigo = document.getElementById("codigo").value,
    nombre = document.getElementById("nombre").value,
    numSerie = document.getElementById("numSerie").value,
    descripcion = document.getElementById("descripcion").value,
    categoria = document.getElementById("categoria").value,
    imagen = document.getElementById("imagen").value;
  //Validar formulario

  let producto = new Funko(
    codigo,
    nombre,
    numSerie,
    categoria,
    descripcion,
    imagen
  );
}
