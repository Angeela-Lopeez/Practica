// script.js

// URL de la API de Django (cambia esto si tu servidor está en otro puerto o dominio)
const apiUrl = 'http://localhost:8000/api/publicaciones/';

// Función para agregar una publicación
function agregarPublicacion(event) {
    event.preventDefault();  // Prevenir el envío del formulario por defecto

    const titulo = document.getElementById('titulo').value;
    const contenido = document.getElementById('contenido').value;

    if (!titulo || !contenido) {
        alert("Por favor completa los campos.");
        return;
    }

    // Enviar una solicitud POST para agregar una publicación
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            titulo: titulo,
            contenido: contenido,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Publicación agregada:', data);  // Ver la respuesta de la API
        // Limpiar los campos del formulario
        document.getElementById('titulo').value = '';
        document.getElementById('contenido').value = '';
        
        obtenerPublicaciones();  // Recargar las publicaciones
    })
    .catch(error => console.error('Error al agregar publicación:', error));
}

// Función para obtener las publicaciones
function obtenerPublicaciones() {
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const publicacionesList = document.getElementById('publicaciones-list');
        publicacionesList.innerHTML = '';  // Limpiar la lista antes de agregar las publicaciones

        data.forEach(publicacion => {
            const div = document.createElement('div');
            div.classList.add('publicacion');
            div.innerHTML = `
                <h3>${publicacion.titulo}</h3>
                <p>${publicacion.contenido}</p>
            `;
            publicacionesList.appendChild(div);
        });
    })
    .catch(error => console.error('Error al obtener publicaciones:', error));
}

// Agregar el evento al formulario para enviar los datos
const postForm = document.getElementById('post-form');
postForm.addEventListener('submit', agregarPublicacion);

// Cargar las publicaciones al inicio
document.addEventListener('DOMContentLoaded', obtenerPublicaciones);
