const albumsId = ["11205422", "534017402", "544892012", "420845567", "6327742", "112217392", "6157080", "74872972", "11205422", "534017402", "544892012", "420845567", "6327742", "112217392", "6157080", "74872972"];
const carouselRow = document.getElementById('carousel');
const cardsAlbumRow = document.getElementById('cardsAlbum')
const loading = document.getElementById("loading");
const loader = document.getElementById("loader");


let trackDataArray = [];  //variabili utili per la riproduzione delle tracce nel player, quando seleziono un album
let indexCurrentTrack = 0;
let tracks;

const shuffleButton = document.getElementById('shuffleButton');
let flagShuffle = false;
let flagLoop = false;


window.onload = function () {
    initTracks()
    player();
    buildCarouselItems()
}

const player = function () {
    const audio = document.getElementById('audio');
    const rangeAudio = document.getElementById('rangeAudio');
    const currentDuration = document.getElementById('currentDuration');
    const maxDuration = document.getElementById('maxDuration');
    const playIcon = document.getElementById('play');
    const resetButton = document.getElementById('resetButton');
    const volumeControl = document.getElementById('volumeControl');
    const loopButton = document.getElementById('loopButton');
    //vado a prendere la durata della canzone
    rangeAudio.value = 0
    rangeAudio.max = Math.floor(audio.duration);
    maxDuration.innerText = formatTime(audio.duration);


    // va a prendere la durata massima dell'audio
    audio.addEventListener('loadedmetadata', () => {
        rangeAudio.max = Math.floor(audio.duration);
        maxDuration.innerText = formatTime(audio.duration);
    });

    // aggiorna il valore del rangr in base a quello corrente del audio
    audio.addEventListener('timeupdate', () => {
        rangeAudio.value = Math.floor(audio.currentTime);
        currentDuration.innerText = formatTime(audio.currentTime);
    });

    // quando l'input cambia
    rangeAudio.addEventListener('input', () => {
        audio.currentTime = rangeAudio.value;
    });

    // Quando si resetta, finisce, passa a valore zero si resetta
    audio.addEventListener('ended', () => {
        if(tracks.length >1 && flagLoop === false) {
            playTrack()
        } else {
            rangeAudio.value = 0;
            audio.play()
        }
    });


    // Gestore dell'evento click per il pulsante di reset
    resetButton.addEventListener('click', () => {
        audio.currentTime = 0; // Riporta la riproduzione all'inizio
        if (audio.paused) {
            audio.pause(); // Mette in pausa l'audio se è in riproduzione
            playIcon.classList.remove('bi-pause-circle-fill');
            playIcon.classList.add('bi-play-circle-fill');
        }
    });


    // Gestore dell'evento input per il controllo del volume
    volumeControl.addEventListener('input', () => {
        const volumeValue = parseFloat(volumeControl.value);

        // Verifica che il valore sia nell'intervallo [0, 1]
        if (volumeValue < 0 || volumeValue > 1) {
            console.error('Volume value out of range:', volumeValue);
        } else {
            audio.volume = volumeValue;
        }
    });


    // Funzione per formattare il tempo
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }


    function pausePLay() {
        if (audio.paused) {
            audio.play(); // Riproduce l'audio se è in pausa
            playIcon.classList.remove('bi-play-circle-fill');
            playIcon.classList.add('bi-pause-circle-fill');
        } else {
            audio.pause(); // Pausa l'audio se è in riproduzione
            playIcon.classList.remove('bi-pause-circle-fill');
            playIcon.classList.add('bi-play-circle-fill');
        }
    }

    // Gestore di evento per il clic sull'icona di riproduzione
    playIcon.addEventListener('click', () => {
        pausePLay()
    });


    // Definisci la funzione da eseguire quando viene premuto il tasto spazio
    function handleSpacebarPress(event) {
        if (event.key === ' ' || event.key === 'Spacebar') {
            event.preventDefault(); // Previene il comportamento predefinito (es. scorrimento della pagina)
            pausePLay()
        }
    }
    document.addEventListener('keydown', handleSpacebarPress);


    shuffleButton.addEventListener('click', () => {
        if(flagShuffle === false) {
            tracks = shuffle(tracks); // Mescola l'array tracks
            shuffleButton.style.color = "#1ED760"
            flagShuffle = true
        } else {
            flagShuffle = false
            shuffleButton.style.color = "white"
        }
    })


    loopButton.addEventListener('click', () => {
        if(flagLoop === false) {
            loopButton.style.color = "#1ED760"
            flagLoop = true
        } else {
            flagLoop = false
            loopButton.style.color = "white"
        }
    })

}



