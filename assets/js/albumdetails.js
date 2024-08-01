import { player, playerAlbumTrack, albumDataIni, playArtistFunction } from "./player.js";

const playArtist = document.getElementById("playArtist");
const addressBarParameters = new URLSearchParams(location.search);
const albumId = addressBarParameters.get('albumId');
console.log('albumId', albumId);

window.onload = function () {
    albumDataIni("album", albumId)
    player();
}

playArtist.addEventListener("click", () => {
    playArtistFunction()
})

const keyUrl = 'https://striveschool-api.herokuapp.com/api/deezer/album/';
fetch(keyUrl + albumId)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('error');
        }
    })
    .then((singleAlbum) => {
        console.log(singleAlbum);
        displayAlbumDetails(singleAlbum);
    })
    .catch((error) => {
        console.error('Errore:', error);
    })


function displayAlbumDetails(singleAlbum) {
    const img = document.getElementById('imgDetails');
    const titleAlbum = document.getElementById('title');
    const artist = document.getElementById('artist');
    const trackList = document.getElementById('lists');
    const releaseYear = singleAlbum.release_date.split('-')[0];


    img.src = singleAlbum.cover_medium;
    titleAlbum.innerText = truncate(singleAlbum.title, 12);
    artist.innerHTML = `<img src=" ${singleAlbum.artist.picture_small}" class="artist-img"> ${singleAlbum.artist.name.toUpperCase()} • ${releaseYear} • ${singleAlbum.nb_tracks} brani, <span class="text-min">${convertDurations(singleAlbum.duration)}</span>`;




    trackList.innerHTML = '';


    let trackHTML = '';
    singleAlbum.tracks.data.forEach((track, index) => {
        trackHTML += `
                <div class="row user-select-none" id="${track.id}">
                    <div class="col-1 text-muted">
                        ${index + 1}
                    </div>
                    <div class="col-6" onclick='playerAlbumTrack(${track.id})'>
                        <ol class="list-unstyled">
                            <li class="title user-select-none">${truncate(track.title_short, 15)}</li>
                            <a href="./artist.html?artistId=${track.artist.id}" class="no-underline text-undertitle text-decoration-none">${track.artist.name}</a>

                        </ol>
                    </div>
                    <div class="col-4 ">
                        <ol class="list-unstyled mb-0">
                            <li class="text-muted">${track.rank}</li>
                        </ol>
                    </div>
                    <div class="col-1 ">
                        <ol class="list-unstyled mb-0">
                            <li class="text-muted">${convertDuration(track.duration)}</li>
                        </ol>
                    </div>
                </div>
            `;
    });

    trackList.innerHTML = trackHTML;
}

function convertDuration(seconds) {
    const minutes = Math.floor(seconds / 60) < 10 ? "0" + Math.floor(seconds / 60) : Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60 < 10 ? "0" + seconds % 60 : seconds % 60;
    return `${minutes}:${remainingSeconds}`;
}

function convertDurations(seconds) {
    const minutes = Math.floor(seconds / 60) < 10 ? "0" + Math.floor(seconds / 60) : Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60 < 10 ? "0" + seconds % 60 : seconds % 60;
    return `${minutes} min ${remainingSeconds} sec`;
}
function truncate(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}


window.playerAlbumTrack = playerAlbumTrack;
window.albumDataIni = albumDataIni;
window.playArtistFunction = playArtistFunction;
