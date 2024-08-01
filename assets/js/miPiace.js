import { player, playerAlbumTrack, playArtistFunction, initLikePlaylist} from "./player.js";
let likePlaylist=JSON.parse(localStorage.getItem('likePlaylist')) || [];
console.log(likePlaylist)

const playArtist = document.getElementById("playArtist");

window.onload = function () {
    displayAlbumDetails();
    initLikePlaylist()
    player();
}

playArtist.addEventListener("click", () => {
    playArtistFunction()
})



    
    function displayAlbumDetails() {
        const img = document.getElementById('imgDetails');
        const titleAlbum = document.getElementById('title');
        const artist = document.getElementById('artist');
        const trackList = document.getElementById('lists');

    
        img.src = likePlaylist.cover_small;
        titleAlbum.innerText = truncate('brani che ti piacciono',20);


    
        
        trackList.innerHTML = '';
    
        
        let trackHTML = ''; 
        likePlaylist.forEach((track, index) => {
            trackHTML += `
                <div class="row user-select-none" id="${track.id}">
                    <div class="col-1 text-muted">
                        ${index +1}
                    </div>
                    <div class="col-6" onclick='playerAlbumTrack(${track.id})'>
                        <ol class="list-unstyled">
                            <li class="title">${truncate(track.title_short,20)}</li>
                            <a href="./artist.html?artistId=${track.artist.id}" class="no-underline text-undertitle text-decoration-none">${track.artist.name}</a>

                        </ol>
                    </div>
                    <div class="col-4 ">
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
