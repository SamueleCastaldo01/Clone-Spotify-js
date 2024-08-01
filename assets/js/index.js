import { player, playerCarousel, playerTracks, initTracks} from "./player.js";
//import variabili
import {trackDataArray,} from "./player.js"




const albumsId = ["11205422", "534017402", "544892012", "420845567", "6327742", "112217392", "6157080", "74872972"];
const carouselRow = document.getElementById('carousel');
const cardsAlbumRow = document.getElementById('cardsAlbum')
const loading = document.getElementById("loading");
const loader = document.getElementById("loader");


window.onload = function () {
    initTracks()
    player();
    buildCarouselItems()
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
                <div class="row p-3 pb-2">
                    <div class="col-3 mt-3"><img src="${element.album.cover_medium}" alt="imgprova" class="w-100"></div>
                    <div class="col-7">
                        <h6 class="fs-supersmall">ALBUM</h6>
                        <h1>${truncate(element.title_short, 14)}</h1>
                        <p class="fs-small"><a href="albumdetails.html" class="text-light text-decoration-none">${element.album.title}</a></p>
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
                <h5 class="card-title my-2 truncateText"><a href = "./albumdetails.html?albumId=${track[0].album.id}"  class="text-decoration-none text-white">${track[0].album.title}</a></h5>
                <p class="card-text mb-4 fs-small "><a href = "./artist.html?artistId=${track[0].artist.id}" class="text-decoration-none text-white">${track[0].artist.name}</a></p>
            </div>
        </div>`

}


//-----------------------------------------------------------


const convertDuration = function (seconds) {
    const minutes = Math.floor(seconds / 60) < 10 ? "0" + Math.floor(seconds / 60) : Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60 < 10 ? "0" + seconds % 60 : seconds % 60;
    return `${minutes}:${remainingSeconds}`
}

window.playerCarousel = playerCarousel;
window.playerTracks = playerTracks;
window.initTracks = initTracks;



