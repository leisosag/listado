////// VARIABLES
const listaTareas = document.getElementById('lista-tareas');

////// EVENT LISTENERS
eventListeners();

function eventListeners() {
    document.querySelector('#formulario').addEventListener('submit', agregarTarea);
    listaTareas.addEventListener('click', borrarTarea);
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

/////// FUNCIONES
function agregarTarea(e) {
    e.preventDefault();

    const tarea = document.getElementById('tarea').value;
    const li = document.createElement('li');
    li.innerText = tarea;

    const bottonBorrar = document.createElement('a');
    bottonBorrar.classList = 'borrar-tarea';
    bottonBorrar.innerText = 'X';

    listaTareas.appendChild(li);
    li.appendChild(bottonBorrar);
    agregarTareaLocalStorage(tarea);
}

// elimina la tarea del DOM
function borrarTarea(e) {
    e.preventDefault();
    if(e.target.className === 'borrar-tarea') {
        e.target.parentElement.remove();
        borrarTareaLocalStorage(e.target.parentElement.innerText);
    }
}

// mostrar datos de local storage en la lista
function localStorageListo() {
    let tareas;
    tareas = obtenerTareasLocalStorage();

    tareas.forEach(function(tarea) {
        const bottonBorrar = document.createElement('a');
        bottonBorrar.classList = 'borrar-tarea';
        bottonBorrar.innerText = 'X';
        const li = document.createElement('li');
        li.innerText = tarea;
        listaTareas.appendChild(li);
        li.appendChild(bottonBorrar); 
    });
}

// agrega la tarea a local storage
function agregarTareaLocalStorage(tarea) {
    let tareas;
    tareas = obtenerTareasLocalStorage();
    tareas.push(tarea);
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// comprueba si hay elementos en local storage
function obtenerTareasLocalStorage () {
    let tareas;
    if(localStorage.getItem('tareas') === null) {
        tareas = [];
    } else {
        tareas = JSON.parse(localStorage.getItem('tareas'));
    }
    return tareas;
}

// elimina la nota de local storage
function borrarTareaLocalStorage(tarea) {
    let tareas, tareaBorrar;
    tareaBorrar = tarea.substring(0, tarea.length-1);
    tareas = obtenerTareasLocalStorage();
    tareas.forEach(function(tarea, index) {
        if(tareaBorrar === tarea) {
            tareas.splice(index, 1);
        }
    });
    localStorage.setItem('tareas', JSON.stringify(tareas));
}