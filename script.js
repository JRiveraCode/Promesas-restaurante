const estatusPedido = () => {
    return  Math.random() < 0.8;
};

const contentInfo = document.getElementById("content-info");

// Marcar platillo seleccionado cambiando color del label
const menuList = document.getElementById('menu-list');
const checkboxes = menuList.querySelectorAll('input[type="checkbox"]');
const labels = menuList.querySelectorAll('label');

checkboxes.forEach((checkbox, i) => {
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            labels[i].style.background = '#ff3c3c';
            labels[i].style.color = '#fff';
        } else {
            labels[i].style.background = '';
            labels[i].style.color = '';
        }
    });
});

// Simulación de procesos con Promesas
function realizarPedido(seleccionados) {
    return new Promise((resolve) => {
        document.getElementById('order-status').textContent = 'Pedido realizado: ' + seleccionados.join(', ');
        setTimeout(() => resolve(), 1000);
    });
}
function cocinarPedido() {
    return new Promise((resolve) => {
        document.getElementById('kitchen-status').textContent = 'En cocina...';
        setTimeout(() => resolve(), 1500);
    });
}
function entregarPedido() {
    return new Promise((resolve) => {
        const estado = estatusPedido() ? '¡Listo para entregar!' : 'Hubo un problema en la entrega vuelve a intentar';
        document.getElementById('delivery-status').textContent = estado;
        setTimeout(() => resolve(estado), 1200);
    });
}

// Diccionario de imágenes para cada platillo
const imagenesPlatillos = {
    'Pizza': 'img/pizza.jpeg',
    'Hamburguesa': 'img/hamburguesa.jpeg',
    'Ensalada': 'img/ensalada.jpeg',
    'Pasta': 'img/pasta.jpg',
    'Sushi': 'img/sushi.webp'
};

function mostrarPedidosRealizados(seleccionados, mensaje) {
    const contentImage = document.getElementById('content-image');
    contentImage.innerHTML = '';
    const contenedor = document.createElement('div');
    contenedor.className = 'pedido-imagenes';
    seleccionados.forEach(nombre => {
        const img = document.createElement('img');
        img.src = imagenesPlatillos[nombre] || '';
        img.alt = nombre;
        img.title = nombre;
        contenedor.appendChild(img);
    });
    contentImage.appendChild(contenedor);
    if (mensaje) {
        const msg = document.createElement('div');
        msg.className = 'mensaje-entregado';
        msg.textContent = mensaje;
        contentImage.appendChild(msg);
    }
}

// Acción al presionar el botón de pedido
const orderButton = document.getElementById('order-button');
orderButton.addEventListener('click', async function() {
    const seleccionados = [];
    checkboxes.forEach((checkbox, i) => {
        if (checkbox.checked) {
            seleccionados.push(labels[i].textContent);
        }
    });
    if (seleccionados.length === 0) {
        alert('Por favor selecciona al menos un platillo.');
        return;
    }
    await realizarPedido(seleccionados);
    await cocinarPedido();
    const estadoEntrega = await entregarPedido();
    mostrarPedidosRealizados(seleccionados, estadoEntrega === '¡Listo para entregar!' ? '¡Pedido entregado!' : 'Hubo un problema en la entrega vuelve a intentar');
});



