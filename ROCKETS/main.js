let nave = 0;
let largo_dato;

function pg_actual(){
    let numeros = document.querySelectorAll(".numero");
    numeros.forEach(e => {
        if (parseInt(e.getAttribute('data-id')) - 1 === nave) {
            e.setAttribute('id','pg');
        } else {
            e.removeAttribute('id');
        }
    });
}
function change(){
    let numeros = document.querySelectorAll(".numero");
    numeros.forEach(e => {
        e.addEventListener("click", () => {
            nave = parseInt(e.getAttribute("data-id")) - 1;
            if (nave >= 0 && nave < largo_dato) {
                god()
            }
        });
    });
}
function siguiente(){
    let numeros = document.querySelectorAll(".numero");
    let contar = Number(numeros[0].getAttribute("data-id"));
    if (contar + 4 < largo_dato) {
        contar++;
        for (let a = 0; a < 4; a++){
            numeros[a].setAttribute("data-id", contar + a);
            numeros[a].innerHTML = contar + a;
        }
    }
    pg_actual();
}
function anterior(){
    let numeros = document.querySelectorAll(".numero");
    let contar = Number(numeros[0].getAttribute("data-id"));
    if (contar > 1) {
        contar--;
        for (let a = 0; a < 4; a++){
            max -= 1;
            numeros[a].setAttribute("data-id", contar + a);
            numeros[a].innerHTML = contar + a;
        }
    }
    pg_actual();
}
function god(){
    fetch("https://api.spacexdata.com/v4/rockets")
    .then(res => res.json())
    .then(info => {
       largo_dato = info.length;
       pg_actual();
       document.querySelector(".nombre").innerHTML = `<h1>${info[nave].name}</h1>`
       document.querySelector(".descripcion").innerHTML = `
       <div class="seccion">
            <img src="../img/icons/mech.svg" alt="">
            <div class="text">
                <h2>${info[nave].country}</h2>
                <p>${info[nave].description}</p>
            </div>
        </div>
        <div class="seccion">
            <img src="../img/icons/mech.svg" alt="">
            <div class="text">
                <h2>The estimated cost per rocket launch</h2>
                <p>${info[nave].cost_per_launch}</p>
            </div>
        </div>
        <div class="seccion">
            <img src="../img/icons/mech.svg" alt="">
            <div class="text">
                <h2>The date of the first flight of the rocket</h2>
                <p>${info[nave].first_flight}</p>
            </div>
        </div>
        <div class="seccion">
            <img src="../img/icons/mech.svg" alt="">
            <div class="text">
                <h2>Success rate pct</h2>
                <p>${info[nave].success_rate_pct}</p>
            </div>
        </div>
        <div class="seccion">
            <img src="../img/icons/mech.svg" alt="">
            <div class="text">
                <h2>Read more about the cohete</h2>
                <a href="${info[nave].wikipedia}" target="_blank" style = "color: white; text-decoration: none;">Wikipedia</a>
            </div>
        </div>
       `;
       let velocidadAtmosferica = parseInt((info[nave].engines.thrust_sea_level.kN/1780)*100)
       document.querySelector(".info").innerHTML = `
       <div class="parte1">
            <div class="item__progress__bar"
                style="background: radial-gradient(closest-side, #1d1f38 85%, transparent 85% 100%), conic-gradient(var(--color--three) ${velocidadAtmosferica}%, transparent 0);">
                <div class="progress__value"><strong>Atmospheric acceleration</strong><small>${velocidadAtmosferica}
                        %</small><small>${info[nave].engines.thrust_sea_level.kN} kN <br> ${info[nave].engines.thrust_sea_level.lbf} Lbf</small></div>
            </div>
            <div class="info_rocket">
                <h3>INFORMATION ROCKET</h3>
                <div>
                    <p>Type</p>
                    <span>${info[nave].type}</span>
                </div>
                <div>
                    <p>Rocket in service
                    </p>
                    <span>${info[nave].active}</span>
                </div>
                <div>
                    <p>Number of stages</p>
                    <span>${info[nave].stages}</span>
                </div>
                <div>
                    <p>Number of propellants</p>
                    <span>${info[nave].boosters}</span>
                </div>
                <div>
                    <p>Landing legs</p>
                    <span>${info[nave].landing_legs.number}</span>
                </div>
                <div>
                    <p>Leg material</p>
                    <span>${info[nave].landing_legs.material ?? 'N/A'}</span>
                </div>
            </div>
            <div class="info_rocket">
                <h3>FIRST STAGE</h3>
                <div>
                    <p>Reusable</p>
                    <span>${info[nave].first_stage.reusable}</span>
                </div>
                <div>
                    <p>Engines
                    </p>
                    <span>${info[nave].first_stage.engines}</span>
                </div>
                <div>
                    <p>Fuel Amount Tons</p>
                    <span>${info[nave].first_stage.fuel_amount_tons}</span>
                </div>
                <div>
                    <p>Burn Time Sec</p>
                    <span>${info[nave].first_stage.burn_time_sec}</span>
                </div>
            </div>
        </div>
        <div class="parte2">
        </div>
        <div class="parte3">
        </div>
        `;
        let imagHTML = "";
        info[nave].flickr_images.forEach(img => {
        imagHTML += `<div class="carousel__item"><img src="${img}" referrerpolicy="no_referrer"></div>`;
        });
        document.querySelector(".parte2").innerHTML = imagHTML;
        
        let speedSpace = parseInt((info[nave].engines.thrust_vacuum.kN/1960)*100);
        document.querySelector(".parte3").innerHTML = `
        <div class="item__progress__bar"
            style = "background: radial-gradient(closest-side, #1d1f38 85%, transparent 85% 100%), conic-gradient(var(--color--three) ${speedSpace}%, transparent 0);">
            <div class="progress__value"><strong>Speed in space</strong><smal>${speedSpace}
                    %</small> <br> <small>${info[nave].engines.thrust_vacuum.kN} kN <br> ${info[nave].engines.thrust_vacuum.lbf} Lbf</small></div>
        </div>
        <div class="info_rocket">
            <h3>ENGINE INFORMATION</h3>
            <div>
                <p>Type</p>
                <span>${info[nave].engines.type}-${info[nave].engines.version}</span>
            </div>
            <div>
                <p>Maximum power loss</p>
                <span>${info[nave].engines.engine_loss_max ?? 'N/A'}</span>
            </div>
            <div>
                <p>Engine availability</p>
                <span>${info[nave].engines.layout}</span>
            </div>
            <div>
                <p>Number of engines</p>
                <span>${info[nave].engines.number}</span>
            </div>
            <div>
                <p>Stage 1 fuel</p>
                <span>${info[nave].engines.propellant_1}</span>
            </div>
            <div>
                <p>Stage 2 fuel</p>
                <span>${info[nave].engines.propellant_2}</span>
            </div>
        </div>
        <div class="info_rocket">
            <h3>SECOND STAGE</h3>
            <div>
                <p>Thurst kn</p>
                <span>${info[nave].second_stage.thrust.kN}</span>
            </div>
            <div>
                <p>Thurst lbf</p>
                <span>${info[nave].second_stage.thrust.lbf}</span>
            </div>
            <div>
                <p>option_1</p>
                <span>${info[nave].second_stage.payloads.option_1}</span>
            </div>
        </div>
        `;
        document.querySelector(".estadisticas").innerHTML = `
        <div class="information__container">
            <div>
                <h3>Rocket weight :</h3>
            </div>
            <div class="valores">
                <progress max"1420788" value="${info[nave].mass.kg}">1420788%</progress>
                <span>${info[nave].mass.kg} kg <br> ${info[nave].mass.lb} lb</span>
            </div>
        </div>
        <div class="information__container">
            <div>
                <h3>Low Earth Orbit :</h3>
            </div>
            <div class="valores">
                <progress max="150000" value="${info[nave].payload_weights[0].kg}">1420788%</progress>
                <span>${info[nave].payload_weights[0].kg} kg <br> ${info[nave].payload_weights[0].lb} lb</span>
            </div>
        </div>
        <div class="infomation__container">
            <div>
                <h3>Rocket diameter :</h3>
            </div>
            <div class="valores">
                <progress max="12.2" value="${info[nave].height.meters}">1420788%</progress>
                <span>${info[nave].height.meters} M <br> ${info[nave].height.feet} F</span>
            </div>
        </div>
        <div class="information__container">
            <div>
                <h3>Rocket diameter :</h3>
            </div>
            <div class="valores">
                <progress max="12.2" value="${info[nave].diameter.meters}">1420788%</progress>
                <span>${info[nave].diameter.meters} kg <br> ${info[nave].diameter.feet} lb</span>
            </div>
        </div>
        <div class="information__container">
            <div>
                <h3>Diameter rocket shield :</h3>
            </div>
            <div class="valores">
                <progress max="5.2" value="${info[nave].diameter.meters}">1420788%</progress>
                <span>${info[nave].diameter.meters} kg <br> ${info[nave].diameter.feet} lb</span>
            </div>
        </div>
        <div class="information__container">
            <div>
                <h3>Height rocket shield :</h3>
            </div>
            <div class="valores">
                <progress max="13.1" value="${info[nave].second_stage.payloads.composite_fairing.diameter.meters}">1420788%</progress>
                <span>${info[nave].second_stage.payloads.composite_fairing.diameter.meters} M <br> ${info[nave].second_stage.payloads.composite_fairing.diameter.feet} F</span>
            </div>
        </div>
        `;
    });
}
god();