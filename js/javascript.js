// Variables globales //
var idPlatos = 0;

// Al cargar la ventana generamos todos los elementos de la página //
window.onload = function() {
	generarTitulo();
	generarFormulario();
	generarPlatosStorage();

	// A la espera para cuando pulsemos el boton enter //
	document.getElementById('inputIngrediente').addEventListener(
		'keypress',
		function() {
			teclaEnter(event);
		},
		false
	);
};

// Función para generar la cabecera de la página //
function generarTitulo() {
	var contenedor = document.getElementById('contenedor');
	var titulo = document.createElement('h1');
	titulo.setAttribute('id', 'tituloCabecera');
	contenedor.appendChild(titulo);
}

function generarFormulario() {
	var contenedor = document.getElementById('contenedor');
	var form = document.createElement('form');
	form.setAttribute('autocomplete', 'on');
	form.setAttribute('name', 'menu');
	contenedor.appendChild(form);

	// Generamos los botones para elegir el color que le daremos al plato//
	// Por defecto tenemos seleccionado el rojo //
	var inputColor1 = document.createElement('input');
	inputColor1.setAttribute('name', 'inputColors');
	inputColor1.setAttribute('type', 'radio');
	inputColor1.setAttribute('id', 'inputColorRojo');
	inputColor1.setAttribute('class', 'botonesColores');
	inputColor1.setAttribute('value', '#D63C3C');
	inputColor1.setAttribute('checked', 'checked');
	form.appendChild(inputColor1);

	var inputColor2 = document.createElement('input');
	inputColor2.setAttribute('name', 'inputColors');
	inputColor2.setAttribute('type', 'radio');
	inputColor2.setAttribute('id', 'inputColorAzul');
	inputColor2.setAttribute('class', 'botonesColores');
	inputColor2.setAttribute('value', '#8A9AF6');
	form.appendChild(inputColor2);

	var inputColor3 = document.createElement('input');
	inputColor3.setAttribute('name', 'inputColors');
	inputColor3.setAttribute('type', 'radio');
	inputColor3.setAttribute('id', 'inputColorVerde');
	inputColor3.setAttribute('class', 'botonesColores');
	inputColor3.setAttribute('value', '#90F27D');
	form.appendChild(inputColor3);

	var inputColor4 = document.createElement('input');
	inputColor4.setAttribute('name', 'inputColors');
	inputColor4.setAttribute('type', 'radio');
	inputColor4.setAttribute('id', 'inputColorAmarillo');
	inputColor4.setAttribute('class', 'botonesColores');
	inputColor4.setAttribute('value', '#F6F964');
	form.appendChild(inputColor4);

	form.innerHTML += '</br>';

	// Generemos el textBox donde introducimos los nuevos platos //
	var inputIngrediente = document.createElement('input');
	inputIngrediente.setAttribute('name', 'inputIngrediente');
	inputIngrediente.setAttribute('type', 'text');
	inputIngrediente.setAttribute('id', 'inputIngrediente');
	inputIngrediente.setAttribute('placeholder', 'Introduce aquí un nuevo plato');
	form.appendChild(inputIngrediente);

	form.innerHTML += '</br>';

	// Generamos mediante Javascript los botones para editar nuestros platos //
	var contenedorBotones = document.createElement('div');
	contenedorBotones.setAttribute('id', 'contenedorBotones');
	form.appendChild(contenedorBotones);

	var botonAñadir = document.createElement('input');
	botonAñadir.setAttribute('type', 'button');
	botonAñadir.setAttribute('id', 'botonAñadir');
	botonAñadir.setAttribute('class', 'botonesOpciones');
	contenedorBotones.appendChild(botonAñadir);
	botonAñadir.addEventListener('click', generarPlato, false);

	var botonEliminar = document.createElement('input');
	botonEliminar.setAttribute('type', 'button');
	botonEliminar.setAttribute('id', 'botonEliminar');
	botonEliminar.setAttribute('class', 'botonesOpciones');
	contenedorBotones.appendChild(botonEliminar);
	botonEliminar.addEventListener('click', borrarPlatos, false);

	var botonTachar = document.createElement('input');
	botonTachar.setAttribute('type', 'button');
	botonTachar.setAttribute('id', 'botonTachar');
	botonTachar.setAttribute('class', 'botonesOpciones');
	contenedorBotones.appendChild(botonTachar);
	botonTachar.addEventListener('click', tacharPlatos, false);

	var botonDestachar = document.createElement('input');
	botonDestachar.setAttribute('type', 'button');
	botonDestachar.setAttribute('id', 'botonDestachar');
	botonDestachar.setAttribute('class', 'botonesOpciones');
	contenedorBotones.appendChild(botonDestachar);
	botonDestachar.addEventListener('click', quitarTachadoPlatos, false);

	var botonQuitarSeleccion = document.createElement('input');
	botonQuitarSeleccion.setAttribute('type', 'button');
	botonQuitarSeleccion.setAttribute('id', 'botonQuitarSeleccion');
	botonQuitarSeleccion.setAttribute('class', 'botonesOpciones');
	contenedorBotones.appendChild(botonQuitarSeleccion);
	botonQuitarSeleccion.addEventListener('click', quitarSeleccionPlatos, false);

	var botonSeleccionarTodos = document.createElement('input');
	botonSeleccionarTodos.setAttribute('type', 'button');
	botonSeleccionarTodos.setAttribute('id', 'botonSeleccionarTodos');
	botonSeleccionarTodos.setAttribute('class', 'botonesOpciones');
	contenedorBotones.appendChild(botonSeleccionarTodos);
	botonSeleccionarTodos.addEventListener('click', seleccionarTodosPlatos, false);

	var botonReordenar = document.createElement('input');
	botonReordenar.setAttribute('type', 'button');
	botonReordenar.setAttribute('id', 'botonReordenar');
	botonReordenar.setAttribute('class', 'botonesOpciones');
	contenedorBotones.appendChild(botonReordenar);
	botonReordenar.addEventListener('click', ordenarTodosPlatos, false);

	var contenedorPlatos = document.createElement('div');
	contenedorPlatos.setAttribute('id', 'contenedorPlatos');
	form.appendChild(contenedorPlatos);
}

