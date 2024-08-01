const addressBarParameters = new URLSearchParams(location.search);
const albumId = addressBarParameters.get('albumId');
console.log('albumId', albumId);

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
        singleAlbum.tracks.data.forEach((track, index) => {
            trackHTML += `
                <div class="row align-items-center">
                    <div class="col-1 d-flex align-items-center justify-content-center">
                        <div class="d-flex align-items-start ">
                            <span class="text-undertitle fw-bold ">${index + 1}</span>
                        </div>
                    </div>
                    <div class="col-7">
                        <ol class="list-unstyled mb-0">
                            <li class="fw-bold">${track.title_short}</li>
                            <p class="mb-0 text-muted">${track.artist.name}</p>
                        </ol>
                    </div>
                    <div class="col-3">
                        <ol class="list-unstyled mb-0">
                            <li class="text-muted">${track.rank}</li>
                        </ol>
                    </div>
                    <div class="col-1 text-end">
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