const addressBarParameters = new URLSearchParams (location.search)
const albumId = addressBarParameters.get('albumId')
console.log('albumId',albumId)

const keyUrl = 'https://striveschool-api.herokuapp.com/api/deezer/album/'
fetch(keyUrl + albumId)
.then((response) => {
   if (response.ok){
    return response.json()
   } else {
    throw new Error('errore')
   }
})
.then((singleAlbum) => {
        console.log(singleAlbum)
        displayAlbumDetails(singleAlbum);
})

function displayAlbumDetails(singleAlbum) {
    const albumDetailsContainer = document.getElementById('albumdettagli');
    albumDetailsContainer.innerHTML = `
        <div class="singleAlbum-details">
            <img src="${singleAlbum.cover_medium}" alt="Album Cover">
            <h1>${singleAlbum.title}</h1>
            <h2>${singleAlbum.artist.name}</h2>
            <ul>
                ${singleAlbum.tracks.data.map(track => `<li>${track.title_short} - ${convertDuration(track.duration)}</li>`).join('')}
            </ul>
        </div>`;
}

function convertDuration(seconds) {
    const minutes = Math.floor(seconds / 60) < 10 ? "0" + Math.floor(seconds / 60) : Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60 < 10 ? "0" + seconds % 60 : seconds % 60;
    return `${minutes}:${remainingSeconds}`;
}