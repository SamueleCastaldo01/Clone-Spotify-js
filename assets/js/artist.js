const addressBarParameters = new URLSearchParams (location.search)
const artistId = addressBarParameters.get('artistId')
console.log('artistId',artistId)

const keyUrl = 'https://striveschool-api.herokuapp.com/api/deezer/artist/'
fetch(keyUrl + artistId)
.then((response) => {
   if (response.ok){
    return response.json()
   } else {
    throw new Error('errore')
   }
})
.then((singleArtist) => {
        console.log(singleArtist)
        displayArtistDetails(singleArtist);
})

function displayArtistDetails(singleArtist) {
    const albumDetailsContainer = document.getElementById('artistadettagli');
    albumDetailsContainer.innerHTML = `
        <div class="singleArtist-details">
            <img src="${singleArtist.picture_medium}" alt="Album Cover">
            <h1>${singleArtist.name}</h1>
            <p>${singleArtist.nb_fan} ascoltatori mensili</p>
        </div>`;
}

function convertDuration(seconds) {
    const minutes = Math.floor(seconds / 60) < 10 ? "0" + Math.floor(seconds / 60) : Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60 < 10 ? "0" + seconds % 60 : seconds % 60;
    return `${minutes}:${remainingSeconds}`;
}