//-------------------------------------------------------
const albumData = function (type, album) {
    const apiKey = `https://striveschool-api.herokuapp.com/api/deezer/${type}/${album}`;
    loading.style.display = 'block';

    fetch(apiKey)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('No Album No party');
            }
        })
        .then((dataAlbum) => {
            console.log('Data Album', dataAlbum);
            // const arrayAlbum = Array.from(dataAlbum)
            const albumtracks = Array.from(dataAlbum.tracks.data);
            buildCarousel(albumtracks);
            createAlbumCards(albumtracks)

        })
        .catch((error) => {
            console.error('Errore:', error);
        })
        .finally(() => {
            loading.style.display = "none";
        })
}


function buildCarouselItems() {
    albumsId.forEach(e => {
        albumData("album", e);
    })
}


//----------------------------------------------------------------------
function buildCarousel(datasetArray) {
    function truncate(text, maxLength) {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    }

    datasetArray.forEach((element) => {
        const active = document.querySelectorAll(".carousel-item").length < 1 ? "active" : "";
        const escapedElement = JSON.stringify(element).replace(/"/g, '&quot;'); // Serve per portarmi l'array nella funzione per gestire il lettore
        carouselRow.innerHTML += `
            <div class="carousel-item ${active}">
                <div class="row p-3 pb-0">
                    <div class="col-3 mt-3"><img src="${element.album.cover_medium}" alt="imgprova" class="w-100"></div>
                    <div class="col-7">
                        <h6 class="fs-supersmall">ALBUM</h6>
                        <h1>${truncate(element.title_short, 17)}</h1>
                        <p class="fs-small">${element.album.title}</p>
                        <p class="fs-small mb-0">${convertDuration(element.duration)}</p>
                        <div class="w-100 d-flex align-items-center">
                            <button onclick='playerCarousel(${escapedElement})' class="btn btn-sm bg-primary rounded-5 px-4 py-2 me-3 h-25 fw-bold text-black">Play</button>
                            <button class="btn btn-sm bg-black text-white rounded-5 px-4 py-2 me-3 h-25 border border-white border-1">Salva</button>
                            <p class="fs-1">...</p>
                        </div>
                    </div>
                    <div class="col-2">
                        <button disabled class="btn text-gray2 bg-grayground fs-supersmall rounded-5 border-0">NASCONDI ANNUNCI</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function  playerCarousel(element) {
    indexCurrentTrack = 0;
    const playIcon = document.getElementById('play');  //vado a mettere il bottone in riproduzione
    playIcon.classList.remove('bi-play-circle-fill');
    playIcon.classList.add('bi-pause-circle-fill');
    const titlePlayer = document.getElementById('titlePlayer')  //vado a prendere gli elementi da cambiare all'interno del player
    const artistPlayer = document.getElementById('artistPlayer')
    const imgPlayer = document.getElementById('imgPlayer')

    const audioElement = document.getElementById('audio'); // Cambia la sorgente dell'audio
    const sourceElement = audioElement.querySelector('source');

    sourceElement.src = element.preview; //imposta il nuvo URL
    titlePlayer.innerText = element.title_short   //cambia nel cose nel DOM del palyer
    artistPlayer.innerText = element.artist.name
    imgPlayer.src = element.album.cover_small

    audioElement.load();
    audioElement.play(); 
}




// Funzione per creare le card____________________________________________
function createAlbumCards(track) {
    // Aggiungi il track al trackDataArray e ottieni l'indice
    const trackIndex = trackDataArray.length;
    trackDataArray.push(track);

    cardsAlbumRow.innerHTML += `
        <div class="col-12 col-md-3 mb-3 rounded scaleHover"
          <div class="card w-25 " >
          <div class="position-relative">
            <img src="${track[0].album.cover_medium}" class="card-img-top rounded mt-2" alt="img album" >  
            <button type="button" class="btn btn-primary circle-button position-absolute bottom-10 end-5  d-none rounded-circle "><i class="bi bi-play-fill fs-4" onclick="playerTracks(${trackIndex})"></i></button>
            </div>        
            
            <div class="card-body d-none">
                <h5 class="card-title my-2 truncateText"><a href = "album.html/?albumid=${track[0].album.id}"  class="text-decoration-none text-white">${track[0].album.title}</a></h5>
                <p class="card-text mb-4 fs-small "><a href = "artist.html/?artistid=${track[0].artist.id}" class="text-decoration-none text-white">${track[0].artist.name}</a></p>
            </div>
        </div>`

}


// Funzione per gestire la riproduzione delle tracce, qui avrò tutte le tracce. Si attiva quando premo l'immagine
function playerTracks(index) {
    if(flagShuffle === true) {
        tracks = shuffle(tracks); // Mescola l'array tracks
    }
    indexCurrentTrack = 0;
    tracks = trackDataArray[index];
    console.log(tracks);
    playTrack()
}


document.getElementById('nextTrack').addEventListener('click', () => { //evento quando vado alla canzone successiva
    playTrack()
})

//Qui vado a prendere un album. Album iniziale
function initTracks() {
    albumDataIni("album", "6327742");
}

function albumDataIni(type, albumId) {  //vado a fare una fetch per andare a prender el'album
    const apiKey = `https://striveschool-api.herokuapp.com/api/deezer/${type}/${albumId}`;

    fetch(apiKey)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('No Album No party');
            }
        })
        .then((dataAlbum) => {
            const albumtracks = Array.from(dataAlbum.tracks.data);
            tracks = albumtracks
            playPlayTrack()
        })
        .catch((error) => {
            console.error('Errore:', error);
        });
}


