
// ELEMENTOS PRINCIPALES

const menu = document.querySelector(".menu");
const stages = document.querySelectorAll(".stage");

const galeria = document.querySelector(".galeria");
const fotos = document.querySelector(".fotos");

const tituloFoto = document.getElementById("titulo-foto");
const textoFoto = document.getElementById("texto-foto");

const audioPisadas = document.getElementById("audio-pisadas");
const audioDrifting = document.getElementById("audio-drifting");
const audioEateot = document.getElementById("audio-eateot");

// Función para usar porcentajes
function volumen(audio, porcentaje) {
    audio.volume = porcentaje / 100;
}
// VOLÚMENES

volumen(audioPisadas, 100);
volumen(audioDrifting, 30);
volumen(audioEateot, 0);

// INICIAR TODOS LOS AUDIOS

let audioIniciado = false;

document.addEventListener("click", () => {

    if (audioIniciado) return;

    audioIniciado = true;

    audioPisadas.play();
    audioDrifting.play();
    audioEateot.play();

}, { once: true });

// GUARDAR FOTOGRAFÍAS ORIGINALES

const fotosOriginales = fotos.innerHTML;

// ESTADO DE LA GALERÍA

let indiceFoto = 0;
let ocupado = false;


const stagesData = {

    1: {
        fotos: [
            "biblia.jfif",
            "juan.jfif",
            "apokalypsis.jfif"
        ],

        descripciones: [
            {
                titulo: "Apocalipsis",
                texto: "El libro de apocalipsis es el último libro del nuevo testamento, y el último libro de la biblia."
            },
            {
                titulo: "Juan",
                texto: "Es el escritor del libro, escrito mientras estaba exiliado en la isla de Patmos, en el mar Egeo."
            },
            {
                titulo: "<<Apocalipsis>>",
                texto: "Viene del griego ἀποκάλυψις, que significa 'revelación' o 'desvelamiento'."
            }
        ]
    },

    2: {
        fotos: [
            "4 jinetes.jpg",
            "7 sellos.jpg",
            "7 trompetas.png"
        ],

        descripciones: [
            {
                titulo: "Los 4 jinetes del apocalipsis",
                texto: "Los 4 jinetes del apocalipsis son una alegoría de la guerra, el hambre, la peste y la muerte, que aparecen en el libro de apocalipsis."
            },
            {
                titulo: "Los 7 sellos",
                texto: "Los 7 sellos son símbolos de la revelación divina en el libro de apocalipsis."
            },
            {
                titulo: "Las 7 trompetas",
                texto: "Las 7 trompetas son señales de advertencia en el libro de apocalipsis."
            }
        ]
    },

    3: {
        fotos: [
            "juicio final.jpg",
            "nueva jerusalem.jpg",
            "bien vs mal.jfif"
        ],

        descripciones: [
            {
                titulo: "El juicio final",
                texto: "El juicio final es un concepto religioso que se refiere a la evaluación de las acciones de las personas después de su muerte."
            },
            {
                titulo: "La nueva Jerusalén",
                texto: "La nueva Jerusalén es una ciudad celestial que aparece en el libro de apocalipsis como el lugar donde Dios morará con los humanos."
            },
            {
                titulo: "El bien contra el mal",
                texto: "El bien y el mal representan las dos fuerzas opuestas en la lucha espiritual descrita en el libro de apocalipsis."
            }
        ]
    }

};

// ACTUALIZAR DESCRIPCIÓN

function actualizarDescripcion() {
    const datos = stagesData[menu.dataset.stage];

    tituloFoto.textContent = datos.descripciones[indiceFoto].titulo;
    textoFoto.textContent = datos.descripciones[indiceFoto].texto;
}

// INICIAR UN STAGE

stages.forEach(stage => {

    stage.addEventListener("click", () => {

        // Quitar el enfoque del botón
        stage.blur();

        indiceFoto = 0;
        ocupado = false;

        menu.dataset.stage = stage.dataset.stage;

       const datos = stagesData[stage.dataset.stage];

fotos.innerHTML = datos.fotos.map((ruta, i) => `
    <div class="foto">
        <img src="${ruta}" alt="Fotografía ${i + 1}">
    </div>
`).join("");

actualizarDescripcion();

galeria.querySelector(".descripcion").classList.remove("oculta");

menu.classList.add("modo-stage");

// CAMBIAR MEZCLA DE AUDIO

volumen(audioPisadas, 80);
volumen(audioDrifting, 0);
volumen(audioEateot, 10);
    });

});

// CAMBIAR FOTOGRAFÍA CON ENTER

document.addEventListener("keydown", event => {

    if (event.key !== "Enter") return;

    if (!menu.classList.contains("modo-stage")) return;

    // Evitar activaciones repetidas del botón
    event.preventDefault();

    if (event.repeat || ocupado) return;

    ocupado = true;

    const fotoActual = fotos.children[0];

    // Ocultar descripción
    galeria.querySelector(".descripcion").classList.add("oculta");

    // Hacer caer fotografía
    fotoActual.classList.add("cayendo");

    // Esperar a que termine la animación
    fotoActual.addEventListener("animationend", () => {

        fotoActual.remove();

        indiceFoto++;

        // ¿Quedan fotografías?
        if (indiceFoto < 3) {

            actualizarDescripcion();

            galeria.querySelector(".descripcion").classList.remove("oculta");

            ocupado = false;

        } else {

            // Regresar al menú
            menu.classList.remove("modo-stage");

  // REGRESAR MEZCLA DE AUDIO

volumen(audioPisadas, 100);
volumen(audioDrifting, 30);
volumen(audioEateot, 0);

            delete menu.dataset.stage;

            setTimeout(() => {

                fotos.innerHTML = fotosOriginales;

indiceFoto = 0;
actualizarDescripcion();

galeria.querySelector(".descripcion").classList.remove("oculta");

ocupado = false;

            }, 700);

        }

    }, { once: true });

});
