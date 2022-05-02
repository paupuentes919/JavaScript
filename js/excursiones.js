/*-------------------------- CARRITO COMPRAS -------------------------- */
const carrito = new Carrito(JSON.parse(localStorage.getItem("carrito")) || []);

//console.log(carrito.excursionesDisponibles.reduce((acc,element)=>acc+=element.precio,0));

/*-------------------------- BODY -------------------------- */
mostrarExcursionesDisponibles();
const modalInfo = document.querySelector("#modal-info");
const modalCarrito = document.querySelector("#modal-carrito");
let personas = 0;
let fecha = null ;
let precioActualizado = null;
//let excursionesSeleccionadasCarrito = traerExcursionesSeleccionadas();
/*-------------------------- FUNCIONES -------------------------- */
function mostrarExcursionesDisponibles() {
	// let contenedorCarritoCompras = document.getElementById(
	// 	"contenedorCarritoCompras"
	// );

	// if (contenedorCarritoCompras === null) {
	// 	contenedorCarritoCompras = document.createElement("div");
	// 	//SA
	// 	document.body.appendChild(contenedorCarritoCompras);
	// }

	let catalogoExcursiones = document.querySelector("#contenedor-excursiones");
	let cadena = "";
	//let nodoExcursiones = document.querySelector("#contenedor-excursiones");
	console.log("catalogo Excursiones", catalogoExcursiones);

	fetch('json/dataExcursiones.json')
		.then((resultado) => resultado.json())
		.then((dataExcursiones) => {
			dataExcursiones.forEach((excursion) => {
				cadena += traerInfo(excursion);
				catalogoExcursiones.innerHTML = cadena;
			})
		});
}

function traerInfo(exc) {
	return `
  <div class="thumbnail">
    <div class="image "><img class="undefined" src="${exc.imagenHomePage}"></div>
    <div class="caption">
        <div>
            <h3>${exc.tipoExcursion}</h3>
            <h4>${exc.localidad}</h4>    
        </div>
        <button class="btn btn-default" onclick="mostrarInfo('${exc.tipoExcursion}','${exc.localidad}', '${exc.descripcion}', '${exc.precioUnitario}','${exc.id}','${exc.imagenVintage}','${exc.horario}','${exc.incluye}')">Ver Excursión</button>
    </div>
</div>`;
}

function mostrarCarritoCompras() {
	let seccionCompras = document.getElementById("contenedorCarritoCompras");
	let nodoCarritoCompras = document.getElementById("carritoCompras");
	if (nodoCarritoCompras === null) {
		nodoCarritoCompras = document.createElement("div");
		//SA
		console.log("Mostrar Articulos", nodoCarritoCompras);
		seccionCompras.appendChild(nodoCarritoCompras);
	}
	//actualizarCarritoCompras();
}

// function actualizarCarritoCompras() {
// 	let nodoCarritoCompras = document.getElementById("carritoCompras");
// 	nodoCarritoCompras.innerHTML = "";
// 	let excursionesActualizadas = carrito.excursionesDisponibles;
// 	console.log("excursiones actualizadas", excursionesActualizadas); //me muestra undefined
// 	//falta, pero se me esta complicando porque no me esta trayendo nada
// }

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

// function agregarExcursionesAlCarrito(excursionId) {
// 	let excursionSeleccionada = excursionesDisponibles.map(
// 		(elemento) => elemento.id
// 	);
// 	let index = excursionSeleccionada.findIndex(
// 		(elemento) => elemento === excursionId
// 	);
// 	let excursiones = excursionesDisponibles[index];
// 	// console.log(excursiones);
// 	//Me trae el articulo que selecciono --> OK
// 	//carrito.agregarExcursionesAlCarrito(excursiones); //falla cuando quiero hacer el push para que me cree el articulo en el objeto personalizado no se porque. Tampoco me esta tomando el reduce ni el append o el appendChild
// 	//carrito.guardar();
// 	//actualizarCarritoCompras();
// }

function actualizarStorage(array) {
	localStorage.setItem("carrito", JSON.stringify(array));
}

function test(a) {
	console.log(a);
}

