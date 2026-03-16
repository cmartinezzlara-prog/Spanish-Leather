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

    // Reiniciar transición SIEMPRE
    transition.classList.remove('isListening')
    void transition.offsetWidth

    // Muestro la transicion y preparo el Player
    transition.classList.add('isListening')
    menu.classList.add('isListening')
    player.classList.add('isListening')

    // RE-ACTIVAR eventos del PLAYER
    player.style.pointerEvents = "auto"

    // RESETEO EL MUTE AL ENTRAR
    isMuted = false
    muteBtn.textContent = "mute"
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


// AHORA CAMBIAMOS LOS NOMBRES DE LAS CANCIONES
//HAY QUE HACER UN TRACK DE LOS DATOS
// Hay que hacer una funcion mediante la cual los nombres se actualicen  con textContent
// Y como me da los min y sec junto el ":" tengo que separarlos:
// segun Copilot sería con (dentro del function):
// const [min,sec]= track.duration.split(':')
// trackMin.textContent = min
// trackSec.textContent = sec
// Al final de "funtion showVideo" debería añadir "updateTrackInfo(i)""

// PROBANDO TEORÍA DE COPILOT
// FUNCIÓN
function updateTrackInfo(i) {
    const track = tracks[i]

    trackName.textContent = track.name

    const [min, sec] = track.duration.split(':')
    trackMin.textContent = min
    trackSec.textContent = sec
}


// -- SONIDO VIDEOS !! --
// VARIABLE BTN MUTE / UNMUTE
const muteBtn = document.querySelector('.PlayerBtn-text')

// ESTADO
let isMuted = false

// ESTADO
let index = 0

// Declaramos el video que esta activo ahora (0=primer video)
videos.forEach(v => v.muted = isMuted)


// FADE IN Y OUT
// HE TENIDO QUE BUSCAR COMO SE HACE Y EJEMPLOS PARA ELEGIR QUE ESTILO QUERIA
function fadeIn(video, duration = 1800) {
    video.volume = 0
    let step = 0.02
    let interval = duration / (1 / step)

    let fade = setInterval(() => {
        if (video.volume < 1) {
            video.volume = Math.min(1, video.volume + step)
        } else {
            clearInterval(fade)
        }
    }, interval)
}

function fadeOut(video, duration = 400) {
    let step = 0.05
    let interval = duration / (1 / step)

    let fade = setInterval(() => {
        if (video.volume > 0) {
            video.volume = Math.max(0, video.volume - step)
        } else {
            clearInterval(fade)
            video.pause()
        }

    }, interval)
}


// FUNCIÓN
function showVideo(i) {

    // ORDEN DE VÍDEOS
    // Si i es menor de 0 esta por detras del video activo o primer video
    // Si i es mayor o = a 0 esta por denlante (si es 12 es el ultimo)
    if (i < 0) i = videos.length - 1
    if (i >= videos.length) i = 0

    // RESET PARA APAGAR TODOS
    videos.forEach((v, idx) => {
        v.classList.remove('isActive')

        // Antes de activar el correcto tengo que ponerlo a 0 = reiniciarlo 
        v.pause()
        v.muted = true

        // FADE OUT
        if (idx !== i) fadeOut(v)
    })

    const video = videos[i]

    // ACTIVAR el correcto
    videos[i].classList.add('isActive')
    videos[i].currentTime = 0
    // Desmutear el activo / PARA QUE FUNCIONE EL BOTON: isMuted 
    // para que cuando se ha ejecutado el RESET el MUTE funcione -para todos-
    // y -al cambiar de canción-, esta no empiece con -sonido- sino MUTE, 
    // EMPIEZA CON MUTE
    video.muted = true

    video.play().then(() => {

        // Si el usuario NO ha activado mute, hago FADEIN y DESMUTEO
        if (!isMuted) {
            fadeIn(video)
            video.muted = false
        }
    }).catch(err => {
        console.log("Autoplay bloquedo, reintentar", err)
        // Si BLOQUEA mantenemos MUTE y reintentamos
        video.muted = true
        video.play().catch(err2 => {
            console.log("Segundo intento fallido")
        })
    })

    // -- ACTUALIZAR PUNTOS GALERIA!! --
    // DESACTIVAR ISACTIVE puntos
    dots.forEach(dots => dots.classList.remove('isActive'))
    // ACTIVAR punto correcto
    dots[i].classList.add('isActive')

    // GUARDAR INDICE ACTUAL
    index = i

    updateTrackInfo(i)
}



