# Team-Build-Week-2
# Spotify

Benvenuti! **Spotify** è un'applicazione di streaming musicale all'avanguardia progettata per offrire un'esperienza unica e coinvolgente agli amanti della musica di tutto il mondo. Con un'interfaccia intuitiva e un'ampia gamma di funzionalità, Spotify si posiziona come un punto di riferimento per chi desidera esplorare, scoprire e godere della musica in tutte le sue forme.

## Tecnologie utilizzata:

- HTML
- Sass
- Bootstrap
- JavaScript

## **Utilizzo**

Per utilizzare l'applicazione, basta aprire il file **`index.html`** in un browser web. Una volta caricata la pagina, l'utente si troverà nella Homepage . A questo punto la user experience diventerà avvincente con la possibilità di navigare per riprodurre grazie al comando play gli album e i singoli brani degli artisti preferiti.

**Requisiti tecnici**

- Browser web moderno (ad esempio, Google Chrome, Mozilla Firefox)
- Connessione internet

## Struttura

1. Home Page: `index.html` Quando si accede alla Home page, la fruizione della medesima  è versatile,  partendo dalla riproduzione di alcuni brani e album scelti dai programmatori, oppure selezionando i proprio artisti preferiti direttamente dalla sezione dedicata alla ricerca. Per capire al meglio le funzionalità del player per la riproduzione musicale  e della playlist`player.js, index.js`
2. Search: `search.html` Nella pagina search, l’utente potrà utilizzando la barra dedicata alla ricerca attraverso la modalità di instant search cercare artisti e  album  e visualizzare sia la durata che  il rank degli stessi. Una volta selezionato una delle due possibilità si verrà indirizzati alla pagina corrispondente
3. Album: `albumdetails.html`  A questo punto verremo indirizzati al contenuto album nel caso in cui l’utente abbia fatto una ricerca specifica o aver selezionato dalla Home page uno degli album messi in evidenza. Si potrà riprodurre chiaramente l’album intero e visualizzare tutti i brani contenuti, passare all’ascolto da una traccia all’altra sarà possibile grazie al bottone del player o anche selezionando la traccia stessa.
4. Artist: `artist.html` Questa è la pagina che mostra alcuni dettagli specifici dell’artista selezionato , come il numero degli ascoltatori mensili, la durata dei brani quante volte è stato riprodotto

## Funzionalità

