class principal extends HTMLElement {
    constructor() {
        super();
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

class paginacion extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <div class="paginacion">
            <button id="prew" onclick="prew()"><</button>
            <button class="numero" onmouseover="cambiar()" data-id="1">1</button>
            <button class="numero" onmouseover="cambiar()" data-id="2">2</button>
            <button class="numero" onmouseover="cambiar()" data-id="3">3</button>
            <button id="next" onclick="next()">></button>
        </div>
        `;
    }
}
class btn extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <div class="botones">
            <button class="icons">
                <a href="../ROCKETS/index.html">
                    <img src="../imagen/rocket.svg" alt="">
                    <p>Rockets</p>
                </a>
            </button>
            <button class="icons">
                <a href="../capsule/inde.html">
                    <img src="../imagen/capsule.svg" alt="">
                    <p>Capsules</p>
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
customElements.define('cont-principal', principal);
customElements.define('cont-paginacion', paginacion);
customElements.define('cont-btn', btn);
let history = 0;
let len_data;
function pag_actual() {
    let numeros = document.querySelectorAll('.numero');
    numeros.forEach(e => {
        if (e.getAttribute('data-id') - 1 == history) {
            e.setAttribute('id', 'pag');
        }
        else {
            e.removeAttribute('id');
        }
    });
}
function cambiar() {
    let numeros = document.querySelectorAll('.numero');
    numeros.forEach(e => {
        e.addEventListener('click', () => {
            history = e.getAttribute('data-id') - 1;
            rokect();
        });
    });
}
function next() {
    let numeros = document.querySelectorAll('.numero');
    let contador = Number(numeros[0].getAttribute('data-id'));
    let max = Number(numeros[2].getAttribute('data-id'));
    if (max < len_data) {
        for (let a = 0; a < 3; a++) {
            contador += 1;
            numeros[a].setAttribute('data-id', contador);
            numeros[a].innerHTML = contador;
        }
    }
    pag_actual();
}
function prew() {
    let numeros = document.querySelectorAll('.numero');
    let contador = Number(numeros[0].getAttribute('data-id'));
    let max = Number(numeros[2].getAttribute('data-id'));
    if (contador > 1) {
        for (let a = 2; a >= 0; a--) {
            max -= 1;
            numeros[a].setAttribute('data-id', max);
            numeros[a].innerHTML = max;
        }
    }
    pag_actual();
}
function rokect() {
    fetch('https://api.spacexdata.com/v4/history')
        .then(res => res.json())
        .then(info => {
            len_data = info.length;
            pag_actual();
            document.querySelector('.titulo').innerHTML = `<h1>${info[history].title}</h1>`;
            document.querySelector('.details').innerHTML = `<h2>Event Details</h2><p class="p">${info[history].details}</p>`;
            document.querySelector('.events1').innerHTML = `<h2>Event Date (UTC)</h2><p class="p">${info[history].event_date_utc}</p>`;
            document.querySelector('.events2').innerHTML = `<h2>Event Date (UNIX)</h2><p class="p">${info[history].event_date_unix}</p>`;
            document.querySelector('.article').innerHTML = `<button class="boton"><a href="${info[history].links.article}">ARTICLE</a></button>`;
            document.querySelector('.center').innerHTML = `<iframe src="${info[history].links.article}" frameborder="0"></iframe>`;
        });
};
rokect();