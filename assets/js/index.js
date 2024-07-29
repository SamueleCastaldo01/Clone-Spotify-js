const audio = document.getElementById('audio');
const rangeAudio = document.getElementById('rangeAudio');
const currentDuration = document.getElementById('currentDuration');
const maxDuration = document.getElementById('maxDuration');
const playIcon = document.getElementById('play');
const resetButton = document.getElementById('resetButton');
const volumeControl = document.getElementById('volumeControl');



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
    rangeAudio.value = 0; 
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



    // Gestore di evento per il clic sull'icona di riproduzione
    playIcon.addEventListener('click', () => {
        if (audio.paused) {
            audio.play(); // Riproduce l'audio se è in pausa
            playIcon.classList.remove('bi-play-circle-fill');
            playIcon.classList.add('bi-pause-circle-fill');
        } else {
            audio.pause(); // Pausa l'audio se è in riproduzione
            playIcon.classList.remove('bi-pause-circle-fill');
            playIcon.classList.add('bi-play-circle-fill');
        }
    });




const albumData = function(album) {
    const apiKey = `https://striveschool-api.herokuapp.com/api/deezer/album/${album}`;
    const carouselRow = document.getElementById('carousel');
    
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

        // arrayAlbum.forEach((album) => {
        albumtracks.forEach((element, i) => {
            const active = i === 0 ? "active" : "";
            carouselRow.innerHTML += `
            <div class="carousel-item ${active}">
                <div class="row p-3">
                    <div class="col-3 mt-3"><img src="${element.album.cover_medium}" alt="imgprova"
                        class="w-100"></div>
                    <div class="col-7">
                        <h6 class="fs-supersmall">ALBUM</h6>
                        <h1>${element.title_short}</h1>
                        <p class="fs-small">${element.album.title}</p>
                        <p class="fs-small mb-0">${convertDuration(element.duration)}</p>
                        <div class="w-100 d-flex align-items-center ">
                            <button class="btn btn-sm bg-primary rounded-5 px-4 py-2 me-3 h-25 fw-bold text-black">Play</button>
                            <button class="btn btn-sm bg-black text-white rounded-5 px-4 py-2 me-3 h-25 border border-white border-1">Salva</button>
                            <p class="fs-1">...</p>
                        </div>
                    </div>
                    <div class="col-2">
                        <button disabled class="btn text-gray2 bg-grayground fs-supersmall rounded-5  border-0">NASCONDI ANNUNCI</button>
                    </div>
                </div>
            </div>
        `;
            
        });
       

        // });
    

    })
    .catch((error) => {
        console.error('Errore:', error);
    });
}


const convertDuration = function(seconds){
    const minutes = Math.floor(seconds/60)
    const remainingSeconds = seconds %60
    return `${minutes}:${remainingSeconds}`
}
albumData('75621062');
