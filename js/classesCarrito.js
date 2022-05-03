class Carrito {
	constructor(excursionesSeleccionadas) {
		this.excursionesSeleccionadas = excursionesSeleccionadas;
		this.precioTotal = 0;
		
	}

	agregar(idSeleccionada, personasSeleccionadas, fechaSeleccionada) {
		console.log(idSeleccionada, personasSeleccionadas, fechaSeleccionada);
		let index;

		fetch('json/dataExcursiones.json')
		.then((resultado) => resultado.json())
		.then((dataExcursiones) => {
			dataExcursiones.find((excursion) => {
				if (excursion.id === idSeleccionada){
					excursion.fecha = fechaSeleccionada;
					excursion.personas = Number(personasSeleccionadas);
					excursion.precioTotal = excursion.personas * excursion.precioUnitario;
					console.log(excursion);	
					this.excursionesSeleccionadas.push(excursion);
					this.calcularTotal();
					actualizarStorage(this.excursionesSeleccionadas);
				}		
			})
		});	

		

		// // TODO
		// if (index < 0) return alert("Esa excursion no existe");

		//let excursion = JSON.parse(JSON.stringify(excursionesDisponibles[index]));

	
		
	}

	eliminar(idSeleccionada) {
		let index = this.excursionesSeleccionadas.findIndex(
			(excursion) => excursion.id === idSeleccionada
		);

		this.excursionesSeleccionadas.splice(index, 1);
		this.calcularTotal();
		actualizarStorage(this.excursionesSeleccionadas);
	}

	calcularTotal() {
		const carritoTotal = document.querySelector('.cart-total');
		let total = 0;

		this.excursionesSeleccionadas.forEach((excursion) => {
			total = total + excursion.precioTotal;
			carritoTotal.innerHTML = total;
		});

		this.precioTotal = total;
		//carritoTotal.appendChild(total);
	}
}