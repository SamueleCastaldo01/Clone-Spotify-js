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
const keyUrl1='/top?limit=11'
fetch(keyUrl + artistId + keyUrl1)
.then((response) => {
   if (response.ok){
    return response.json()
   } else {
    throw new Error('errore')
   }
})
.then((singleTrack) => {
        console.log(singleTrack);
        topTracks(singleTrack);
})


function displayArtistDetails(singleArtist) {
    const img = document.getElementById('imgArtist');  
    const artist = document.getElementById('artist');
    const ascoltatori = document.getElementById('ascoltatori');
    img.src = singleArtist.picture_medium;
    artist.innerText = singleArtist.name;
    ascoltatori.innerHTML=`${singleArtist.nb_fan} ascoltatori mensili `
}

function topTracks(singleTrack) {
   
    const topTrackList = document.getElementById('topTrackList');
    let tracksHTML = '';

    singleTrack.data.forEach(track => {
        tracksHTML += `
                <div class="col-6 d-flex my-2">
                    <img src="${track.album.cover_medium}" alt="Album Cover" class="w-10">
                    <h6 class="mb-0 mt-1 ms-2">${truncate(track.title,15)}</h6>
                </div>
                <div class="col-3 my-2">
                    <p class="text-muted ">${track.rank}</p>
                </div>
                <div class="col-3 my-2">
                    <p class="text-muted ">${convertDuration(track.duration)}</p>
                </div>
        `;
    });

    topTrackList.innerHTML= tracksHTML;
}


function convertDuration(seconds) {
    const minutes = Math.floor(seconds / 60) < 10 ? "0" + Math.floor(seconds / 60) : Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60 < 10 ? "0" + seconds % 60 : seconds % 60;
    return `${minutes}:${remainingSeconds}`;
} 
function truncate(text ,maxLength ) {
        if (text.length > maxLength) {
            return text.slice(0, 17) + '...';
        }
        return text;
    }


    function changeButtonText() {
        const follow = document.getElementById('follow');
        if (follow.innerHTML === 'Follow') {
            follow.innerHTML = 'Following';
        } else {
            follow.innerHTML = 'Follow';
        }
    }
    