// Función para crear los platos que el usuario nos introduce //
function generarPlato() {
	idPlatos = localStorage.getItem('idPlatos');
	if (idPlatos == null) {
		idPlatos = 0;
	}
	idPlatos++;
	var contenedorPlatos = document.getElementById('contenedorPlatos');
	var color = document.menu.inputColors.value;
	var nombrePlato = document.menu.inputIngrediente.value;

	if (nombrePlato != '') {
		var platoComida = document.createElement('label');
		platoComida.setAttribute('for', 'Plato' + idPlatos);
		contenedorPlatos.appendChild(platoComida);

		var inputPlato = document.createElement('input');
		inputPlato.setAttribute('type', 'checkbox');
		inputPlato.setAttribute('name', 'checkPlato');
		inputPlato.setAttribute('id', 'Plato' + idPlatos);
		platoComida.appendChild(inputPlato);

		var spanPlato = document.createElement('span');
		spanPlato.textContent = nombrePlato;
		platoComida.appendChild(spanPlato);

		platoComida.style.backgroundColor = color;

		var PlatoNuevo = [idPlatos, nombrePlato, color];
		localStorage.setItem('Plato' + idPlatos, JSON.stringify(PlatoNuevo));

		localStorage.setItem('idPlatos', idPlatos);

		document.getElementById('inputIngrediente').value = '';
	} else {
		alert('No has introducido ningún plato.');
	}
}

// Función para borrar los platos seleccionados //
function borrarPlatos() {
	platosSeleccionados = document.querySelectorAll("input[type='checkbox']:checked");

	if (platosSeleccionados.length == 0) {
		alert('No has seleccionado ningún plato');
	} else {
		for (i = 0; i < platosSeleccionados.length; i++) {
			plato = platosSeleccionados[i].parentNode;
			plato.parentNode.removeChild(plato);
			idPlatoStorage = platosSeleccionados[i].id;
			localStorage.removeItem(idPlatoStorage);
		}
	}
	RegenarIdStorage();
}

