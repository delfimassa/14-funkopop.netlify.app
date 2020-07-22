import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/style.css';
leerDatos();
function leerDatos() {
    if (localStorage.length > 0) {
        let arregloLS = JSON.parse(localStorage.getItem("funkoKey"));
        let article = document.getElementById("article");

        for (let i in arregloLS) {
            let codigoHTML = `<div class="col-sm-12 col-md-4 col-lg-3">
            <div class="card">
                <img src="img/productos/${arregloLS[i].imagen}" class="card-img-top" alt="${arregloLS[i].nombre}">
                <div class="card-body">
                    <h5 class="card-title">${arregloLS[i].nombre}</h5>
                    <p class="card-text">${arregloLS[i].descripcion}</p>
                    <a href="#" class="btn btn-primary disabled">Comprar</a>
                </div>
            </div>
            </div>`

            article.innerHTML += codigoHTML;
        }
    }
}