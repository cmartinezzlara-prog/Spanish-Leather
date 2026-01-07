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

listenBtn.addEventListener ('click', () => {
    transition.classList.add('isListening')
    menu.classList.add('isListening')
    player.classList.add('isListening')
})