// Funcoón para tachar los platos seleccionados //
function tacharPlatos() {
	platosSeleccionados = document.querySelectorAll("input[type='checkbox']:checked");

	if (platosSeleccionados.length == 0) {
		alert('No has seleccionado ningún plato');
	} else {
		for (i = 0; i < platosSeleccionados.length; i++) {
			plato = platosSeleccionados[i].nextSibling;
			plato.style.textDecoration = 'line-through';
		}
	}
}

// Función para quitar el tachado a los platos seleccionados //
function quitarTachadoPlatos() {
	platosSeleccionados = document.querySelectorAll("input[type='checkbox']:checked");

	if (platosSeleccionados.length == 0) {
		alert('No has seleccionado ningún plato');
	} else {
		for (i = 0; i < platosSeleccionados.length; i++) {
			plato = platosSeleccionados[i].nextSibling;
			plato.style.textDecoration = 'none';
		}
	}
}

// Función para quitar selección a todos los platos //
function quitarSeleccionPlatos() {
	platosSeleccionados = document.querySelectorAll("input[type='checkbox']:checked");

	if (platosSeleccionados.length == 0) {
		alert('No has seleccionado ningún plato');
	} else {
		for (i = 0; i < platosSeleccionados.length; i++) {
			plato = platosSeleccionados[i];
			plato.click();
		}
	}
}

// Función para seleccionar todos los platos //
function seleccionarTodosPlatos() {
	platosSeleccionados = document.querySelectorAll("input[type='checkbox']");

	if (platosSeleccionados.length == 0) {
		alert('No has seleccionado ningún plato');
	} else {
		for (i = 0; i < platosSeleccionados.length; i++) {
			plato = platosSeleccionados[i];
			plato.checked = true;
		}
	}
}

// Función para ordenar los platos por color //
// Sé que es feo, pero función //
// REFACTORIZAR //
function ordenarTodosPlatos() {
	platosSeleccionados = document.querySelectorAll("input[type='checkbox']");
	for (i = 0; i < platosSeleccionados.length; i++) {
		plato = platosSeleccionados[i].parentNode;
		plato.parentNode.removeChild(plato);
	}
	idPlatos = localStorage.getItem('idPlatos');
	if (idPlatos != null) {
		idPlatos++;
		for (i = 1; i < idPlatos; i++) {
			var contenedorPlatos = document.getElementById('contenedorPlatos');
			var ArrayPlato = localStorage.getItem('Plato' + i);
			ArrayPlato = JSON.parse(ArrayPlato);
			if (ArrayPlato != null) {
				var nombrePlato = ArrayPlato[1].toString();
				var color = ArrayPlato[2].toString();
				if (color == '#D63C3C') {
					var platoComida = document.createElement('label');
					platoComida.setAttribute('for', 'Plato' + i);
					contenedorPlatos.appendChild(platoComida);

					var inputPlato = document.createElement('input');
					inputPlato.setAttribute('type', 'checkbox');
					inputPlato.setAttribute('name', 'checkPlato');
					inputPlato.setAttribute('id', 'Plato' + i);
					platoComida.appendChild(inputPlato);

					var spanPlato = document.createElement('span');
					spanPlato.textContent = nombrePlato;
					platoComida.appendChild(spanPlato);

					platoComida.style.backgroundColor = color;
				}
			}
		}
		for (i = 1; i < idPlatos; i++) {
			var contenedorPlatos = document.getElementById('contenedorPlatos');
			var ArrayPlato = localStorage.getItem('Plato' + i);
			ArrayPlato = JSON.parse(ArrayPlato);
			if (ArrayPlato != null) {
				var nombrePlato = ArrayPlato[1].toString();
				var color = ArrayPlato[2].toString();
				if (color == '#8A9AF6') {
					var platoComida = document.createElement('label');
					platoComida.setAttribute('for', 'Plato' + i);
					contenedorPlatos.appendChild(platoComida);

					var inputPlato = document.createElement('input');
					inputPlato.setAttribute('type', 'checkbox');
					inputPlato.setAttribute('name', 'checkPlato');
					inputPlato.setAttribute('id', 'Plato' + i);
					platoComida.appendChild(inputPlato);

					var spanPlato = document.createElement('span');
					spanPlato.textContent = nombrePlato;
					platoComida.appendChild(spanPlato);

					platoComida.style.backgroundColor = color;
				}
			}
		}
		for (i = 1; i < idPlatos; i++) {
			var contenedorPlatos = document.getElementById('contenedorPlatos');
			var ArrayPlato = localStorage.getItem('Plato' + i);
			ArrayPlato = JSON.parse(ArrayPlato);
			if (ArrayPlato != null) {
				var nombrePlato = ArrayPlato[1].toString();
				var color = ArrayPlato[2].toString();
				if (color == '#90F27D') {
					var platoComida = document.createElement('label');
					platoComida.setAttribute('for', 'Plato' + i);
					contenedorPlatos.appendChild(platoComida);

					var inputPlato = document.createElement('input');
					inputPlato.setAttribute('type', 'checkbox');
					inputPlato.setAttribute('name', 'checkPlato');
					inputPlato.setAttribute('id', 'Plato' + i);
					platoComida.appendChild(inputPlato);

					var spanPlato = document.createElement('span');
					spanPlato.textContent = nombrePlato;
					platoComida.appendChild(spanPlato);

					platoComida.style.backgroundColor = color;
				}
			}
		}
		for (i = 1; i < idPlatos; i++) {
			var contenedorPlatos = document.getElementById('contenedorPlatos');
			var ArrayPlato = localStorage.getItem('Plato' + i);
			ArrayPlato = JSON.parse(ArrayPlato);
			if (ArrayPlato != null) {
				var nombrePlato = ArrayPlato[1].toString();
				var color = ArrayPlato[2].toString();
				if (color == '#F6F964') {
					var platoComida = document.createElement('label');
					platoComida.setAttribute('for', 'Plato' + i);
					contenedorPlatos.appendChild(platoComida);

					var inputPlato = document.createElement('input');
					inputPlato.setAttribute('type', 'checkbox');
					inputPlato.setAttribute('name', 'checkPlato');
					inputPlato.setAttribute('id', 'Plato' + i);
					platoComida.appendChild(inputPlato);

					var spanPlato = document.createElement('span');
					spanPlato.textContent = nombrePlato;
					platoComida.appendChild(spanPlato);

					platoComida.style.backgroundColor = color;
				}
			}
		}
	}
}

