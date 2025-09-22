const estatusPedido = () => {
    return  Math.random() < 0.6;
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

const entregaBebida = new Promise((resolve) => {
    setTimeout(() => resolve('Bebida entregada'), 2000);
});

const realizarPedido = (seleccionados) => {
    return new Promise((resolve) => {
        document.getElementById('order-status').textContent = 'Pedido realizado: ' + seleccionados.join(', ');
        setTimeout(() => resolve(), 1000);
    });
}

const cocinarPedido = () => {
    return new Promise((resolve) => {
        document.getElementById('kitchen-status').textContent = 'En cocina...';
        setTimeout(() => resolve(), 1500);
    });
}

const entregarPostre = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve('Postre entregado'), 1500);
    });
};

const entregarPedido = () => {
    return new Promise((resolve) => {
        const estado = estatusPedido() ? '¡Listo para entregar!' : 'Hubo un problema en la entrega vuelve a intentar';
        document.getElementById('delivery-status').textContent = estado;
        setTimeout(() => resolve(estado), 2000);
    });
}


// Diccionario de imágenes para cada platillo
const imagenesPlatillos = {
    'Bebida': 'img/bebida.jpg',
    'Pizza': 'img/pizza.jpeg',
    'Hamburguesa': 'img/hamburguesa.jpeg',
    'Ensalada': 'img/ensalada.jpeg',
    'Pasta': 'img/pasta.jpg',
    'Sushi': 'img/sushi.webp',
    'Postre': 'img/postre.webp'
};

const mostrarPedidosRealizados = (seleccionados, mensaje) => {
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

    try {

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
    
        // Clasificar
        const bebida = seleccionados.filter(selec => selec === 'Bebida');
    
        const platillos = seleccionados.filter(selec => 
            ['Pizza', 'Hamburguesa', 'Ensalada', 'Pasta', 'Sushi'].includes(selec)
        );
    
        const postre = seleccionados.filter(selec => selec === 'Postre');
    
        // Mostrar en orden
        const ordenFinal = [...bebida, ...platillos, ...postre];
    
        await realizarPedido(ordenFinal);
        
        if (bebida.length) {
            await entregaBebida;
            mostrarPedidosRealizados(bebida, 'Bebida entregada');
        }
        
        if (platillos.length) {
            await cocinarPedido();
            mostrarPedidosRealizados(platillos, 'Platillo entregado');
        }
    
        const estadoEntrega = await entregarPedido();
        
        if (postre.length) {
            await entregarPostre();
            mostrarPedidosRealizados(postre, 'Postre entregado');
        }
        
        mostrarPedidosRealizados(ordenFinal, estadoEntrega === '¡Listo para entregar!' ? '¡Pedido entregado!' : 'Hubo un problema en la entrega vuelve a intentar');
    
    } catch (error) {
        console.error('Error en el proceso de pedido:', error);
    }


});





