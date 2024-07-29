const albumData = function(album) {
    const apiKey = `https://striveschool-api.herokuapp.com/api/deezer/album/${album}`;
    const carouselRow = document.getElementById('carousel');
    
    fetch(apiKey)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('No Album No party');
        }
    })
    .then((dataAlbum) => {
        console.log('Data Album', dataAlbum);
        // const arrayAlbum = Array.from(dataAlbum)
        const albumtracks = Array.from(dataAlbum.tracks.data);

        // arrayAlbum.forEach((album) => {
        albumtracks.forEach((element, i) => {
            const active = i === 0 ? "active" : "";
            carouselRow.innerHTML += `
            <div class="carousel-item ${active}">
                <div class="row p-3">
                                    <div class="col-3 mt-3"><img src="${element.album.cover_medium}" alt="imgprova"
                                            class="w-100"></div>
                                    <div class="col-7">
                                        <h6 class="fs-supersmall">ALBUM</h6>
                                        <h1>${element.title}</h1>
                                        <p class="fs-small">${element.album.title}</p>
                                        <p class="fs-small mb-0">${convertDuration(element.duration)}</p>
                                        <div class="w-100 d-flex align-items-center ">
                                            <button class="btn btn-sm bg-primary rounded-5 px-4 py-2 me-3 h-25 fw-bold text-black">Play</button>
                                            <button class="btn btn-sm bg-black text-white rounded-5 px-4 py-2 me-3 h-25 border border-white border-1">Salva</button>
                                            <p class="fs-1">...</p>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                      <button disabled class="btn text-gray2 bg-grayground fs-supersmall rounded-5  border-0">NASCONDI ANNUNCI</button>
                                    </div>
                                </div>
            </div>
        `;
            
        });
       

        // });
    

    })
    .catch((error) => {
        console.error('Errore:', error);
    });
}


const convertDuration = function(seconds){
    const minutes = Math.floor(seconds/60)
    const remainingSeconds = seconds %60
    return `${minutes}:${remainingSeconds}`
}
albumData('75621062');
