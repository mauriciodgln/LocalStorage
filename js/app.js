// Variables

const formulario = document.querySelector('#formulario');
const listaNotas = document.querySelector('#lista-notas');
let notas = [];


// Event Listeners

eventListeners();

function eventListeners() {
  // Cuando el usuario agrega una nueva nota
  formulario.addEventListener('submit', agregarNota);
  // Cuando el documento está listo
  document.addEventListener('DOMContentLoaded', () => {
    notas = JSON.parse(localStorage.getItem('notas') || []);
    agregarHTML();
  });
}


// Funciones

function agregarNota(e) {
  e.preventDefault();
  
  // Textarea
  const nota = document.querySelector('#nota').value;
  if(nota === '') {
    mostrarError('Una nota no puede ir vacia');
    return; // Evita que se ejecuten más líneas de código siempre y cuando el if se encuentre en una función
  }

  // Añadir al arreglo de notas
  const notaObj = {
    id: Date.now(),
    nota // Es igual a nota: nota
  }

  notas = [...notas, notaObj];

  // Añadir el HTML de la nota

  agregarHTML();

  // Limpiar formulario / textarea

  formulario.reset();

}


function mostrarError(error) {
  const mensajeError = document.createElement('P');
  mensajeError.textContent = error;
  mensajeError.classList.add('error');
  // Insertarlo en el HTML
  const contenedorNota = document.querySelector('.contenedor-nota');
  contenedorNota.appendChild(mensajeError);

  // Eliminar alerta después de 3 segundos
  setTimeout( () => {
    mensajeError.remove()
  }, 3000);
}


function agregarHTML() {
  limpiarHTML();

  if(notas.length > 0) {
    notas.forEach( nota => {
      // Agregar botón de eliminar
      const btnEliminar = document.createElement('a');
      btnEliminar.textContent = 'X';
      btnEliminar.classList.add('borrar-nota');
      // Añadir función de eliminar
      btnEliminar.onclick = () => {
        borrarNota(nota.id);
      }

      // Crear HTML de nota
      const li = document.createElement('li');
      li.textContent = nota.nota;
      li.classList.add('margin-left');
      listaNotas.appendChild(li);
      // Agregar botón a nota
      li.appendChild(btnEliminar);
    });
  }

  notaLocalStorage();

}

// Agregar notas a local storage
function notaLocalStorage() {
  localStorage.setItem('notas', JSON.stringify(notas));
}

// Borrar nota
function borrarNota(id) {
  notas = notas.filter( nota => nota.id !== id );
  agregarHTML();
}


function limpiarHTML() {
  while(listaNotas.firstChild) {
    listaNotas.removeChild(listaNotas.firstChild);
  }
}