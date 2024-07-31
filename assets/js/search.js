let listaArtisti = [];
let listaAlbum = [];
const searchInput = document.querySelector(".input");

class Alb {
    constructor(name, title, id, cover, tracklist) {
        this.artista = name;
        this.titolo = title;
        this.id = id;
        this.cover = cover;
        this.tracks = tracklist
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
        // console.log(albumList(data));
        console.log("album: \n", albumList(data))
        console.log("artist: \n", artistList(data))
        // console.log("artist: \n", artistList(data))



        // pulitura del contenitore

        if (data.data.length > 0) {

            // funzioni di creazione

        }

    } catch (error) {
        console.error("There was a problem with the fetch operation:", error)
    }
}



async function albumFetch(parameter) {
    if (param == "") {
        return;
    }

    const url = parameter;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Response is not ok!");
        }

        const data = await response.json();

        if (data.data.length > 0) {

            // funzioni di creazione

        }

    } catch (error) {
        console.error("There was a problem with the fetch operation:", error)
    }
}
// queryFetch("jeffmills")



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
        if (!albumTitles.has(element.album.title)) {
            albumTitles.add(element.album.title);
            const al = new Alb(element.artist.name, element.album.title, element.album.id, element.album.cover_small, element.album.tracklist);
            listaAlbum.push(al);
        }
    });
    return listaAlbum;
}











