class Carrito {
  constructor() {
    this.items = [];
  }
  getItems() {
    return this.items;
  }
  setItems(items) {
    this.items = items;
  }
  agregarItem(articulo) {
    const articuloEnCarrito = this.items.find(
      (item) => item.articulo.id === articulo.id
    );
    if (articuloEnCarrito) {
      articuloEnCarrito.cantidad++;
    } else {
      this.items.push({
        articulo,
        cantidad: 1,
      });
    }
  }
  /**
   * Quita solamente un articulo de ese tipo
   */
  quitarArticulo(articulo) {
    const articuloEnCarrito = this.items.find(
      (item) => item.articulo.id === articulo.id
    );
    if (articuloEnCarrito && articuloEnCarrito.cantidad > 0)
      articuloEnCarrito.cantidad--;
    if (articuloEnCarrito.cantidad === 0) this.quitarItem(articulo);
  }
  /**
   * Quita todos los articulos de ese tipo
   */
  quitarItem(articulo) {
    const articuloEnCarrito = this.items.find(
      (item) => item.articulo.id === articulo.id
    );
    if (articuloEnCarrito) {
      this.setItems(
        this.getItems().filter((item) => item.articulo.id !== articulo.id)
      );
    }
  }
  calcularTotal() {
    let subtotal = 0;
    for (let item of this.items) {
      subtotal += (item.articulo.price * item.cantidad);
    }
    return subtotal;
  }
  cantidadDeProductos() {
    let cantidad = 0;
    for (let item of this.items) {
      cantidad += item.cantidad;
    }
    return cantidad;
  }
}

const contenedorArticulos = document.querySelector(".contenedor-articulos");
const contenedorCarrito = document.querySelector(".contenedor-carrito");
const articulos = [];
const carrito = new Carrito();
const _open = document.getElementById("btnCar");
$(() => {
  $.getJSON("./articulos.json", function (data) {
    data.forEach((elemento) => articulos.push(elemento));
    mostrarArticulos(articulos);
  });
  mostrarCarrito(false);
});

const mostrarArticulos = () => {
  for (const articulo of articulos) {
    $(".contenedor-articulos").append(`
        <div class="tarjeta">
            <img class="img" src="${articulo.img}">
            <button id="btnbag${articulo.id}" class="bag"><i class="fas fa-shopping-bag"></i></button>
            <div id="div1${articulo.id}" class="divC1">
            <h3 class="talle">Talle</h3>
            <select class="form-select">
        		<option value="(Sin Talle)">(Sin Talle)</option>
				<option value="1">1</option>
				<option value="2">2</option>
				</select>
            <button id="btn-carrito${articulo.id}" type="submit" class="btn btn-primary btn-small col-8 mb-2" value="Agregar al carrito">Agregar al Carrito</button>
            </div>
            <h2 class="nombre-articulo">${articulo.name}</h2>
            <p class="price">$ ${articulo.price}<p>
        </div>
    `);
    $(function () {
      let mostrarTalle = true;
      $(`#btnbag${articulo.id}`).on("click", () => {
        if (mostrarTalle) $(`#div1${articulo.id}`).slideDown("slow");
        else $(`#div1${articulo.id}`).slideUp("slow");
        mostrarTalle = !mostrarTalle;
      });
    });
    $(`#btn-carrito${articulo.id}`).on("click", () =>
      agregarProducto(articulo.id)
    );
  }
};

function agregarProducto(id) {
  document.getElementById("alert").style.display = "none";
  const producto = articulos.find((articulo) => articulo.id === id);
  carrito.agregarItem(producto);
  mostrarCarrito();
}

function mostrarCarrito(abrirModal = true) {
  if (abrirModal) _open.dispatchEvent(new Event("click"));
  contenedorCarrito.replaceChildren();
  document.getElementById("cantidadDeItems").textContent =
    carrito.cantidadDeProductos();

  carrito.getItems().forEach((item) => {
    const producto = item.articulo;

    const div = document.createElement("div");
    const div2 = document.createElement("div");
    div2.classList.add("div2");
    const div3 = document.createElement("div");
    div3.classList.add("div3");

    const imagen = document.createElement("img");
    imagen.src = producto.img;
    imagen.classList.add("img-carrito");

    const nombreArticulo = document.createElement("h2");
    nombreArticulo.textContent = producto.name;
    nombreArticulo.classList.add("nombreArticulo-carrito");

    const precioArticulo = document.createElement("p");
    precioArticulo.textContent = producto.price;
    precioArticulo.classList.add("precio-carrito");

    const cantidad = document.createElement("input");
    cantidad.type = "number";
    cantidad.min = "1";
    cantidad.classList.add("cantidad-producto");
    cantidad.value = item.cantidad;
    let valorPrevio = item.cantidad;
    cantidad.addEventListener('change', e => {
        console.log('input val cheaanangeee', e.target.value);
        if (e.target.value > valorPrevio) {
            // Aumentar la cantidad del producto en el carrito
            carrito.agregarItem(producto);
            mostrarCarrito()
        } else {
            // Disminuir la cantidad del producto en el carrito
            carrito.quitarArticulo(producto);
            mostrarCarrito()
        }
    })

    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = '<i class="far fa-trash-alt"></i>';
    button.classList.add("btn-eliminar-producto");
    button.addEventListener("click", () => {
      carrito.quitarItem(producto);
      mostrarCarrito();
    });

    div.appendChild(imagen);
    div2.appendChild(nombreArticulo);
    div2.appendChild(precioArticulo);
    div2.appendChild(cantidad);
    div3.appendChild(button);
    contenedorCarrito.appendChild(div);
    contenedorCarrito.appendChild(div2);
    contenedorCarrito.appendChild(div3);
  });

  contenedorCarrito.querySelector(".cantidad-producto");
  contenedorCarrito.addEventListener("change", quantityChanged);

  const total = carrito.calcularTotal();
  const totalHTML = document.createElement("p");
  totalHTML.textContent = `Total: $ ${total.toFixed(2)}`;
  contenedorCarrito.appendChild(totalHTML);
}

const comprarButton = document.querySelector(".comprarButton");
comprarButton.addEventListener("click", comprarButtonClicked);

function comprarButtonClicked() {
  contenedorCarrito.innerHTML = "";
  mostrarCarrito();
}
function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  mostrarCarrito();
}
