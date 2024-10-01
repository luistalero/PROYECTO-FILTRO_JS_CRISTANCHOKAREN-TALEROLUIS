// Definición de la clase 'principal' que extiende HTMLElement
class principal extends HTMLElement {
    constructor() {
        super();
        // Definición del contenido HTML de este componente
        this.innerHTML = `
        <div class="principal">
            <div class="titulo">
                <div class="load"></div>
            </div>
            <div class="details">
                <div class="load"></div>
            </div>
            <div class="center load">
            </div>
            <div class="rigth">
                <div class="events1">
                    <div class="load"></div>
                </div>
                <div class="events2">
                    <div class="load"></div>
                </div>
                <div class="article">
                    <div class="load"></div>
                </div>
            </div>
        </div>
        `;
    }
}

// Definición de la clase 'paginacion' que extiende HTMLElement
class paginacion extends HTMLElement {
    constructor() {
        super();
        // Definición del contenido HTML para la paginación
        this.innerHTML = `
        <div class="paginacion">
            <button id="prew" onclick="prew()">&lt;&lt;</button>
            <button class="numero" onmouseover="cambiar()" data-id="1">1</button>
            <button class="numero" onmouseover="cambiar()" data-id="2">2</button>
            <button class="numero" onmouseover="cambiar()" data-id="3">3</button>
            <button id="next" onclick="next()">&gt;&gt;</button>
        </div>
        `;
    }
}

// Definición de la clase 'btn' que extiende HTMLElement
class btn extends HTMLElement {
    constructor() {
        super();
        // Definición del contenido HTML para los botones de navegación
        this.innerHTML = `
        <div class="botones">
            <button class="icons">
                <a href="../ROCKETS/index.html">
                    <img src="../imagen/rocket.svg" alt="">
                    <p>Rockets</p>
                </a>
            </button>
            <button class="icons">
                <a href="../capsule/index.html">
                    <img src="../imagen/capsule.svg" alt="">
                    <p>Capsules</p>
                </a>
            </button>
            <button class="icons">
                <a href="../index.html">
                    <img src="../img/icons/casa-icono-silueta.png" alt="" >
                    <p>Home</p>
                </a>
            </button>
            <button class="icons">
                <a href="../COMPANY/index.html">
                    <img src="../imagen/comms.svg" alt="">
                    <p>Company</p>
                </a>
            </button>
            <button class="icons actual">
                <a href="../History/index.html">
                    <img src="../imagen/prop.svg" alt="">
                    <p>History</p>
                </a>
            </button>
        </div>
        `;
    }
}

// Registro de los componentes personalizados
customElements.define('cont-principal', principal);
customElements.define('cont-paginacion', paginacion);
customElements.define('cont-btn', btn);

// Inicialización de variables
let history = 0; // Variable para llevar el seguimiento de la página actual
let len_data; // Variable para almacenar la longitud de los datos

// Función para actualizar el estado actual de la paginación
function pag_actual() {
    let numeros = document.querySelectorAll('.numero'); // Selecciona todos los botones de números
    numeros.forEach(e => {
        if (e.getAttribute('data-id') - 1 == history) {
            e.setAttribute('id', 'pag'); // Resalta el botón de la página actual
        } else {
            e.removeAttribute('id'); // Remueve el resaltado de otros botones
        }
    });
}

// Función para cambiar la página al hacer clic en un número
function cambiar() {
    let numeros = document.querySelectorAll('.numero');
    numeros.forEach(e => {
        e.addEventListener('click', () => {
            history = e.getAttribute('data-id') - 1; // Actualiza la historia con el número seleccionado
            rokect(); // Llama a la función para actualizar los datos
        });
    });
}

// Función para avanzar a la siguiente página
function next() {
    let numeros = document.querySelectorAll('.numero');
    let contador = Number(numeros[0].getAttribute('data-id')); // Obtiene el número de la primera página
    let max = Number(numeros[2].getAttribute('data-id')); // Obtiene el número de la última página visible
    if (max < len_data) { // Verifica que no se exceda el total de datos
        for (let a = 0; a < 3; a++) {
            contador += 1; // Incrementa el contador para las páginas siguientes
            numeros[a].setAttribute('data-id', contador); // Actualiza el ID del botón
            numeros[a].innerHTML = contador; // Actualiza el contenido del botón
        }
    }
    pag_actual(); // Actualiza el estado de la paginación
}

// Función para retroceder a la página anterior
function prew() {
    let numeros = document.querySelectorAll('.numero');
    let contador = Number(numeros[0].getAttribute('data-id')); // Obtiene el número de la primera página
    let max = Number(numeros[2].getAttribute('data-id')); // Obtiene el número de la última página visible
    if (contador > 1) { // Verifica que no se vaya a una página menor a 1
        for (let a = 2; a >= 0; a--) {
            max -= 1; // Decrementa el número de la página
            numeros[a].setAttribute('data-id', max); // Actualiza el ID del botón
            numeros[a].innerHTML = max; // Actualiza el contenido del botón
        }
    }
    pag_actual(); // Actualiza el estado de la paginación
}

// Función para obtener y mostrar datos de la API de SpaceX
function rokect() {
    fetch('https://api.spacexdata.com/v4/history') // Llama a la API
        .then(res => res.json()) // Convierte la respuesta a formato JSON
        .then(info => {
            len_data = info.length; // Almacena la longitud de los datos
            pag_actual(); // Actualiza la paginación
            // Actualiza el contenido de la sección principal con los datos recibidos
            document.querySelector('.titulo').innerHTML = `<h1>${info[history].title}</h1>`;
            document.querySelector('.details').innerHTML = `<h2>Event Details</h2><p class="p">${info[history].details}</p>`;
            document.querySelector('.events1').innerHTML = `<h2>Event Date (UTC)</h2><p class="p">${info[history].event_date_utc}</p>`;
            document.querySelector('.events2').innerHTML = `<h2>Event Date (UNIX)</h2><p class="p">${info[history].event_date_unix}</p>`;
            document.querySelector('.article').innerHTML = `<button class="boton"><a href="${info[history].links.article}">ARTICLE</a></button>`;
            document.querySelector('.center').innerHTML = `<iframe src="${info[history].links.article}" frameborder="0"></iframe>`;
        });
};

// Llamada inicial para obtener datos al cargar la página
rokect();
