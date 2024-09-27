function god(){
    fetch("https://api.spacexdata.com/v4/company")
    .then(res => {
        if (!res.ok) {
            throw new Error(`Error en la solicitud: ${res.status}`);
        }
        return res.json();
    })
    .then(info => {
        console.log(info);
    });
}
