const playlists = JSON.parse(localStorage.getItem("playlists"));
const scopri = document.getElementById("scopri");

window.onload = function(){
    creazionePlaylist();
}

function creazionePlaylist() {
    if (playlists.length != 0) {
        playlists.forEach(element => {
            scopri.innerHTML += `
                <div class="col-lg-4 col-sm-3 mt-3">
                    <div class="bg-${coloreRandom} text-center p-4 rounded-3">
                        <h6><a href="./playlistsDetail.html?listId=${element.id}" class="text-decoration-none text-light">${element.namePlaylist}</a></h6>
                    </div>
                </div>
            `
        });
    }
}

function coloreRandom() {
    const colori = ["red", "primary", "primary-emphasis", "success", "success-emphasis", "danger", "warning", "warning-emphasis", "info", "info-emphasis"];
    return colori[Math.floor(Math.random() * colori.length-1)]
}