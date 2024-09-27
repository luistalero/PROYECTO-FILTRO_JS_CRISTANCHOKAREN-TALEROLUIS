

function god(){
    fetch("https://api.spacexdata.com/v4/company")
    .then(res => {
        if (res.json());
    })
    .then(info => {
        console.log(info);
        document.querySelector(".nombre").innerHTML = `<h1>SPACEX</h1>`
        document.querySelector(".descripcion").innerHTML = `
            <div class="seccion">
                <div>
                    <h2>headquarters<h2>
                </div>
                <div class="section_1">
                    <h3>ADDRESS</h3>
                    <P>Rocket Road</P>
                </div>
                <div class="section_2">
                    <h3>ADDRESS</h3>
                    <P>Rocket Road</P>
                </div>
                <div class="section_3">
                    <h3>ADDRESS</h3>
                    <p>Rocket Road</p>
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
                    <a href="https://www.spacex.com/" target="_blank">SPACEX</a>
                </div>
                <div class="section_2">
                    <h3>FLICKR</h3>
                    <a href="https://www.flickr.com/photos/spacex/" target="_blank">FLICKR</a>
                </div>
                <div class="section_3">
                    <h3>TWITTER</h3>
                    <a href="https://twitter.com/SpaceX" target="_blank">OFFICIAL_TWITTER</a>
                </div>
                <div class="section_4">
                    <h3>FOUNDER_TWITTER</h3>
                    <a href="https://twitter.com/elonmusk" target="_blank">FOUNDER_TWITTER</a>
                </div>
            </div> 
        `;
        document.querySelector(".info").innerHTML = `
            <div class="elonk">
                <h2>INFORMATION</h2>
                <div class="info_elon">
                    <img src="../img/icons/Elon-Musk-SpaceX.avif" alt="">    
                    <div class="found">
                        <div class="musk">
                            <h3>FOUNDER</h3>
                            <p>Elon Musk</p>
                        </div>
                        <div class="musk">
                            <h3>FOUNDED</h3>
                            <p>2002</p>
                        </div>
                        <div class="musk">
                            <h3>CEO</h3>
                            <p>Elon Musk</p>
                        </div>
                        <div class="musk">
                            <h3>CTO</h3>
                            <p>Elon Musk</p>
                        </div>
                        <div class="musk">
                            <h3>COO</h3>
                            <p>Gwynne Shotwell</p>
                        </div>
                        <div class="musk">
                            <h3>CTO_PROPULSION</h3>
                            <p>Tom Mueller</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="otro">
                <div class="empresa">
                    <img src="../img/icons/TKXVKSG3CNRVLQ6ABEM7W7WUKI.avif" alt"">
                </div>
            </div>
        `;
    });
}
god();