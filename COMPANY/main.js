function god(){
    fetch("https://api.spacexdata.com/v4/company")
    .then(res => res.json())
    .then(info => {
        document.querySelector(".nombre").innerHTML = `<h1>${info.name}</h1>`
        document.querySelector(".descripcion").innerHTML = `
            <div class="seccion">
                <div>
                    <h2>HEADQUARTERS<h2>
                </div>
                <div class="section_1">
                    <h3>ADDRESS</h3>
                    <P>${info.headquarters.address}</P>
                </div>
                <div class="section_2">
                    <h3>CITY</h3>
                    <P>${info.headquarters.city}</P>
                </div>
                <div class="section_3">
                    <h3>STATE</h3>
                    <p>${info.headquarters.state}</p>
                </div>
            </div>
        `;
        document.querySelector(".estadisticas").innerHTML = `
            <div class="seccion">
                <div>
                    <h2>OFFICIAL SITES</h2>
                </div>
                <div class="secciones">
                    <div class="iconsR">
                        <a href="${info.links.elon_twitter}" target="_blank">
                            <div class="layer">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span class="fab fa-facebook-f"><img src="../img/icons/nuevo-diseno-icono-x-logotipo-twitter-2023_1017-45418.avif" alt=""  width="100%" height="100%"></span>
                            </div>
                            <div class="text">Twitter_Elon</div>
                        </a>
                        <a href="${info.links.twitter}" target="_blank">
                            <div class="layer">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span class="fab fa-twitter"><img src="../img/icons/nuevo-diseno-icono-x-logotipo-twitter-2023_1017-45418.avif" alt=""  width="100%" height="100%"></span>
                            </div>
                            <div class="text">Twitter_SpaceX</div>
                        </a>
                        <a href="${info.links.flickr}"  target="_blank">
                            <div class="layer">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span class="fab fa-instagram"><img src="../img/icons/flickr-icon-2048x2048-hnj8uvzi.png" alt=""  width="100%" height="100%"></span>
                            </div>
                            <div class="text">Flickr</div>
                        </a>
                        <a href="${info.links.website}"  target="_blank">
                            <div class="layer">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span class="fab fa-linkedin-in"><img src="../img/icons/SpaceX-White-Dark-Background-Logo.wine.svg" alt=""  width="100%" height="100%"></span>
                            </div>
                            <div class="text">spaceX</div>
                        </a>
                    </div>
                </div>
            </div> 
        `;
        document.querySelector(".info").innerHTML = `
            <div class="elonk">
                <h2>INFORMATION</h2>
                <div class="info_elon">
                    <img src="../img/icons/Elon-Musk-SpaceX.avif" alt="">    
                    <div class="found">
                        <div>   
                            <div class="musk">
                                <h4>FOUNDER</h4>
                                <p>${info.founder}</p>
                            </div>
                            <div class="musk">
                                <h4>FOUNDED</h4>
                                <p>${info.founded}</p>
                            </div>
                            <div class="musk">
                                <h4>CEO</h4>
                                <p>${info.ceo}</p>
                            </div>
                        </div>
                        <div>
                            <div class="musk">
                                <h4>CTO</h4>
                                <p>${info.cto}</p>
                            </div>
                            <div class="musk">
                                <h4>COO</h4>
                                <p>${info.coo}</p>
                            </div>
                            <div class="musk">
                                <h4>CTO_PROPULSION</h4>
                                <p>${info.cto_propulsion}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="otro">
                <h2>COMPANY</h2>
                <div class="empresa">
                    <img src="../img/icons/TKXVKSG3CNRVLQ6ABEM7W7WUKI.avif" alt"">
                    <div class="back">
                        <div class="musk">
                            <h3>VALUATION</h3>
                            <p>${info.valuation.toLocaleString()} USD</p>
                        </div>
                        <div class="musk">
                            <h3>SUMMARY</h3>
                            <p>${info.summary}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}
god();