/*--------------------------------------------------DECLARACION DE VARIABLES--------------------------------------------------*/

let personas = 0;
let fecha = null;
let precioActualizado = null;

/*--------------------------------------------------CARRITO--------------------------------------------------*/

const carrito = new Carrito(JSON.parse(localStorage.getItem("carrito")) || []);

function actualizarStorage(array) {
	localStorage.setItem("carrito", JSON.stringify(array));
}

function eliminarExcursion(idExcusrsion) {
	carrito.eliminar(idExcusrsion);
	mostrarMensaje("Quitado del carrito");
	mostrarCarrito();
}

/*--------------------------------------------------CREAR GRILLA DE EXCURSIONES--------------------------------------------------*/

fetchExcursiones();

function fetchExcursiones() {
	fetch("json/dataExcursiones.json")
		.then((resultado) => resultado.json())
		.then((data) => mostrarExcursionesDisponibles(data));
}

function mostrarExcursionesDisponibles(array) {
	let listaCards = "";

	array.forEach((excursion) => {
		listaCards += crearCard(excursion);
		catalogoExcursiones.innerHTML = listaCards;
	});
}

/*--------------------------------------------------CREAR CARD EXCURSION INDIVIDUAL--------------------------------------------------*/

function agregarExcursion(idExcusrsion) {
	carrito.agregar(idExcusrsion, personas, fecha);
	modalInfo.toggleAttribute("open");
	mostrarMensaje("Agregado al carrito");

	// espero al fetch del carrito
	setTimeout(() => {
		mostrarCarrito();
	}, 10);
}

function actualizarPrecio(event) {
	personas = event.target.value;
	let total;

	if (fecha != null) habilitarBotonExcursion();

	fetch("json/dataExcursiones.json")
		.then((resultado) => resultado.json())
		.then((dataExcursiones) => {
			dataExcursiones.find((excursion) => {
				if (excursion.id == event.target.dataset.id) {
					total = personas * excursion.precioUnitario;
					document.querySelector("#precioTotal").innerHTML = total;
				}
			});
		});
}

function actualizarFecha(event) {
	fecha = event.target.value;
	if (personas != 0) habilitarBotonExcursion();
}

function borrarCache() {
	personas = 0;
	fecha = null;
}

/*--------------------------------------------------MENSAJE TOASTIFY--------------------------------------------------*/

function mostrarMensaje(mensaje) {
	Toastify({
		text: mensaje + " 🛒",
		duration: 3500,
		style: {
			background: "linear-gradient(to right, #212F3C, #1F618D)",
			width: "20%",
		},
	}).showToast();
}

