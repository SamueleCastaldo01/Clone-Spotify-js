const listaPlaylist = JSON.parse(localStorage.getItem("playlists"));
const plist = document.getElementById("plist");

window.onload = function(){
    listBuilder();
}

function listBuilder() {
    listaPlaylist.forEach(element => {
        plist.innerHTML += `
        <li>
            <a href="playlistsDetail.html?listId=${element.id}" class="text-decoration-none text-light">${element.namePlaylist}</a>
        </li>
        `;
    })
}