function mostrarInfo(tipo, localidad, descripcion, precio, id, imagenVintage, horario, incluye) {
	modalInfo.toggleAttribute("open");


	modalInfo.innerHTML = `
  		<div class="container">
        	<img src="${imagenVintage}" class="fotos-vintage" alt="${tipo}" />
				<h1 class="texto-vintage-titulo texto-foto">${tipo}</h1>
				<p class="texto-vintage-localidad">${localidad}</p>
			<section class="contenedor-informacion">
				<div>
					<p class="informacion-excursiones">Información</p>
        			<p>${descripcion}</p>
					<p class="informacion-excursiones">Incluye</p>
					<p>${incluye}</p>
					<p class="informacion-excursiones">Precio Unitario</p>
					<p>$ ${precio}</p>
				</div>
        		<div> 
					<div class="texto-foto">
						<p class="informacion-excursiones"> Datos a completar</p>
        				<div class="fecha-realizacion">Fecha de realización
							<input type="date" class="modal-recuadro" id="myDate" onchange="actualizarFecha(event)"/>
						</div>
						<div class="horario">Horario de la excursión
							<p class="horario2">${horario}</p>
						</div>
						
						<div class="fecha-realizacion">Cantidad de Personas
							<input type="number" min="1" value="0" placeholder="Cantidad de personas" name="personas" id="selectorPersonas" data-id="${id}" class="modal-recuadro" oninput="actualizarPrecio(event)" />
						</div>
						<div class="precio-total">Precio Total: $<span id="precioTotal">0</span></div>
					</div>
				</div>
			</section>
		
				<button disabled title="Seleccione una fecha de realización y/o cantidad de personas" id="btnAgregar" class="btn btn-default btn-title" onclick="modalInfo.toggleAttribute('open');agregarExcursion(${id});agregadoAlCarritoMensaje();">Agregar al carrito</button>
				<button class="btn btn-default" onclick="modalInfo.toggleAttribute('open'); borrarCache();">cancelar</button>

		</div>
  `;
}



function mostrarCarrito() {
	modalCarrito.toggleAttribute("open");
	carrito.excursionesSeleccionadas.forEach((exc) => {
		let count= 0;
		let card = document.createElement("div");
		card.innerHTML = `
		<div class="container">
		<p class="text-titulo-carrito">Mi Carrito de Compras</p>
		<h1 class="">${exc.tipoExcursion}</h1>
		<div>
		<img src="${exc.imagenHomePage}" class="imagen-chica">
		<h4>${exc.localidad}</h4>
		<h4>${exc.precioTotal}</h4>
		<h5>${carrito.precioTotal}</h5>
		</div>
		</div>
		`;
		modalCarrito.appendChild(card);
		count++;
		console.log("Llamado" + count + ' ' + card);
	});	
}


function agregarExcursion(idExcusrsion) {
	carrito.agregar(idExcusrsion, personas, fecha);
}

function actualizarPrecio(event) {
	personas = event.target.value; 
	let total;

	if(fecha!= null)
		habilitarBoton();

	fetch('json/dataExcursiones.json')
		.then((resultado) => resultado.json())
		.then((dataExcursiones) => {
			dataExcursiones.find((excursion) => {
				if (excursion.id == event.target.dataset.id){
					total = personas * excursion.precioUnitario;
					document.querySelector("#precioTotal").innerHTML = total;
				}		
			})
	});	
}

function actualizarFecha(event) {
	fecha = event.target.value;
	if(personas != 0)
		habilitarBoton();
}

function habilitarBoton() {
	document.querySelector("#btnAgregar").removeAttribute("disabled");
	document
		.querySelector("#btnAgregar")
		.setAttribute("title", "Agregar al carrito");

	agregadoAlCarritoMensaje();
}

function agregadoAlCarritoMensaje() {
	let btns = document.querySelector("#btnAgregar");
	btns.addEventListener("click", () => {
		Toastify({
			text: "Agregado al carrito 🛒",
			duration: 3500,
			style:{
				background: "linear-gradient(to right, #212F3C, #1F618D)",
				width:"20%",
			}
		}).showToast();
	})
}
function borrarCache(){
	personas=0;
	fecha=null;
}