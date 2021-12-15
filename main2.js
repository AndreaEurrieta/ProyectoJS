const contenedorArticulos = document.querySelector('.contenedor-articulos');
const contenedorCarrito = document.querySelector('.contenedor-carrito');
const articulos = [
    {
        id: 1,
        name: "Buzo Xiomi",
        price: 7500,
        img: "./imagenes/img1.png"
    },
    {
        id: 2,
        name: "Camisa Padn",
        price: 14500,
        img: "./imagenes/img2.png"
    },
    {
        id: 3,
        name: "Buzo Rabbit",
        price: 6950,
        img: "./imagenes/img3.png"
    },
    {
        id: 4,
        name: "Conjunto Essi",
        price: 18500,
        img: "./imagenes/img6.png"
    },
    {
        id: 5,
        name: "Buzo Ter",
        price: 11200,
        img: "./imagenes/img7.png"
    },
    {
        id: 6,
        name: "Buzo Dan",
        price: 9850,
        img: "./imagenes/img8.png"
    },
    {
        id: 7,
        name: "Camisa Sheby",
        price: 14900,
        img: "./imagenes/img9.png"
    },
    {
        id: 8,
        name: "Camisa Alma",
        price: 14500,
        img: "./imagenes/img10.png"
    },
    {
        id: 9,
        name: "Blazer Thami",
        price: 14950,
        img: "./imagenes/img11.png"
    },
    {
        id: 10,
        name: "Pantalón Cris",
        price: 11990,
        img: "./imagenes/img4.png"
    },
    {
        id: 11,
        name: "Botas Vivian",
        price: 19300,
        img: "./imagenes/imgbotas1,1.png"
    },
    {
        id: 12,
        name: "Botas Arge",
        price: 21890,
        img: "./imagenes/img12,12.png"
    },
]
let carrito = []
$(() => {
    mostrarCarrito(carrito);
    mostrarArticulos()
})
const mostrarArticulos = () => {
    for (const articulo of articulos) {
        $('.contenedor-articulos').append(`
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
    `) 
        $(function () {
            
            let mostrarTalle = true;
            $(`#btnbag${articulo.id}`).on('click', () => {
            if (mostrarTalle)
                $(`#div1${articulo.id}`).slideDown("slow")
            else
                $(`#div1${articulo.id}`).slideUp("slow")
            mostrarTalle = !mostrarTalle;
            });
        });
        $(`#btn-carrito${articulo.id}`).on('click', () => agregarProducto(articulo.id));
    }
}

function agregarProducto(id) {
    const producto = articulos.find(articulo => articulo.id === id);
    carrito.push(producto);
    mostrarCarrito(carrito);
}

function mostrarCarrito(carrito) {
    contenedorCarrito.replaceChildren();
    document.getElementById("cantidadDeItems").textContent = carrito.length;

    let total = 0;

    carrito.forEach((producto) => {
        total += producto.price;
        const div = document.createElement("div");
        const nombreArticulo = document.createElement("p");
        nombreArticulo.textContent = `${producto.name} ${producto.price}`;
        div.appendChild(nombreArticulo);
        contenedorCarrito.appendChild(div);

    });

    const totalHTML = document.createElement("p");
    totalHTML.textContent = `Total: ${total}`;
    contenedorCarrito.appendChild(totalHTML);
}

function cargarLocalStorage() {
    let _carrito = localStorage.getItem('carrito');
    if (_carrito) carrito = JSON.parse(_carrito);
}


