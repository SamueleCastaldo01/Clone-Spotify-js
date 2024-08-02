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

    console.log(likePlaylist)

    
    function displayAlbumDetails() {
        const img = document.getElementById('imgDetails');
        const titleAlbum = document.getElementById('title');
        const artist = document.getElementById('artist');
        const trackList = document.getElementById('lists');

    
        img.src = likePlaylist.cover_small;
        titleAlbum.innerText = truncate('brani che ti piacciono',20);


    
        
        trackList.innerHTML = '';
    
        
        let trackHTML = ''; 
        for(let i = 1; i< likePlaylist.length; i++) {
            trackHTML += `
            <div class="row user-select-none" id="${likePlaylist[i].id}">
                <div class="col-1 text-muted">
                    ${i}
                </div>
                <div class="col-6" onclick='playerAlbumTrack(${likePlaylist[i].id})'>
                    <ol class="list-unstyled">
                        <li class="title">${truncate(likePlaylist[i].title_short,20)}</li>
                        <a href="./artist.html?artistId=${likePlaylist[i].artist.id}" class="no-underline text-undertitle text-decoration-none">${likePlaylist[i].artist.name}</a>

                    </ol>
                </div>
                <div class="col-4 ">
                </div>
                <div class="col-1 ">
                    <ol class="list-unstyled mb-0">
                        <li class="text-muted">${convertDuration(likePlaylist[i].duration)}</li>
                    </ol>
                </div>
            </div>
        `;
        }
        
        trackList.innerHTML = trackHTML;
    }

function convertDuration(seconds) {
    const minutes = Math.floor(seconds / 60) < 10 ? "0" + Math.floor(seconds / 60) : Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60 < 10 ? "0" + seconds % 60 : seconds % 60;
    return `${minutes}:${remainingSeconds}`;
}

function truncate(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}


window.playerAlbumTrack = playerAlbumTrack;