- **🏠 Home Page**
    
    
    Il codice  è una funzione chiamata `albumData` che recupera e gestisce i dati di un album musicale utilizzando l'API di Deezer.  La funzione accetta due parametri, `type` e `album`, e costruisce un URL API con questi parametri per richiedere i dati dell'album specificato.
    
    1. **Funzione `albumData`**: 
        
        ```jsx
        const albumData = function (type, album) {
            const apiKey = `https://striveschool-api.herokuapp.com/api/deezer/${type}/${album}`;
            loading.style.display = 'block';
        
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
                    buildCarousel(albumtracks);
                    createAlbumCards(albumtracks)
        
                })
                .catch((error) => {
                    console.error('Errore:', error);
                })
                .finally(() => {
                    loading.style.display = "none";
                })
        }
        
        ```
        
    2. Aggiunta elementi nel carosello:
        
        ```jsx
            datasetArray.forEach((element) => {
                const active = document.querySelectorAll(".carousel-item").length < 1 ? "active" : "";
                const escapedElement = JSON.stringify(element).replace(/"/g, '&quot;'); // Serve per portarmi l'array nella funzione per gestire il lettore
                carouselRow.innerHTML += `
                    <div class="carousel-item ${active}">
                        <div class="row p-3 pb-2">
                            <div class="col-3 mt-3"><img src="${element.album.cover_medium}" alt="imgprova" class="w-100"></div>
                            <div class="col-7">
                                <h6 class="fs-supersmall">ALBUM</h6>
                                <h1>${truncate(element.title_short, 14)}</h1>
                                <p class="fs-small"><a href="albumdetails.html" class="text-light text-decoration-none">${element.album.title}</a></p>
                                <p class="fs-small mb-0">${convertDuration(element.duration)}</p>
                                <div class="w-100 d-flex align-items-center">
                                    <button onclick='playerCarousel(${escapedElement})' class="btn btn-sm bg-primary rounded-5 px-4 py-2 me-3 h-25 fw-bold text-black">Play</button>
                                    <button class="btn btn-sm bg-black text-white rounded-5 px-4 py-2 me-3 h-25 border border-white border-1 saver"  data-bs-toggle="modal" data-bs-target="#aggiuntaBrano">Salva</button>
                                    <p class="fs-1">...</p>
                                </div>
                            </div>
                            <div class="col-2">
                                <button disabled class="btn text-gray2 bg-grayground fs-supersmall rounded-5 border-0">NASCONDI ANNUNCI</button>
                            </div>
                        </div>
                    </div>
                `;
            });
        ```
        
        Questo codice è utilizzato per visualizzare un carosello interattivo di tracce musicali, fornendo opzioni per la riproduzione e il salvataggio delle tracce.
        
    
    ```jsx
    
    ```
    
- **🔍 Search**
    1. **alternare la visibilità del contenuto in base al valore dell'input**.
    
        
        ```jsx
        
          document.addEventListener('DOMContentLoaded', function() {
            // Ottieni gli elementi del DOM
            const searchInput = document.querySelector(".inputSearch");
            const scopri = document.getElementById('scopri');
            const listaArtisti = document.getElementById('listaArtisti');
            const listaAlbum = document.getElementById('listaAlbum');
          
            // Verifica se gli elementi sono stati trovati
            if (searchInput) {
              // Funzione per controllare il contenuto dell'input
              function checkInput() {
                // Controlla se l'input è vuoto (spazi vuoti inclusi)
                if (searchInput.value.trim() === '') {
                  // Mostra il div 'scopri' e nasconde gli altri
                  if (scopri) scopri.style.display = 'flex';
                  if (listaArtisti) listaArtisti.style.display = 'none';
                  if (listaAlbum) listaAlbum.style.display = 'none';
                } else {
                  // Nasconde il div 'scopri' e mostra gli altri
                  if (scopri) scopri.style.display = 'none';
                  if (listaArtisti) listaArtisti.style.display = 'block';
                  if (listaAlbum) listaAlbum.style.display = 'block';
                }
              }
              
        ```
        
    
    Questa funzione, eseguita quando il DOM è completamente caricato, gestisce la visibilità di tre elementi del DOM: `scopri`, `listaArtisti`, e `listaAlbum`, basandosi sul contenuto di un campo di input con la classe `inputSearch`. Se il campo di input è vuoto o contiene solo spazi vuoti, viene mostrato il div `scopri` e nascosti gli altri due; altrimenti, il div `scopri` viene nascosto e gli altri due elementi vengono mostrati. Questo comportamento permette una visualizzazione dinamica del contenuto in base alla presenza o assenza di testo nel campo di ricerca.
    
    1. 
    Il **costruttore** (`constructor`) è una funzione speciale in che viene automaticamente chiamata quando si crea una nuova istanza della classe. La sua funzione principale è quella di inizializzare gli oggetti creati dalla classe. Le classi  `Alb` e `Art` sono modelli di dati utilizzati per rappresentare rispettivamente **album** e  **artisti**. 
    
    ```jsx
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
    ```
    
    1.  **queryFetch**
    La funzione `queryFetch` è una funzione asincrona che gestisce il recupero e la visualizzazione di dati musicali tramite una chiamata API. È progettata per interagire con un'API di ricerca musicale e gestire l'interfaccia utente in base ai risultati della ricerca.
    
        
        ```jsx
        async function queryFetch(param) {
            if (param == "") {
                return;
            }
        
            const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${param}`;
            loading.style.display = 'block';
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Response is not ok!");
                }
                const data = await response.json();
        
                if (data.data.length > 0) {
                    builArtistItems(data);
                    buildAlbumItems(data);
                }
        
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error)
            }finally{
                loading.style.display = "none";
            }
        }
        
        ```
        
    2.  ****
    Funzioni `artistList` e `albumList`
      
    Le funzioni `artistList` e `albumList` sono progettate per elaborare e strutturare i dati ricevuti da un'API di ricerca musicale. Esse creano e restituiscono liste di oggetti che rappresentano artisti e album, rispettivamente, evitando duplicati e organizzando le informazioni in oggetti di tipo `Art` e `Alb`.
    
    Queste funzioni sono fondamentali per l'elaborazione dei dati musicali ottenuti da un'API e per la loro visualizzazione in un'interfaccia utente, garantendo che gli elementi duplicati non vengano visualizzati.
    
        
        ```jsx
        function artistList(dati) {
            listaArtisti = [];
            const artistNames = new Set();
            (dati.data).forEach((element) => {
                if (!artistNames.has(element.artist.name)) {
                    artistNames.add(element.artist.name);
                    const ar = new Art(element.artist.name, element.artist.id, element.artist.picture_small)
                    listaArtisti.push(ar);
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
                    const al = new Alb(element.artist.name, element.album.title, element.album.id, element.album.cover_medium, element.album.tracklist, element.artist.id, element.rank, "", element.duration, element.preview);
                    listaAlbum.push(al);
                }
            });
            return listaAlbum;
        }
        
        ```
        
- **💿 Album**
    1. **Funzione `fetchAlbumDetails`** 
    
    Il codice sottostante effettua una richiesta HTTP per ottenere i dettagli di un album specifico utilizzando l'API Deezer. Gestisce la risposta e gli eventuali errori in modo che i dettagli dell'album possano essere visualizzati in un'applicazione.
    
    ```jsx
    const keyUrl = 'https://striveschool-api.herokuapp.com/api/deezer/album/';
    fetch(keyUrl + albumId)
        .then((response) => {
            if (response.ok) {
                return response.json(); // Converti la risposta in formato JSON
            } else {
                throw new Error('error'); // Genera un errore se la risposta non è valida
            }
        })
        .then((singleAlbum) => {
            console.log(singleAlbum); // Stampa i dettagli dell'album nella console
            displayAlbumDetails(singleAlbum); // Chiama una funzione per visualizzare i dettagli dell'album
        })
        .catch((error) => {
            console.error('Errore:', error); // Logga eventuali errori che si verificano
        });
    ```
    
    ```jsx
    
    ```
    
- **🎶 Artist**
    1. **Funzione `topTracks`**  
    La funzione `topTracks` è progettata per generare e visualizzare una lista di tracce principali all'interno di un elemento DOM. Questa funzione crea dinamicamente HTML per visualizzare dettagli su ciascuna traccia, inclusi l'immagine di copertura dell'album, il titolo, la posizione in classifica e la durata.
    
        
        ```jsx
        function topTracks(singleTrack) {
           
            const topTrackList = document.getElementById('topTrackList');
            let tracksHTML = '';
        
            singleTrack.data.forEach(track => {
                tracksHTML += `
                        <div class= "row d-flex align-items-center my-2 user-select-none" id="${track.id}">
                            <div class="col-6 d-flex my-2" onclick='playerAlbumTrack(${track.id})'>
                                <img src="${track.album.cover_medium}" alt="Album Cover" class="w-10">
                                <h6 class="mb-0 mt-1 ms-2 title">${truncate(track.title,15)}</h6>
                            </div>
                            <div class="col-3 my-2">
                                <p class="text-muted ">${track.rank}</p>
                            </div>
                            <div class="col-3 my-2">
                                <p class="text-muted ">${convertDuration(track.duration)}</p>
                            </div>
                        </div>
            
                `;
            });
        
            topTrackList.innerHTML= tracksHTML;
        ```
        

## Contributors

Il progetto è stato realizzato dal Team 6 come parte del Build Week 2 di EPICODE.

https://github.com/Zoltan3do

https://github.com/SamueleCastaldo01

https://github.com/Nicolomecca

https://github.com/AlessioLosi

## **Contatti**

Speriamo che questo README ti sia utile per capire meglio il progetto "Spotify". 

---

*Questo README fornisce una panoramica dettagliata del progetto "Spotify". Inclusa la sua struttura, le funzionalità e i dettagli per utilizzarlo correttamente.*