let cohete=0;
let len_data;
function cambia(){
    let numeros = document.querySelectorAll('#num');
    numeros.forEach(e=>{
        e.addEventListener('click',()=>{
            cohete=e.getAttribute('identificador')-1;
        });
    });
    capsule();
}

function capsule(){
    fetch("https://api.spacexdata.com/v4/capsules/")
    .then( res => res.json())
    .then(cap => {
        len_data=cap.length;
        

        document.querySelector(".reuse").innerHTML=`
        <img src="../icons/mech.svg" alt="">
        <h4>Reuse Count :</h4>
        <p>${cap[cohete].reuse_count}</p>
        `
    })

}
capsule()
