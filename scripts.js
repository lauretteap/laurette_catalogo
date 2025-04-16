// Función para abrir el modal con la imagen
function abrirModal(src) {
    console.log("Abriendo modal con imagen:", src);
    document.getElementById("modal").style.display = "flex";
    document.getElementById("imgModal").src = src;
}

function cerrarModal() {
    console.log("Cerrando modal");
    document.getElementById("modal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".tarjeta img").forEach(img => {
        img.addEventListener("click", function () {
            abrirModal(this.src);
        });
    });

    document.getElementById("modal").addEventListener("click", function (event) {
        if (event.target === this) {
            cerrarModal();
        }
    });
});

window.onload = function () {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
};

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".vista").scrollIntoView({ behavior: "instant" });
});

// Filtrar por categoría
function filtrarCategoria(categoria) {
    // Primero, quitar la clase 'active' de todos los botones
    const botones = document.querySelectorAll('.filtro');
    botones.forEach(boton => {
        boton.classList.remove('active');
    });

    // Luego, agregar la clase 'active' al botón que se ha clicado
    const botonSeleccionado = document.querySelector(`button[onclick="filtrarCategoria('${categoria}')"]`);
    botonSeleccionado.classList.add('active');

    // Ahora filtrar las tarjetas por categoría
    const tarjetas = document.querySelectorAll('.tarjeta');
    tarjetas.forEach(tarjeta => {
        if (categoria === 'todos') {
            tarjeta.style.display = 'block';
        } else if (tarjeta.getAttribute('data-categoria') === categoria) {
            tarjeta.style.display = 'block';
        } else {
            tarjeta.style.display = 'none';
        }
    });

    // Aplicar el filtro por precio (si hay)
    filtrarPorPrecio();
}

// Actualizar el rango de precio
function actualizarPrecio() {
    const valor = document.getElementById('rango-precio').value;
    document.getElementById('valor-precio').textContent = `Hasta $${valor}`;
    filtrarPorPrecio(); // Aplicamos el filtro de precio cada vez que el usuario cambia el slider
}

// Filtrar productos por precio
function filtrarPorPrecio() {
    const precioMaximo = document.getElementById('rango-precio').value;
    const tarjetas = document.querySelectorAll('.tarjeta');
    const categoriaSeleccionada = document.querySelector('button.active') ? document.querySelector('button.active').getAttribute('onclick').split("'")[1] : 'todos';

    tarjetas.forEach(tarjeta => {
        const precio = tarjeta.getAttribute('data-precio');
        const categoria = tarjeta.getAttribute('data-categoria');

        // Verifica que el producto esté dentro del rango de precio y categoría seleccionada
        if (precio <= precioMaximo && (categoriaSeleccionada === 'todos' || categoria === categoriaSeleccionada)) {
            tarjeta.style.display = 'block';
        } else {
            tarjeta.style.display = 'none';
        }
    });
    ordenarPorPrecio(); // Asegura que después de filtrar, los productos se ordenen
}

// Ordenar productos por precio
function ordenarPorPrecio(orden) {
    // Primero, quitar la clase 'active' de todos los botones de ordenar
    const botonesOrdenar = document.querySelectorAll('.ordenar-precio button');
    botonesOrdenar.forEach(boton => {
        boton.classList.remove('active');
    });

    // Luego, agregar la clase 'active' al botón que se ha clicado
    const botonSeleccionado = document.querySelector(`button[onclick="ordenarPorPrecio('${orden}')"]`);
    botonSeleccionado.classList.add('active');

    // Ordenar productos por precio
    const tarjetas = Array.from(document.querySelectorAll('.tarjeta'));
    const catalogo = document.querySelector('.catalogo');

    tarjetas.sort((a, b) => {
        const precioA = parseFloat(a.getAttribute('data-precio'));
        const precioB = parseFloat(b.getAttribute('data-precio'));

        if (orden === 'asc') {
            return precioA - precioB; // De menor a mayor
        } else {
            return precioB - precioA; // De mayor a menor
        }
    });

    // Reemplazar los productos en el catálogo con el nuevo orden
    tarjetas.forEach(tarjeta => {
        catalogo.appendChild(tarjeta); // Reemplazamos el hijo por el ordenado
    });
}
