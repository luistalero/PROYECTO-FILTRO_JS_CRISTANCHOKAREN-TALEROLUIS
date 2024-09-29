function god(){
    fetch("https://api.spacexdata.com/v4/company")
    .then(res => res.json())
    .then(info => {
        console.log(info);
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
                <div class="section_1">
                    <h3>WEBSITES</h3>
                    <a href="${info.links.website}" target="_blank">SPACEX</a>
                </div>
                <div class="section_2">
                    <h3>FLICKR</h3>
                    <a href="${info.links.flickr}" target="_blank">FLICKR</a>
                </div>
                <div class="section_3">
                    <h3>TWITTER</h3>
                    <a href="${info.links.twitter}" target="_blank">OFFICIAL_TWITTER</a>
                </div>
                <div class="section_4">
                    <h3>FOUNDER_TWITTER</h3>
                    <a href="${info.links.elon_twitter}" target="_blank">FOUNDER_TWITTER</a>
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
                                <h3>FOUNDER</h3>
                                <p>${info.founder}</p>
                            </div>
                            <div class="musk">
                                <h3>FOUNDED</h3>
                                <p>${info.founded}</p>
                            </div>
                            <div class="musk">
                                <h3>CEO</h3>
                                <p>${info.ceo}</p>
                            </div>
                        </div>
                        <div>
                            <div class="musk">
                                <h3>CTO</h3>
                                <p>${info.cto}</p>
                            </div>
                            <div class="musk">
                                <h3>COO</h3>
                                <p>${info.coo}</p>
                            </div>
                            <div class="musk">
                                <h3>CTO_PROPULSION</h3>
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