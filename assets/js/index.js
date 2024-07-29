const albumData = function(album) {
    const apiKey = `https://striveschool-api.herokuapp.com/api/deezer/album/${album}`;
    
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
       const arrayAlbum = Array.from(dataAlbum)
       arrayAlbum.forEach((album) => {
            const newAlbum = `
                        <div class="carousel-item active">
                                <div class="row p-3">
                                    <div class="col-3 mt-3"><img src="assets/imgs/search/image-10.jpg" alt="imgprova"
                                            class="w-100"></div>
                                    <div class="col-7">
                                        <h6 class="fs-supersmall">ALBUM</h6>
                                        <h1>${dataAlbum.title}</h1>
                                        <p class="fs-small">${dataAlbum.name}</p>
                                        <p class="fs-small">${dataAlbum.duration}</p>
                                        <div class="w-100 d-flex ">
                                            <button class="btn bg-primary rounded-5 px-5 py-0 me-3">Play</button>
                                            <button class="btn bg-black text-white rounded-5 px-5 py-0 me-3">Salva</button>
                                            <p class="fs-1">...</p>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                      <button disabled class="btn text-gray2 bg-grayground fs-supersmall rounded-5 border-0">NASCONDI ANNUNCI</button>
                                    </div>
                                </div>
                            </div>
            `
        });
    })
    .catch((error) => {
        console.error('Errore:', error);
    });
}

albumData('75621062');