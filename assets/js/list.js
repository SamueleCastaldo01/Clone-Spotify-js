const listaPlaylist = JSON.parse(localStorage.getItem("playlists"));
const plist = document.getElementById("plist");

window.onload = function(){
    listBuilder();
}

function listBuilder() {
    listaPlaylist.forEach(element => {
        plist.innerHTML += `
        <li>
            <a href="playlistsDetail.html?listId=${element[0]}" class="text-decoration-none text-light">${element[0]}</a>
        </li>
        `;
    })
}