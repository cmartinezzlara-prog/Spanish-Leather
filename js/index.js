"use strict"


/*
1. Estoy en MENU.

2. Pulso "Escuchar".

3. Veo cómo Babieca entra desde la derecha.

4. Mientras Babieca entra, sigo viendo MENU.

5. Babieca cruza toda la pantalla.

6. Solo cuando la última “A” empieza a salir por la izquierda:
   - dejo de ver el MENU
   - empiezo a ver aparecer el PLAYER

7. Babieca sale completamente por la derecha.

8. Por primera vez veo PLAYER.
*/

// VARIABLES 
// Btn "Escuchar"
const listenBtn = document.querySelector('.MenuListen-btn')
// Transicion Babieca
const transition = document.querySelector('.Transition')
// Player y menú
const player = document.querySelector('.Player')
const menu = document.querySelector('.Menu')

console.log(listenBtn)
console.log(transition)
console.log(player)
console.log(menu)


// EVENTO
// Añadir clases. Cuando hago click en escuchar se les aplica isListening -> transition entra / menu desaparece / player aparece
listenBtn.addEventListener('click', () => {
    transition.classList.add('isListening')
    menu.classList.add('isListening')
    player.classList.add('isListening')
})

// VARIABLES
// Splash  ->  Cover
const splash = document.querySelector('.Splash')
const cover = document.querySelector('.Cover')
const flash = document.querySelector('.Splash-flash')

console.log(splash)
console.log(cover)
console.log(flash)


// Mientras splash isHidden -> cover isVisible
const showCover = () => {
    console.log('Show cover')

    splash.classList.add("isHidden")
    cover.classList.add("isVisible")
}

// EVENTO 
// Fin de la animación del destello -> cover
flash.addEventListener('animationend', () => {
    console.log('Animación acabada')
    showCover()

    // Splash display none
    splash.addEventListener('transitionend', () => {
        splash.style.display = 'none'
    })
})

// ESTADO
let coverActivo = true

// EVENTO
// Cuando cover isHidden -> menu isVisible
window.addEventListener('wheel', () => {
    if (!coverActivo) return
    cover.classList.add("isHidden")
    menu.classList.add("isVisible")

    document.body.style.overflow = "auto"
    coverActivo = false

})

// VARIABLES
// GALERIA 
const videos = document.querySelectorAll('.PlayerScreen-video')
const dots = document.querySelectorAll('.PlayerSlider-dot')
const prevBtn = document.querySelector('.PlayerArrow--prev')
const nextBtn = document.querySelector('.PlayerArrow--next')
const transitionText = document.querySelector('.TransitionText')


// VARIABLES PARA LA DURACION
const trackName = document.querySelector('.PlayerName')
const trackMin = document.querySelector('.PlayerLenght-min')
const trackSec = document.querySelector('.PlayerLenght-sec')

const tracks = [
    { name: "BABIECA!", duration: "2:46" },
    { name: "Futuros amantes", duration: "2:44" },
    { name: "Full time papi", duration: "2:47" },
    { name: "Puerta del sol", duration: "3:23" },
    { name: "Midsummer pipe dream", duration: "2:37" },
    { name: "Poses", duration: "2:33" },
    { name: "Los chicos del club", duration: "2:29" },
    { name: "Port Pelegrí", duration: "2:33" },
    { name: "Mataleón", duration: "2:46" },
    { name: "Quién teme a la máquina", duration: "1:55" },
    { name: "Sonata nº9 los heavies de Gran Vía", duration: "0:49" },
    { name: "Tramuntana", duration: "3:55" }
]

// VARIABLE BTN MUTE / UNMUTE
const muteBtn = document.querySelector('.PlayerBtn-text')
// ESTADO
let isMuted = false

// ESTADO
let index = 0
// Declaramos el video que esta activo ahora (0=primer video)

videos.forEach(v => v.muted = true)

// PROBANDO TEORÍA DE COPILOT
// FUNCIÓN
function updateTrackInfo(i) {
    const track = tracks[i]

    trackName.textContent = track.name

    const [min, sec] = track.duration.split(':')
    trackMin.textContent = min
    trackSec.textContent = sec
}

// FUNCIÓN
function showVideo(i) {

    // Orden de videos
    if (i < 0) i = videos.length - 1
    if (i >= videos.length) i = 0

    // Si i es menor de 0 esta por detras del video activo o primer video
    // Si i es mayor o = a 0 esta por denlante (si es 12 es el ultimo)

    // Reset
    videos.forEach(v => {
        v.classList.remove('isActive')
        v.muted = true
        v.pause()
        // Importante! para pausar el resto / si no despues de desmutear -se escuharian todos-
    })

    // Antes de activar el correcto tengo que ponerlo a 0 = reiniciarlo
    videos[i].currentTime = 0
    videos[i].play()

    // Activar el correcto
    videos[i].classList.add('isActive')

    // Desmutear el activo / PARA QUE FUNCIONE EL BOTON: isMuted 
    // para que cuando se ha ejecutado el RESET el MUTE funcione -para todos-
    // y -al cambiar de canción-, esta no empiece con -sonido- sino MUTE, 
    videos[i].muted = isMuted

    // Quitar isActive de los puntos
    dots.forEach(dots => dots.classList.remove('isActive'))
    // Activo el correcto
    dots[i].classList.add('isActive')

    // Sirve para guardar el indice actual
    index = i

    updateTrackInfo(i)
}

// EVENTOS
// Flechas reproductor
nextBtn.addEventListener('click', () => {
    showVideo(index + 1)
})

prevBtn.addEventListener('click', () => {
    showVideo(index - 1)
})

// Cuando la transición termina -> el video 1 = play
transition.addEventListener('animationend', () => {
    console.log("animation end en .Transition")

    setTimeout(() => {
        showVideo(0)
    })
})

// AHORA CAMBIAMOS LOS NOMBRES DE LAS CANCIONES
//HAY QUE HACER UN TRACK DE LOS DATOS
// Hay que hacer una funcion mediante la cual los nombres se actualicen  con textContent
// Y como me da los min y sec junto el ":" tengo que separarlos:
// segun Copilot sería con (dentro del function):
// const [min,sec]= track.duration.split(':')
// trackMin.textContent = min
// trackSec.textContent = sec
// Al final de "funtion showVideo" debería añadir "updateTrackInfo(i)""

// AÑADIMOS EL EVENTO CLICK EN MUTE PARA SILENCIAR Y SOBEESCRIBIR EN EL HTML
// LUEGO LA PALABRA MUTE CAMBIA A UNMUTE; lo hacemos igual con textcontent
// COMO ES A TODOS LOS VIDEOS TENDRÁ QUE SER VIDEOS.FOREACH!!!..... V.MUTED = ISMUTED
// Los videos no tienen que tener el estado global cuando no estan activos

muteBtn.addEventListener('click', () => {
    isMuted = !isMuted

    videos.forEach(v => {
        v.muted = isMuted
    })

    // Cambiar la palabra creo que con textContent
    // Si isMuted mostrar "unmute" / si estan sonando mostrar "mute"
    if (isMuted) {
        muteBtn.textContent = "unmute"
    }
    else {
        muteBtn.textContent = "mute"
    }
})