// EVENTOS
// FLECHAS REPRODUCTOR
nextBtn.addEventListener('click', () => {
    startIfNeeded()
    showVideo(index + 1)
})

prevBtn.addEventListener('click', () => {
    startIfNeeded()
    showVideo(index - 1)
})

// Cuando la transición termina -> el video 1 = play
transition.addEventListener('animationend', () => {
    console.log("animation end en .Transition")

    setTimeout(() => {
        showVideo(0)
    })
})

let hasStarted = false

function startIfNeeded() {
    if (!hasStarted) {
        hasStarted = true
    }
}




// AÑADIMOS EL EVENTO CLICK EN MUTE PARA SILENCIAR Y SOBEESCRIBIR EN EL HTML
// LUEGO LA PALABRA MUTE CAMBIA A UNMUTE; lo hacemos igual con textcontent
// COMO ES A TODOS LOS VIDEOS TENDRÁ QUE SER VIDEOS.FOREACH!!!..... V.MUTED = ISMUTED
// Los videos no tienen que tener el estado global cuando no estan activos

muteBtn.addEventListener('click', () => {
    isMuted = !isMuted

    videos[index].muted = isMuted

    // Cambiar la palabra creo que con textContent
    // Si isMuted mostrar "unmute" / si estan sonando mostrar "mute"

    muteBtn.textContent = isMuted ? "unmute" : "mute"
})

//BOTON PARA VOLVER AL MENU PRINCIPAL 
const btnVolver = document.querySelector('.PlayerBack-btn')

btnVolver.addEventListener('click', () => {

    // Oculto el Player
    player.classList.remove('isListening')
    // DESACTIVAR eventos del PLAYER
    player.style.pointerEvents = "none"

    // Muestro el Menu
    menu.classList.add('isVisible')
    menu.classList.remove('isListening')

    // Paramos los videos
    videos.forEach(video => {
        video.pause()
        video.currentTime = 0
    })

    // Reseteo el estado del Player
    index = 0
    isMuted = false
    muteBtn.textContent = "mute"


    // PROBLEMA: CUANDO VOY AL MENU LOS BOTONES DEL PALYER SIGUEN ACTIVOS
    // Esto hace que al darle a Escuchar, al estasr en la misma posicion que la flecha de abajo
    // se clicka y cuando vamos al player, vemos que se esta reproduciendo la segunda cancion...

    // SOLUCION: 
    // ACTIVAR eventos del Player >  player.style.pointerEvents = "auto"; (en ListenBtn.addEventListener...)
    // DESACTIVAR eventos del Player >  player.style.pointerEvents = "none"; (en btnVolver.addEventListener...)


    // PROBLEMA: cuando le doy a volver, luego a escuchar, el primer video no se reproduce ni pasa el babieca
    // Lo que ocurre es que: cuando pulso escuchar por primera vez, añado transition.clasList.add("isListening")
    // la animacion de babieca corre / cuando termina (animationend) se ejecuta showvideo(0) /
    // peeero cuando pulso VOLVER estoy quitando player.isListening pero NO quito transition.isListening...
    // Esto SIGNIFICA QUE: la transición se queda en su estado final / cuando pusle Ecuchar la clase is Listening YA ESTABA PUESTA
    // POR TANTO: NO SE VUELVE A ACTIVAR LA ANIMACION YYY NO SE EJECUTA EL PRIMER VIDEO!!

    // SOLUCIÓN: Pues que pase babieca :) no se como se reinicia la animacion asi que lo buscaré..

    // ACTUALIZACIÓN.. LA VERDAD QUE SI NO PASA BABIECA SE ME COMPLICA TODO MUCHISIMO, MEJOR QUE PASE Y REINICIE EL PLAYER
})



// -- SWIPE PARA IPAD Y MÓVIL - QUITAR COVER / PASAR DE VÍDEO --
// Hay que detectar el swipe desde que se detecta el toque con el el dedo >toqueInicial  
// hasta donde deja de tocar la pantalla para considerarlo un deslizamiento >toqueFinal
// lo consideramos evento >(e)= touchStart / touchEnd

// TOUCHSTART
// - GUARDO POSICION INICIAL
// TOUCHEND
// - BUSCA DONDE TERMINA
// - - SI SUBE -> ACCIÓN ARRIBA (correcto)
// - - SI BAJA -> ACCIÓN ABAJO (incorrecta)

