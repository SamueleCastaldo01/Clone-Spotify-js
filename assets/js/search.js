function searchBarAnimation() {
    const searchInput = document.querySelector(".search-bar input");
    const main = document.getElementsByName("main")[0];

    searchInput.addEventListener("focus", () => {
        main.classList.add("wide");
    })

    searchInput.addEventListener("blur", () => {
        main.classList.remove("wide")
    })
}

async function queryFetch(param) {
    const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${param}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Response is not ok!");
        }

        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.error("There was a problem with the fetch operation:", error)
    }
}

queryFetch("jeffmills")
