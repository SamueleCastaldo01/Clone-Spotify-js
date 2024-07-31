import { player, playerCarousel, playerTracks, initTracks, searchTrack} from "./player.js";
import {trackDataArray,} from "./player.js"

window.onload = function () {
    initTracks();
    player();
}

let listaArtisti = [];
let listaAlbum = [];
let listaAlbumsTracks = [];
const searchInput = document.querySelector(".input");
const albumsContainer = document.getElementById("listaAlbum");
let albums = Array.from(document.getElementsByClassName("albumItem")) || [];



class Alb {
    constructor(name, title, id, cover, tracklist, idArtist, rank, tracks, duration, preview) {
        this.rank = rank;
        this.artista = name;
        this.idArtista = idArtist
        this.titolo = title;
        this.id = id;
        this.cover = cover;
        this.tracklist = tracklist
        this.tracks = tracks || [];
        this.duration = duration;
        this.preview = preview;
    }
}

class Art {
    constructor(title, id, picture) {
        this.nome = title;
        this.id = id;
        this.foto = picture;
    }
}



function searchBarAnimation() {

    const main = document.getElementsByName("main")[0];

    searchInput.addEventListener("focus", () => {
        main.classList.add("wide");
    })

    searchInput.addEventListener("blur", () => {
        main.classList.remove("wide")
    })
}



async function queryFetch(param) {
    if (param == "") {
        return;
    }

    const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${param}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Response is not ok!");
        }
        const data = await response.json();

        if (data.data.length > 0) {
            buildAlbumItems(data);
        }

    } catch (error) {
        console.error("There was a problem with the fetch operation:", error)
    }
}



searchInput.addEventListener("input", async () => {
    const q = searchInput.value.trim();
    queryFetch(q);
});



function artistList(dati) {
    listaArtisti = [];
    const artistNames = new Set();
    (dati.data).forEach((element) => {
        if (!artistNames.has(element.artist.name)) {
            artistNames.add(element.artist.name);
            const ar = new Art(element.artist.name, element.artist.id, element.artist.picture_small)
            listaArtisti.push({ ar });
        }
    });
    return listaArtisti
}



function albumList(dati) {
    listaAlbum = [];
    const albumTitles = new Set();
    (dati.data).forEach((element) => {
        console.log(element)
        if (!albumTitles.has(element.album.title)) {
            albumTitles.add(element.album.title);
            const al = new Alb(element.artist.name, element.album.title, element.album.id, element.album.cover_small, element.album.tracklist, element.artist.id, element.rank, "", element.duration, element.preview);
            listaAlbum.push(al);
        }
    });
    return listaAlbum;
}



function buildAlbumItems(dati) {
    albums.forEach(item => {
        item.remove();
    })

    listaAlbumsTracks = [];
    albumList(dati).forEach((item) => {

        // albumFetch(item.tracklist);
        albumsContainer.innerHTML += `
        <div class="row d-flex align-items-center mt-2 albumItem" data-listaDiTracce = "${item.tracklist}">
            <div class="col-1 opacity-50">1</div>
            <div class="col-1"><img onclick="searchTrack(${item.id})" src="${item.cover}" alt="qualcosa" class="w-100 rounded-3"></div>
            <div class="col-6 d-flex flex-column justify-content-center">
                <p class="mb-0"><a href="./albumDetails.html?albumId=${item.id}" class="text-light text-decoration-none" >${item.titolo}</a> </p>
                <p class="mb-0 opacity-50"><a href="./artist.html?artistId=${item.idArtista}" class="text-light text-decoration-none">${item.artista}</a></p>
            </div>
            <div class="col-3 opacity-50">${item.rank}</div>
            <div class="col-1 opacity-50">${item.duration}</div>
        </div>
        `;
    })
    albums = Array.from(document.getElementsByClassName("albumItem"));
}


window.searchTrack = searchTrack




// async function albumFetch(parameter) {
//     if (parameter == "") {
//         return;
//     }

//     const url = parameter;
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error("Response is not ok!");
//         }

//         const data = await response.json();

//         if (data.data.length > 0) {
//             albumsTracksList(data);

//             // funzioni di creazione
//         }

//     } catch (error) {
//         console.error("There was a problem with the fetch operation:", error)
//     }
// }



// function albumsTracksList(dati) {
//     listaAlbumsTracks.push(dati.data)
//     return listaAlbumsTracks;
// }