/*--------------------------------------------------DECLARACION DE VARIABLES--------------------------------------------------*/

const modalInfo = document.querySelector("#modal-info");
const modalCarrito = document.querySelector("#modal-carrito");
const containerCarrito = document.querySelector("#informacion-excursiones");
const btnComprar = document.querySelector("#btn-comprar");
const carritoTotal = document.querySelector(".cart-total");
let catalogoExcursiones = document.querySelector("#contenedor-excursiones");
let toggleCarrito = document.querySelector("#btnCarrito");

/*--------------------------------------------------MOSTRAR CARRITO--------------------------------------------------*/

toggleCarrito.addEventListener("click", () => {
	modalCarrito.toggleAttribute("open");
	if (modalCarrito.attributes.open) return mostrarCarrito();
});

function mostrarCarrito() {
	carritoTotal.innerHTML = carrito.calcularTotal();
	containerCarrito.innerHTML = "";

	carrito.excursionesSeleccionadas.forEach((exc) => {
		let card = document.createElement("div");
		card.innerHTML = `
			<section class="container info-carrito">
				<h1 class="titulo-excursiones-carrito">${exc.tipoExcursion}</h1>
				<div class="conjunto-excursiones-carrito">
					<img src="${exc.imagenHomePage}" class="imagen-chica">
					<div class="row">
						<h4 class="info-excursiones-carrito">Fecha de Realización: ${exc.fecha}</h4>
						<h4 class="info-excursiones-carrito">Cantidad de Personas: ${exc.personas}</h4>	
						<h4 class="info-excursiones-carrito precio-total-carrito">Precio Total: ${exc.precioTotal}</h4>
					</div>
					<button onclick="eliminarExcursion(${exc.id})" class="fa-solid fa-trash-can btn-carrito"></button>
				</div>	
				<h4>${exc.localidad}</h4>
			<section>
			`;
		containerCarrito.appendChild(card);
	});
}

/*--------------------------------------------------BOTON COMPRAR--------------------------------------------------*/

btnComprar.addEventListener("click", () => {
    Swal.fire({
        icon: 'success',
        title: 'Tu compra ha sido realizada',
        showConfirmButton: true,
        width: '50rem',
      })

});

function habilitarBotonCompra(){
    btnComprar.removeAttribute("disabled");

}
function deshabilitarBotonCompra(){
    btnComprar.setAttribute("disabled","");
}

/*--------------------------------------------------BOTON AGREGAR AL CARRITO--------------------------------------------------*/

function habilitarBotonExcursion() {
	const btnAgregar = document.querySelector("#btnAgregar");
	btnAgregar.removeAttribute("disabled");
	btnAgregar.setAttribute("title", "Agregar al carrito");
}

/*--------------------------------------------------GRILLA DE EXCURSIONES--------------------------------------------------*/

function crearCard(exc) {
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

/*--------------------------------------------------CARD EXCURSION INDIVIDUAL--------------------------------------------------*/

function mostrarInfo(
	tipo,
	localidad,
	descripcion,
	precio,
	id,
	imagenVintage,
	horario,
	incluye
) {
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
		
				<button disabled title="Seleccione una fecha de realización y/o cantidad de personas" id="btnAgregar" class="btn btn-default btn-title" onclick="agregarExcursion(${id})">Agregar al carrito</button>
				<button class="btn btn-default" onclick="modalInfo.toggleAttribute('open'); borrarCache();">cancelar</button>

		</div>
  `;
}