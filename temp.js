
let velocidad = 1000
const divCronometro = document.getElementById("divCronometro")
const divBotones = document.getElementById("divBotones")
const botonStart = document.getElementById("start")
const botonReset = document.createElement("button")
botonReset.innerHTML = `<i class="bi bi-x-circle-fill"></i>
          <p>Reset</p>`
          
          botonReset.classList = "botones"
          botonReset.id = "Breset"
const botonPause = document.createElement("button")
botonPause.innerHTML = `<i class="bi bi-pause-circle-fill"></i><p>Pause</p>`
botonPause.classList = "botones"
const divVelocidades = document.getElementById("aceleradores")
const normal = document.getElementById("normal")
normal.addEventListener("click", ()=>{
    velocidad = 1000
    media.style.backgroundColor = "white"
    flash.style.backgroundColor = "white"
    normal.style.backgroundColor = "black"
    reiniciarIntervalo(); 
})

const media = document.getElementById("mas-rapido")
media.addEventListener("click",()=>{
    velocidad = 100
    media.style.backgroundColor = "black"
    flash.style.backgroundColor = "White"
    normal.style.backgroundColor = "white"
    reiniciarIntervalo();
})

const flash = document.getElementById("flash")
flash.addEventListener("click",()=>{
    velocidad = 10
    media.style.backgroundColor = "white"
    flash.style.backgroundColor = "black"
    normal.style.backgroundColor = "white"
    reiniciarIntervalo(); 
})



let [horas, minutos, segundos] = [0,0,0]
function reiniciarIntervalo() {
    if (tiempo) {
        clearInterval(tiempo);  // Detener el intervalo actual
    }
    tiempo = setInterval(cronometro, velocidad);  // Reiniciar el intervalo con el nuevo valor de velocidad
}

function cronometro (){
    
    const asignarFormatoHora = horas < 10 ? `0${horas}`: horas
    const asignarFormatoMinuto = minutos < 10 ? `0${minutos}`: minutos
    const asignarFormatoSegundo = segundos < 10 ? `0${segundos}`: segundos
    
    
    segundos++
    if (segundos/60 == 1){
        segundos = 0
        minutos++
    } if (minutos/60 == 1){
        minutos = 0
        horas++
    }

    let tiempoConc = `${asignarFormatoHora}:${asignarFormatoMinuto}:${asignarFormatoSegundo}`
    
    divCronometro.innerText = tiempoConc
}

let estadoCronometro = ""
let tiempo = ""

botonStart.addEventListener("click",()=>{
    
    if (estadoCronometro == 'iniciado') {
        alert("CRONOMETRO YA INICIADO")
    } else { 
        if (botonReset.parentElement){
            divBotones.removeChild(botonReset)
        }
        tiempo = setInterval(cronometro, velocidad)
        botonStart.replaceWith(botonPause)
        reiniciarIntervalo(); 
        estadoCronometro = 'iniciado'
        divVelocidades.style.display ="flex"
     }
    
    
})
botonPause.addEventListener("click", ()=>{
    if (estadoCronometro == 'pausado'){
        alert("EL CRONOMETRO YA SE ENCUENTRA PAUSADO")
    } else {
        clearInterval(tiempo)
        estadoCronometro = 'pausado'
        botonPause.replaceWith(botonStart)
        divBotones.appendChild(botonReset)
    }
})



botonReset.addEventListener("click",()=>{
    if (estadoCronometro == 'reset') {
        alert("EL CRONOMETRO YA SE ENCUENTRA REINICIADO")
    } else { 
        divCronometro.innerText = "00:00:00"
        clearInterval(tiempo)
        if (botonPause.parentElement){
            botonPause.replaceWith(botonStart)
        }
        [horas, minutos, segundos] = [0,0,0]

        estadoCronometro = 'reset'
        divBotones.removeChild(botonReset)
        divVelocidades.style.display = "none"
     }
})






