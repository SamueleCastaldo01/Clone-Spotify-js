import { player, playerAlbumTrack, playerTracks, initTracks, albumDataIni} from "./player.js";
import { tracks } from "./player.js";

const addressBarParameters = new URLSearchParams(location.search);
const albumId = addressBarParameters.get('albumId');
let currentTrack = 0;
console.log('albumId', albumId);

window.onload = function () {
    albumDataIni("album", albumId)
    player();
}

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
    });

    
    function displayAlbumDetails(singleAlbum) {
        const img = document.getElementById('imgDetails');
        const titleAlbum = document.getElementById('title');
        const artist = document.getElementById('artist');
        const trackList = document.getElementById('lists'); 
        const releaseYear = singleAlbum.release_date.split('-')[0];

    
        img.src = singleAlbum.cover_medium;
        titleAlbum.innerText = truncate(singleAlbum.title,12);
        artist.innerHTML = `<img src=" ${singleAlbum.artist.picture_small}" class="artist-img"> ${singleAlbum.artist.name.toUpperCase()} • ${releaseYear} • ${singleAlbum.nb_tracks} brani, <span class="text-min">${convertDurations(singleAlbum.duration)}</span>`;


    
        
        trackList.innerHTML = '';
    
        
        let trackHTML = ''; 
        singleAlbum.tracks.data.forEach((track, index) => {
            trackHTML += `
                <div class="row" id="${track.id}">
                    <div class="col-1 text-muted">
                        ${index +1}
                    </div>
                    <div class="col-7" onclick='playerAlbumTrack(${track.id})'>
                        <ol class="list-unstyled">
                            <li class="title">${track.title_short}</li>
                            <p class="text-undertitle">${track.artist.name}</p>
                        </ol>
                    </div>
                    <div class="col-3 ">
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