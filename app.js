// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let amigos = [];

// Normaliza el nombre (quita espacios y lo convierte en minúsculas)
function normalizarNombre(nombre) {
    return nombre.trim().toLowerCase();
}

// Guardar y cargar en localStorage // sugenrencia de la IA ChatGPT lo aguegue porque me parecio util
function guardarStorage() {
    localStorage.setItem('amigos', JSON.stringify(amigos));
}

function cargarStorage() {
    const data = localStorage.getItem('amigos');
    if (data) {
        try {
            amigos = JSON.parse(data);
        } catch (e) {
            amigos = [];
        }
    }
}

function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim();

    if (nombre === '') {
        alert('Por favor, escribe un nombre válido.');
        return;
    }

    const nombreNorm = normalizarNombre(nombre);
    if (amigos.some(a => normalizarNombre(a) === nombreNorm)) {
        alert('Ese nombre ya está en la lista.');
        return;
    }

    amigos.push(nombre);
    input.value = '';
    actualizarLista();
    guardarStorage();
}

function actualizarLista() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';

    if (amigos.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No hay amigos agregados aún.';
        li.className = 'empty';
        lista.appendChild(li);
    } else {
        amigos.forEach((amigo) => {
            const li = document.createElement('li');
            li.textContent = amigo;
            lista.appendChild(li);
        });
    }

    // Controlar estado de botones
    document.getElementById('drawBtn').disabled = amigos.length === 0;
    document.getElementById('clearBtn').disabled = amigos.length === 0;
}

function sortearAmigo() {
    const resultado = document.getElementById('resultado');

    if (!Array.isArray(amigos) || amigos.length === 0) {
        resultado.innerHTML = '<li>Primero agrega al menos un nombre.</li>';
        return;
    }

    const indice = Math.floor(Math.random() * amigos.length);
    const seleccionado = amigos[indice];

    resultado.innerHTML = '';
    const li = document.createElement('li');
    li.textContent = `Tu amigo secreto es: ${seleccionado}`;
    resultado.appendChild(li);
}

function limpiarLista() {
    if (!confirm('¿Estás seguro que quieres limpiar la lista?')) return;
    amigos = [];
    localStorage.removeItem('amigos');
    document.getElementById('resultado').innerHTML = '';
    actualizarLista();
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    cargarStorage();
    actualizarLista();

    // Listeners
    document.getElementById('addBtn').addEventListener('click', agregarAmigo);
    document.getElementById('drawBtn').addEventListener('click', sortearAmigo);
    document.getElementById('clearBtn').addEventListener('click', limpiarLista);

    // Enter en input
    document.getElementById('amigo').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') agregarAmigo();
    });
});

