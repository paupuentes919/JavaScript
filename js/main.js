const carrito = new Carrito(JSON.parse(localStorage.getItem("carrito")) || []);

let personas = 0;
let fecha = null;
let precioActualizado = null;

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

function seleccionarCantidadPersonas() {
	let cantidadPersonas = null;
	while (isNaN(cantidadPersonas) || cantidadPersonas < 1) {
		cantidadPersonas = prompt(
			"Cuantas personas van a realizar esta excursion?"
		);
	}
	return cantidadPersonas;
}

function calcularPrecioTotal(cantidad, precio) {
	return (precioTotal = cantidad * precio);
}

function actualizarStorage(array) {
	localStorage.setItem("carrito", JSON.stringify(array));
}

function agregarExcursion(idExcusrsion) {
	carrito.agregar(idExcusrsion, personas, fecha);
	modalInfo.toggleAttribute("open");
	mostrarMensaje("Agregado al carrito");

	// espero al fetch del carrito
	setTimeout(() => {
		mostrarCarrito();
	}, 10);
}

function eliminarExcursion(idExcusrsion) {
	carrito.eliminar(idExcusrsion);
	mostrarMensaje("Quitado del carrito");
	mostrarCarrito();
}

function actualizarPrecio(event) {
	personas = event.target.value;
	let total;

	if (fecha != null) habilitarBoton();

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
	if (personas != 0) habilitarBoton();
}

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

function borrarCache() {
	personas = 0;
	fecha = null;
}