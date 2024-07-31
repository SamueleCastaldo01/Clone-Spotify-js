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
    <div class="row ">   
                        <div class="d-flex mt-2" >
                        <i class="bi bi-arrow-left-circle fs-3"></i>
                        <i class="bi bi-arrow-right-circle fs-3 ms-3"></i>
                    </div>
                        <div class="col-3 mt-3">
                            <img src="${singleAlbum.cover_medium}"class="img-fluid" id="imgDetails"alt="img-album">
                        </div>
                        <div class="col-9 d-flex flex-column mt-2 ">
                            <h3 class="mt-5" >Album</h3>
                            <h1 class="flex-grow-2 mb-3">${singleAlbum.title}</h1>
                            <p class="flex-grow-1 ">${singleAlbum.artist.name}</p>
                        </div>

                    </div>
                    <div class="mt-5 d-flex align-items-center">
                        <button type="button" class="btn btn-primary  rounded-circle me-2 "> <i class="bi bi-play-fill fs-4"></i></button>
                        <i class="bi bi-heart ms-lg-3 fs-4"></i>
                        <i class="bi bi-arrow-down-circle fs-4 ms-3"></i>
                        <i class="bi bi-three-dots fs-4 ms-3"></i>


                    </div>
                    <div class="row mt-5">
                        <div class="col-7 ">
                            <ol>
                            ${singleAlbum.tracks.data.map(track => `<li>${track.title_short}</li>`).join('')}
                            </ol>

                        </div>
                        <div class="col-3">
                            <ol>
                                 
                            </ol>


                        </div>
                        <div class="col-1 text-end">
                            <ol>
                            ${singleAlbum.tracks.data.map(track => `<li>${convertDuration(track.duration)}</li>`)}
                            </ol>


                        </div>

                    </div>
    `;
}

function convertDuration(seconds) {
    const minutes = Math.floor(seconds / 60) < 10 ? "0" + Math.floor(seconds / 60) : Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60 < 10 ? "0" + seconds % 60 : seconds % 60;
    return `${minutes}:${remainingSeconds}`;
}