//-----------------------------------------------------------
function playTrack() {
    const playIcon = document.getElementById('play');  //vado a mettere il bottone in riproduzione
    playIcon.classList.remove('bi-play-circle-fill');
    playIcon.classList.add('bi-pause-circle-fill');
    const audioElement = document.getElementById('audio'); // Cambia la sorgente dell'audio

    playPlayTrack()
    // Ricarica l'audio e riproduci
    audioElement.load();
    audioElement.play();
}

function playPlayTrack() {
    const titlePlayer = document.getElementById('titlePlayer')  //vado a prendere gli elementi da cambiare all'interno del player
    const artistPlayer = document.getElementById('artistPlayer')
    const imgPlayer = document.getElementById('imgPlayer')

    const audioElement = document.getElementById('audio'); // Cambia la sorgente dell'audio
    const sourceElement = audioElement.querySelector('source');

    if (indexCurrentTrack >= tracks.length) {
        indexCurrentTrack = 0;  // Resetta l'indice alla prima traccia
    }

    sourceElement.src = tracks[indexCurrentTrack].preview; //imposta il nuvo URL
    titlePlayer.innerText = tracks[indexCurrentTrack].title_short   //cambia nel cose nel DOM del palyer
    artistPlayer.innerText = tracks[indexCurrentTrack].artist.name
    imgPlayer.src = tracks[indexCurrentTrack].album.cover_small
    imgPlayer.classList.remove("d-none")
    loader.style.display = "none";


    indexCurrentTrack++; //aggiorna l'index per poi andare alla prossima traccia, quando si preme il pulsante
}



const convertDuration = function (seconds) {
    const minutes = Math.floor(seconds / 60) < 10 ? "0" + Math.floor(seconds / 60) : Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60 < 10 ? "0" + seconds % 60 : seconds % 60;
    return `${minutes}:${remainingSeconds}`
}





// Definisci la funzione di mescolamento (Fisher-Yates shuffle)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Scambia gli elementi
    }
    return array;
}