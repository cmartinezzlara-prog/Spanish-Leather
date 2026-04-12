"use strict"

    (function () {






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

        // Secciones principales
        const player = document.querySelector('.Player')
        const menu = document.querySelector('.Menu')
        const splash = document.querySelector('.Splash')
        const cover = document.querySelector('.Cover')
        const presave = document.querySelector('.Presave')
        const tour = document.querySelector('.Tour')
        const info = document.querySelector('.Info')

        // Splash
        const flash = document.querySelector('.Splash-flash')


        console.log(listenBtn)
        console.log(transition)

        console.log(player)
        console.log(menu)
        console.log(splash)
        console.log(cover)
        console.log(flash)

        // ESTADO
        let coverActivo = false

        // VARIABLES
        // Splash  ->  Cover
        // Mientras splash isHidden -> cover isVisible
        const showCover = () => {
            console.log('Show cover')

            splash.classList.add("isHidden")
            cover.classList.add("isVisible")
            coverActivo = true
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

            setTimeout(() => {
                hideCover()
            }, 5000)
        })





        function hideCover() {
            if (!coverActivo) return

            cover.classList.add("isHidden")
            menu.classList.add("isVisible")

            document.body.style.overflow = "auto"
            coverActivo = false
        }

        // EVENTO
        // Cuando cover isHidden -> menu isVisible
        window.addEventListener('wheel', () => {
            hideCover()
        }, { passive: true })


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

        // LEVANTAR COVER CON UN TOQUE
        cover.addEventListener("touchstart", () => {
            hideCover()
        }, { passive: true })


        cover.addEventListener("click", () => {
            hideCover()
        })

        // FELCHA SCROLL FUNCIONA COMO DIRECTO
        const arrowCover = document.querySelector('.CoverBottom-scroll')

        arrowCover.addEventListener('click', () => {
            hideCover()
        })



        //FUNCIÓN
        function addVerticalSwipe(elemento, actionSwipeUp, actionSwipeDown) {
            let startY = 0;
            let isSwiping = false

            // DETECTA TOQUE
            elemento.addEventListener("touchstart", (e) => {
                if (!e.touches || e.touches.length === 0) return


                // GUARDAR POSICIÓN VERTICAL(Y) startY = e.touches[0].clientY
                startY = e.touches[0].clientY

                isSwiping = true
            }, { passive: true })


            elemento.addEventListener("touchmove", () => {
                if (!isSwiping) return

            }, { passive: true })


            // DEJA DETECTAR TOQUE
            elemento.addEventListener("touchend", (e) => {
                if (!isSwiping) return
                isSwiping = false

                // Constante (diferenciaY) que determina que:
                if (!e.changedTouches || e.changedTouches.length === 0) return
                const endY = e.changedTouches[0].clientY
                const diferenciaY = startY - endY
                console.log("SWIPE detectado. diferenciaY =", diferenciaY)

                // 1.SI el toque es PEQUEÑO (menos 50px) NO se considera SWIPE (umbral de movimiento)
                if (Math.abs(diferenciaY) < 40) return

                // 2.Hago callbacks opcionales
                if (diferenciaY > 0) {
                    if (typeof actionSwipeUp === "function") actionSwipeUp()
                } else {
                    if (typeof actionSwipeDown === "function") actionSwipeDown()
                }
            }, { passive: true })
        }






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







        // -- SONIDO VIDEOS !! --
        // VARIABLE BTN MUTE / UNMUTE
        const muteBtn = document.querySelector('.PlayerBtn-text')
        // ESTADOS
        let isMuted = false
        let index = 0







        // Metemos un addeventlistener mute btn click 
        // isMuted =!ismuted
        // muteBtn.textContent =ismuted ?"unmute":"mute"
        // Aplicamos el estado de mute > BUSCAR

        // ------ FUNCIÓN MUTESTATE!!!! -----
        function applyMuteState() {
            videos.forEach((video, i) => {
                video.muted = isMuted || i !== index

                // si le hemos dado a desmutear
                if (!isMuted) {
                    //y declaramos que este el video en el que estamos / el activo
                    if (i === index) {
                        //lo ponemos en volumen
                        video.volume = 1
                    }
                }
            })
        }







        // AÑADIMOS EL EVENTO CLICK EN MUTE PARA SILENCIAR Y SOBEESCRIBIR EN EL HTML
        // LUEGO LA PALABRA MUTE CAMBIA A UNMUTE; lo hacemos igual con textcontent
        // COMO ES A TODOS LOS VIDEOS TENDRÁ QUE SER VIDEOS.FOREACH!!!..... V.MUTED = ISMUTED
        // Los videos no tienen que tener el estado global cuando no estan activos

        muteBtn.addEventListener('click', () => {
            isMuted = !isMuted

            // Cambiar la palabra creo que con textContent
            // Si isMuted mostrar "unmute" / si estan sonando mostrar "mute"
            muteBtn.textContent = isMuted ? "unmute" : "mute"
            applyMuteState()
        })







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
            videos.forEach((video, idx) => {
                video.classList.remove('isActive')

                // Antes de activar el correcto tengo que ponerlo a 0 = reiniciarlo 
                video.pause()

                // FADE OUT
                if (idx !== i) fadeOut(video)
            })

            const video = videos[i]

            // ACTIVAR el correcto
            videos[i].classList.add('isActive')
            videos[i].currentTime = 0
            // Desmutear el activo / PARA QUE FUNCIONE EL BOTON: isMuted 
            // para que cuando se ha ejecutado el RESET el MUTE funcione -para todos-

            // GUARDAR INDICE ACTUAL
            index = i
            applyMuteState()

            video.play().then(() => {

                // Si el usuario NO ha activado mute, hago FADEIN y DESMUTEO
                if (!isMuted) {
                    fadeIn(video)
                }
            })

            // -- ACTUALIZAR PUNTOS GALERIA!! --
            // DESACTIVAR ISACTIVE puntos
            dots.forEach(dots => dots.classList.remove('isActive'))
            // ACTIVAR punto correcto
            dots[i].classList.add('isActive')

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








        // EVENTO
        // Añadir clases. Cuando hago click en escuchar se les aplica isListening -> transition entra / menu desaparece / player aparece
        listenBtn.addEventListener('click', () => {

            // Reiniciar transición SIEMPRE
            transition.classList.remove('isListening')
            void transition.offsetWidth

            player.classList.remove('isHidden')

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







        //BOTON PARA VOLVER AL MENU PRINCIPAL 
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
        const btnVolver = document.querySelector('.PlayerBack-btn')
        btnVolver.addEventListener('click', () => {
            console.log("volver a menu")
            showSection("menu")
        })










        // Para pasar las canciones del reproductor hay que hacer una variable 
        // por la que busque el div llamado .PlayerScreen, donde quiero DETECTAR SWIPE
        const pantallaPlayer = document.querySelector(".PlayerScreen")

        // SWIPE EN PANTALLA
        addVerticalSwipe(pantallaPlayer, () => {
            if (!player.classList.contains('isListening')) return
            startIfNeeded()
            showVideo(index + 1)
        }, () => {
            if (!player.classList.contains('isListening')) return
            startIfNeeded()
            showVideo(index - 1)
        })







        // -- PRESAVE!! --
        // ACTIVAMOS PRESAVE DESDE BOTON FIXED LATERAL
        const presaveBtn = document.querySelector('.FixedPresave-btn')
        const presaveBack = document.querySelector('.PresaveBack')

        console.log(presaveBtn)
        console.log(presaveBack)

        presaveBtn.addEventListener('click', () => {
            showSection("presave")
        })

        // CERRAR desde el PRESAVE con BOTON BACK
        presaveBack.addEventListener('click', () => {
            showSection("menu")
        })





        // SHOWSECTION
        const sections = {
            cover,
            menu,
            player,
            presave,
            tour,
            info
        }

        function resetPlayer() {
            videos.forEach(video => {
                video.pause()
                video.currentTime = 0

            })

            index = 0
            isMuted = false
            muteBtn.textContent = "mute"
            applyMuteState()
            hasStarted = false


            //PARA QUITAR LOS ESTADOS AL DARLE A MENU O VOLVER
            player.classList.remove('isListening')
            // player.classList.add('isHidden')
            menu.classList.remove('isListening')
            transition.classList.remove('isListening')

            player.style.pointerEvents = "none"
        }





        function showSection(name) {
            console.log("showSection llamada con:", name)

            Object.entries(sections).forEach(([key, el]) => {
                if (!el) return

                const active = key === name
                el.classList.toggle('isVisible', active)
                el.classList.toggle('isHidden', !active)


                // buscar como se crea una const que haga toggle con los dos estados
            })

            if (name !== 'player') {
                console.log("Reset pq si no peta")
                resetPlayer()

                // vale a ver hacemos el funtion del player
            }
        }

        document.querySelectorAll('[data-goto]').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault()

                const target = link.dataset.goto
                console.log("Ir a:", target)
                showSection(target)
            })
        })



        // ---- CONCIERTOS TOUR ----
        // ARRAY ( le voy a pedir a cht gpt que me rellene los cmapos de la base de mi array con la lista de conciertos)
        const tourDates = [
            { ciudad: "Argentina", local: "Lollapalooza Argentina", fecha: "13 marzo 2026", fechaCorta: "13/03/26", estado: "SOLD-OUT" },
            { ciudad: "Santiago de Chile", local: "Lollapalooza Chile", fecha: "14 marzo 2026", fechaCorta: "14/03/26", estado: "SOLD-OUT" },
            { ciudad: "Sao Paolo", local: "Fabrique", fecha: "19 marzo 2026", fechaCorta: "19/03/26", estado: "SOLD-OUT" },
            { ciudad: "Bogotá", local: "Estéreo Picnic", fecha: "21 marzo 2026", fechaCorta: "21/03/26", estado: "SOLD-OUT" },
            { ciudad: "Lima", local: "CC. Leguía", fecha: "25 marzo 2026", fechaCorta: "25/03/26", estado: "TICKETS" },
            { ciudad: "Monterrey", local: "Tecate Pal Norte", fecha: "27 marzo 2026", fechaCorta: "27/03/26", estado: "SOLD-OUT" },
            { ciudad: "Benicassim", local: "SanSan", fecha: "03 abril 2026", fechaCorta: "03/04/26", estado: "SOLD-OUT" },
            { ciudad: "Milan", local: "Fabrique", fecha: "10 abril 2026", fechaCorta: "10/04/26", estado: "TICKETS" },
            { ciudad: "Berlín", local: "Metropol", fecha: "11 abril 2026", fechaCorta: "11/04/26", estado: "TICKETS" },
            { ciudad: "Murcia", local: "Warm Up", fecha: "01 mayo 2026", fechaCorta: "01/05/26", estado: "SOLD-OUT" },
            { ciudad: "Barcelona", local: "Primavera Sound", fecha: "03 junio 2026", fechaCorta: "03/06/26", estado: "TICKETS" },
            { ciudad: "Vilanova i la Geltrú", local: "Vida Festival", fecha: "03 julio 2026", fechaCorta: "03/07/26", estado: "TICKETS" },
            { ciudad: "Málaga", local: "Plaza de toros de Málaga", fecha: "11 julio 2026", fechaCorta: "11/07/26", estado: "TICKETS" },
            { ciudad: "Santander", local: "Santander Music", fecha: "31 julio 2026", fechaCorta: "31/07/26", estado: "SOLD-OUT" },
            { ciudad: "Chiclana de la F.", local: "Concert Music Festival", fecha: "09 agosto 2026", fechaCorta: "09/08/26", estado: "TICKETS" },
            { ciudad: "Zaragoza", local: "Vive Latino", fecha: "05 septiembre 2026", fechaCorta: "05/09/26", estado: "SOLD-OUT" },
            { ciudad: "Madrid", local: "Movistar Arena", fecha: "02 octubre 2026", fechaCorta: "02/10/26", estado: "TICKETS" }
        ]

        const tourUl = document.querySelector('.TourUl')
        const visibleRows = 7
        // Marco el indice inicial 
        let startIndex = 0

        // ESTADOS ENTRADAS TOUR
        function loadDates() {
            // LIMPIAR
            tourUl.innerHTML = ""

            tourDates.forEach(date => {
                const li = document.createElement('li')
                li.classList.add('TourItem')

                // Para que coja el estado y se pongan los nuevos estilos
                // vale pero el texto tiene que ser entradas pq es lo que hay escrito
                // NewState no esxiste en js tiene que ser toLowerCase
                const estado = date.estado.toLowerCase()
                if (estado.includes("tickets")) {
                    li.classList.add("TourItem--tickets")
                }

                if (estado.includes("sold")) {
                    li.classList.add("TourItem--soldout")
                }

                li.innerHTML = `
        <span>${date.ciudad}</span>
        <span>${date.local}</span>
        <span class="TourFecha">${date.fecha}</span>
        <span class="TourFechaCorta">${date.fechaCorta}</span>
        <span>${date.estado}</span>`

                tourUl.appendChild(li)
            })
        }


        function updateVisibleRows() {
            const items = document.querySelectorAll('.TourItem')

            items.forEach((item, i) => {
                if (i >= startIndex && i < startIndex + visibleRows) {
                    item.style.display = "grid"
                } else {
                    item.style.display = "none"
                }
            })
        }

        loadDates()
        updateVisibleRows()


        // FELCHAS
        const arrowUp = document.querySelector('.TourArrow--prev')
        const arrowDown = document.querySelector('.TourArrow--next')

        // FUNCION
        // SI startIndex es mayor que 0 startIndex=startIndex -1 / y actualizamos las lineas visibles
        function scrollUp() {
            console.log("flecha arriba")
            if (startIndex > 0) {
                startIndex = startIndex - 1
                updateVisibleRows()
            }
        }

        function scrollDown() {
            console.log("flecha abajo")

            if (startIndex < tourDates.length - visibleRows) {
                startIndex = startIndex + 1
                updateVisibleRows()
            }
        }

        arrowUp.addEventListener('click', scrollUp)
        arrowDown.addEventListener('click', scrollDown)




        // INFO SECTION
        const infoBtns = document.querySelectorAll('.InfoBtn')
        const infoBack = document.querySelector('.InfoBack')
        const infoSection = document.querySelector('.Info')

        infoBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                infoSection.classList.add('isVisible')
                infoSection.classList.remove('isHidden')
            })
        })

        infoBack.addEventListener('click', () => {
            infoSection.classList.remove('isVisible')
        })









        // **** MENÚ HAMBURGUESA MÓVIL ****
        // VARIABLES
        const headerHams = document.querySelectorAll('.HeaderHam')
        const mobileMenu = document.querySelector('.MobileMenu')
        const mobileOverlay = document.querySelector('.MobileOverlay')
        const mobileLinks = document.querySelectorAll('.MobileMenu a')

        // ABRIR MENÚ MÓVIL
        function openMobileMenu() {
            mobileMenu.classList.add('isOpen')
            mobileOverlay.classList.add('isOpen')
            headerHams.forEach(ham => ham.classList.add('isOpen'))
        }

        // CERRAR MENÚ MÓVIL
        function closeMobileMenu() {
            mobileMenu.classList.remove('isOpen')
            mobileOverlay.classList.remove('isOpen')
            headerHams.forEach(ham => ham.classList.remove('isOpen'))
        }


        // ACCIÓN CLICK EN HAMBURGUESA
        headerHams.forEach(ham => {
            ham.addEventListener('click', () => {
                const open = mobileMenu.classList.contains('isOpen')

                if (open) {
                    closeMobileMenu()
                } else {
                    openMobileMenu()
                }
            })
        })


        // OVERLAY
        mobileOverlay.addEventListener('click', () => {
            closeMobileMenu()
        })

        // ENLACES
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu()
            })
        })



       
    })()