// Función para generar los platos almacenados en localStorage //
function generarPlatosStorage() {
	idPlatos = localStorage.getItem('idPlatos');
	if (idPlatos == null) {
		idPlatos = 0;
	} else {
		idPlatos++;
		for (i = 1; i < idPlatos; i++) {
			var contenedorPlatos = document.getElementById('contenedorPlatos');
			var ArrayPlato = localStorage.getItem('Plato' + i);
			ArrayPlato = JSON.parse(ArrayPlato);
			if (ArrayPlato != null) {
				var nombrePlato = ArrayPlato[1].toString();
				var color = ArrayPlato[2].toString();
				if (nombrePlato != '') {
					var platoComida = document.createElement('label');
					platoComida.setAttribute('for', 'Plato' + i);
					contenedorPlatos.appendChild(platoComida);

					var inputPlato = document.createElement('input');
					inputPlato.setAttribute('type', 'checkbox');
					inputPlato.setAttribute('name', 'checkPlato');
					inputPlato.setAttribute('id', 'Plato' + i);
					platoComida.appendChild(inputPlato);

					var spanPlato = document.createElement('span');
					spanPlato.textContent = nombrePlato;
					platoComida.appendChild(spanPlato);

					platoComida.style.backgroundColor = color;
				}
			}
		}
	}
}

// Borrar el id del local Storage en el caso de que borremos todos los platos //
function RegenarIdStorage() {
	idPlatos = localStorage.getItem('idPlatos');
	contador = 1;
	if (idPlatos == null) {
		idPlatos = 0;
	} else {
		for (i = 1; i < idPlatos; i++) {
			var ArrayPlato = localStorage.getItem('Plato' + i);
			ArrayPlato = JSON.parse(ArrayPlato);
			if (ArrayPlato == null) {
				contador++;
			}
		}
		if (idPlatos == contador) {
			localStorage.removeItem('idPlatos');
		}
	}
}

// Función que recibe la tecla pulsada, si es enter(13), genera el plato //
function teclaEnter(e) {
	if (e.keyCode === 13) {
		e.preventDefault();
		generarPlato();
	}
}

// AUTOR : OMAR HERNÁNDEZ REYES //