//FUNCIÓN
function addVerticalSwipe(elemento, actionSwipeUp, actionSwipeDown) {

    let startY = 0;
    // DETECTA TOQUE
    elemento.addEventListener("touchstart", (e) => {
        const touchStart = e.touches[0]
        startY = touchStart.clientY
        // GUARDAR POSICIÓN VERTICAL(Y)
    })
    // DEJA DETECTAR TOQUE
    elemento.addEventListener("touchend", (e) => {
        const touchEnd = e.changedTouches[0]
        // GUARDAR POSICIÓN FINAL VERTICAL(Y)

        // Constante (diferenciaY) que determina que:
        const diferenciaY = startY - touchEnd.clientY

        console.log("TOUCHEND detectado. diferenciaY =", diferenciaY)

        // 1.SI el toque es PEQUEÑO (menos 50px) NO se considera SWIPE (umbral de movimiento)
        if (Math.abs(diferenciaY) < 30) return

        // 2.SI fue hacia ARRIBA el resultado es POSITIVO
        if (diferenciaY > 0) {
            if (actionSwipeUp) actionSwipeUp()
        }

        // 3.SI fue hacia ABAJO el resultado es NEGATIVO
        else {
            if (actionSwipeDown) actionSwipeDown()
        }
    })
}

// AHORA LLAMAMOS A LOS ELEMENTOS
addVerticalSwipe(cover, function () {

    if (!coverActivo) return
    cover.classList.add("isHidden")
    menu.classList.add("isVisible")

    document.body.style.overflow = "auto"
    coverActivo = false
})

// Para pasar las canciones del reproductor hay que hacer una variable 
// por la que busque el div llamado .PlayerScreen, donde quiero DETECTAR SWIPE
const pantallaPlayer = document.querySelector(".PlayerScreen")

// SWIPE EN PANTALLA
addVerticalSwipe(pantallaPlayer,
    function () {
        startIfNeeded()
        showVideo(index + 1)
    },
    function () {
        startIfNeeded()
        showVideo(index - 1)
    }
)



// -- PRESAVE!! --
// ACTIVAMOS PRESAVE DESDE BOTON FIXED LATERAL
const presave = document.querySelector('.Presave')
const presaveBtn = document.querySelector('.FixedPresave-btn')
const presaveBack = document.querySelector('.PresaveBack')

console.log(presave)
console.log(presaveBtn)
console.log(presaveBack)


// ESTADO REFERENCIA APERTURA PRESAVE
let presaveFrom = null

// EVENTOS
// ABRIR PRESAVE desde el BOTON LATERAL
presaveBtn.addEventListener('click', () => {
    presaveFrom = "menu"
    presave.classList.add('isVisible')
})


// -- ENLACES HEADER !! --
// ENLACE A MENU (EN MENU Y EN PLAYER)
const menuLinks = document.querySelectorAll('[data-section="menu"]')

const presaveLinks = document.querySelectorAll('[data-section="presave"]')

menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault()

        // OCULTO PLAYER
        player.classList.remove('isListening')

        // OCULTO EL COVER PARA QUE NO SE REPRODUZCA TODO DE NUEVO
        cover.classList.add('isHidden')

        // MUESTRO EL MENU
        menu.classList.add('isVisible')
        menu.classList.remove('isListening')

        // RESETEAMOS EL ESTADO DE LOS VIDEOS
        videos.forEach(video => {
            video.pause()
            video.currentTime = 0
        })

        index = 0
        isMuted = false
        muteBtn.textContent = "mute"
    })
})

presaveLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault()

        // MARCAR ORIGEN PRESAVE
        presaveFrom = "header"

        player.classList.remove('isListening')
        menu.classList.remove('isVisible')
        menu.classList.remove('isListening')

        presave.classList.add('isVisible')

        // NO  RESETEAMOS EL ESTADO DE LOS VIDEOS PORQUE NO SE ACCEDE DESDE PLAYER
    })
})

// CERRAR desde el PRESAVE con BOTON BACK
presaveBack.addEventListener('click', () => {
    presave.classList.remove('isVisible')

    if (presaveFrom === "header"){
        menu.classList.add('isVisible')
        menu.classList.remove('isListening')
    }
})



//13/03 ME HE CARGADO LA REPRODUCCION DEL PLAYER EN EL ORDENADOR :((((((
//16/03 VOY A LIMPIAR BIEN EL JS PARA ELIMINAR REPETICION DE ACCIONES QUE GENERAN FALLOS GRANDES