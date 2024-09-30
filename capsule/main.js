let cohete = 0;  // Índice de la cápsula seleccionada, inicialmente 0
let len_data;  // Variable para almacenar el número total de cápsulas

// Función que agrega eventos de clic a los botones de números y selecciona la cápsula correspondiente
function cambiar() {
    let numeros = document.querySelectorAll('#numero');  // Selecciona todos los elementos con ID 'numero'
    numeros.forEach(e => {  // Recorre cada botón
        e.addEventListener('click', () => {  // Agrega un evento de clic a cada botón
            cohete = e.getAttribute('data-id') - 1;  // Actualiza el índice de la cápsula seleccionada
        });
    });
    capsule();  // Llama a la función que carga los datos de la cápsula seleccionada
}

// Función para avanzar al siguiente grupo de 4 cápsulas
function next() {
    let numeros = document.querySelectorAll('#numero');  // Selecciona todos los botones con ID 'numero'
    let contador = Number(numeros[0].getAttribute('data-id'));  // Obtiene el ID del primer botón
    let max = Number(numeros[3].getAttribute('data-id'));  // Obtiene el ID del cuarto botón

    if (max < len_data) {  // Verifica si hay más cápsulas para mostrar
        for (let a = 0; a < 4; a++) {  // Recorre los cuatro botones
            contador += 1;  // Incrementa el ID
            numeros[a].setAttribute('data-id', contador);  // Establece el nuevo ID en el botón
            numeros[a].innerHTML = contador;  // Actualiza el texto del botón con el nuevo ID
        }
    }
}

// Función para retroceder al grupo anterior de cápsulas
function prew() {
    let numeros = document.querySelectorAll('#numero');  // Selecciona todos los botones con ID 'numero'
    let contador = Number(numeros[0].getAttribute('data-id'));  // Obtiene el ID del primer botón
    let max = Number(numeros[3].getAttribute('data-id'));  // Obtiene el ID del cuarto botón

    if (contador > 1) {  // Verifica si hay cápsulas anteriores
        for (let a = 3; a >= 0; a--) {  // Recorre los botones de derecha a izquierda
            max -= 1;  // Decrementa el ID
            numeros[a].setAttribute('data-id', max);  // Establece el nuevo ID en el botón
            numeros[a].innerHTML = max;  // Actualiza el texto del botón con el nuevo ID
        }
    }
}

