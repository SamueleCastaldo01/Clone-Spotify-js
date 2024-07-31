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
    
        img.src = singleAlbum.cover_medium;
        titleAlbum.innerText = singleAlbum.title;
        artist.innerText = singleAlbum.artist.name;
    
        
        trackList.innerHTML = '';
    
        
        let trackHTML = ''; 
    
        singleAlbum.tracks.data.forEach((track) => {
            trackHTML += `
                <div class="row" id="${track.id}">
                    <div class="col-8" onclick='playerAlbumTrack(${track.id})'>
                        <ol class="list-unstyled">
                            <li class="">${track.title_short}</li>
                            <p class="text-undertitle">${track.artist.name}</p>
                        </ol>
                    </div>
                    <div class="col-3 ">
                        <ol class="list-unstyled" >
                            <li class="text-undertitle"> ${track.rank}</li> 
                        </ol>
                    </div>
                    <div class="col-1 text-end">
                        <ol class="list-unstyled">  
                            <li class="text-undertitle">${convertDuration(track.duration)}</li>
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


window.playerAlbumTrack = playerAlbumTrack;
window.albumDataIni = albumDataIni;