"use strict"


/*
1. Estoy en el menú.

2. Pulso Escuchar.

3. Veo cómo Babieca entra desde la derecha.

4. Mientras Babieca entra, sigo viendo el menú.

5. Babieca cruza toda la pantalla.

6. Solo cuando la última “A” empieza a salir por la izquierda:
   - dejo de ver el menú
   - empiezo a ver aparecer el Player por detrás

7. Babieca sale completamente por la derecha.

8. Por primera vez veo el Player limpio.
*/



const listenBtn = document.querySelector('.MenuListen-btn')
const transition = document.querySelector('.Transition')
const player = document.querySelector('.Player')
const menu = document.querySelector('.Menu')

console.log(listenBtn)
console.log(transition)
console.log(player)
console.log(menu)

listenBtn.addEventListener('click', () => {
    transition.classList.add('isListening')
    menu.classList.add('isListening')
    player.classList.add('isListening')
})

//Splash  ->  Cover
const splash = document.querySelector('.Splash')
const cover = document.querySelector('.Cover')
const flash = document.querySelector('.Splash-flash')


console.log(splash)
console.log(cover)
console.log(flash)

const showCover = () => {
    console.log('Show cover')

    splash.classList.add("isHidden")
    cover.classList.add("isVisible")
}

flash.addEventListener('animationend', () => {
    console.log('Animación acabada')
    showCover()

    splash.addEventListener('transitionend', () => {
        splash.style.display = 'none'
    })
})
//animacion 4s acabada = "animationend"


//cuando cover lleva 3s = translateY 2s (arriba completo) + Cover-stars/layout opcity 0 1.2s 
// const showMenu = () =>{
//     console.log('Show menu')

//     cover.style.opacity
// }

let coverActivo = true

window.addEventListener('wheel', () => {
    if (!coverActivo) return
    cover.classList.add("isHidden")
    menu.classList.add("isVisible")

    document.body.style.overflow = "auto"
    coverActivo = false

})


// GALERIA 
const videos = document.querySelectorAll('.PlayerScreen-video')
const dots = document.querySelectorAll('.PlayerSlider-dot')
const prevBtn = document.querySelector('.PlayerArrow--prev')
const nextBtn = document.querySelector('.PlayerArrow--next')

let index = 0
//declaramos el video que esta activo ahora (0=primer video)

function showVideo(i) {

    if (i < 0) i = videos.length - 1
    if (i >= videos.length) i = 0

    //si i es menor de 0 esta por detras del video activo o primer video
    // si i es mayor o = a 0 esta por denlante (si es 12 es el ultimo)

    videos.forEach(v => v.classList.remove('isActive'))

    //antes de activar el correcto tengo que ponerlo a 0
    videos[i].currentTime = 0
    videos[i].play()

    //activar el correcto
    videos[i].classList.add('isActive')

    //quitar isActive de los puntos
    dots.forEach(dots => dots.classList.remove('isActive'))

    //activo el correcto
    dots[i].classList.add('isActive')

    //sirve para guardar el indice actual
    index = i
}

nextBtn.addEventListener('click', () => {
    showVideo(index + 1)
})

prevBtn.addEventListener('click', () => {
    showVideo(index - 1)
})

showVideo(0)