// Función para cargar los datos de la cápsula seleccionada desde la API
function capsule() {
    fetch("https://api.spacexdata.com/v4/capsules/")  // Realiza una petición a la API de SpaceX para obtener los datos de las cápsulas
    .then(res => res.json())  // Convierte la respuesta en formato JSON
    .then(cap => {  // Obtiene los datos de las cápsulas
        len_data = cap.length;  // Guarda el número total de cápsulas
        
        // Inserta la información de la cápsula seleccionada en el HTML
        document.querySelector(".contenido").innerHTML = `
                <div id="info" class="reuse"><p class="conte">${cap[cohete].reuse_count}</p><h3>Reuse Count</h3></div>
                <div id="info" class="water"><p class="conte">${cap[cohete].water_landings}</p><h3>Water Landings</h3></div>
                <div id="info" class="land"><p class="conte">${cap[cohete].land_landings}</p><h3>Land Landings</h3></div>
                <div id="info" class="serial"><p class="conte">${cap[cohete].serial}</p><h3>Serial</h3></div>
                <div id="info" class="status"><p class="conte">${cap[cohete].status}</p><h3>Status</h3></div>
                <div id="info" class="type"><p class="conte">${cap[cohete].type}</p><h3>Type</h3></div>
            `;  // Muestra los datos principales de la cápsula (número de reutilizaciones, aterrizajes, número de serie, estado y tipo)

        // Inserta la última actualización de la cápsula en el HTML
        document.querySelector(".last_up").innerHTML = `
            <h4>Last Update :</h4>
            <p class="texto">${cap[cohete].last_update}</p>
        `;  // Muestra la última actualización de la cápsula

        let numero = 0;  // Inicializa un contador para los lanzamientos
        let des = 0;  // Inicializa un contador para las descripciones
        document.getElementById("left").innerHTML = "";  // Limpia el contenido anterior de la sección de lanzamientos

        // Recorre los lanzamientos de la cápsula seleccionada
        for (const id of cap[cohete].launches) {  // Para cada ID de lanzamiento
            let id_des = "details" + des;  // Genera un ID único para la descripción del lanzamiento
            let id_img = "imagenes" + numero;  // Genera un ID único para las imágenes del lanzamiento
            
            // Realiza una petición a la API para obtener los datos del lanzamiento
            fetch("https://api.spacexdata.com/v4/launches/" + id)
            .then(res => res.json())  // Convierte la respuesta en JSON
            .then(lanza => {  // Obtiene los datos del lanzamiento
                // Inserta el lanzamiento con su logo, nombre, imágenes y detalles en el HTML
                document.getElementById("left").innerHTML += `
                    <div id="lanzamientos">
                        <div id="logo_name">
                            <div id="logo"><img src="${lanza.links.patch.small}"></div>  <!-- Muestra el logo del lanzamiento -->
                            <div id="name">${lanza.name}</div>  <!-- Muestra el nombre del lanzamiento -->
                        </div>
                        <div id="pictures">
                            <div id="${id_img}" class="imagenes"></div>  <!-- Div para las imágenes del lanzamiento -->
                        </div>
                        <div id="${id_des}" class="details"></div>  <!-- Div para la descripción del lanzamiento -->
                    </div>
                `;

                // Si no hay imágenes en Flickr, obtiene imágenes de una API de respaldo
                if (lanza.links.flickr.original == "") {  // Verifica si no hay imágenes en el enlace de Flickr
                    fetch('https://66e45b7dd2405277ed1408c9.mockapi.io/spacex/1')  // Realiza una petición a la API de respaldo
                    .then(res => res.json())  // Convierte la respuesta en JSON
                    .then(api => {  // Obtiene las imágenes de la API de respaldo
                        let max = api.imagenes.length - 1;  // Número máximo de imágenes disponibles
                        for (let i = 0; i < 5; i++) {  // Muestra 5 imágenes aleatorias
                            let imagen = Math.floor(Math.random() * max);  // Elige una imagen al azar
                            document.getElementById(id_img).innerHTML += `
                                <div class="carousel__item"><img src="${api.imagenes[imagen]}" referrerpolicy="no-referrer"></div>
                            `;  // Inserta la imagen en el carrusel
                        }
                    });
                } else {  // Si hay imágenes en Flickr, las muestra
                    for (const img of lanza.links.flickr.original) {  // Recorre cada imagen de Flickr
                        document.getElementById(id_img).innerHTML += `
                            <div class="carousel__item"><img src="${img}" referrerpolicy="no-referrer"></div>
                        `;  // Inserta la imagen en el carrusel
                    }
                }

                // Si no hay detalles del lanzamiento, usa una descripción de una API de respaldo
                if (lanza.details == null) {  // Verifica si no hay detalles del lanzamiento
                    fetch('https://66e45b7dd2405277ed1408c9.mockapi.io/spacex/1')  // Realiza una petición a la API de respaldo
                    .then(res => res.json())  // Convierte la respuesta en JSON
                    .then(api => {  // Obtiene una descripción aleatoria de la API de respaldo
                        let min = api.descripcion.length - 1;  // Número máximo de descripciones disponibles
                        let descrip = Math.floor(Math.random() * min);  // Elige una descripción al azar
                        document.getElementById(id_des).innerHTML = `
                            <p>${api.descripcion[descrip]}</p>
                        `;  // Inserta la descripción en el HTML
                    });
                } else {  // Si hay detalles, los muestra
                    document.getElementById(id_des).innerHTML = `
                        <p>${lanza.details}</p>
                    `;  // Inserta los detalles del lanzamiento en el HTML
                }
            });
            numero += 1;  // Incrementa el contador de lanzamientos
            des += 1;  // Incrementa el contador de descripciones
        }
    });
}

// Llama a la función para cargar los datos de la cápsula por primera vez
capsule();  // Carga los datos iniciales de la cápsula
