// Functions
/**
 * GetAllChampions Function
 * Used to get all of the champions and load them into the champion select
 */
function getAllChampions() {
    fetch(`https://shazzaam7.github.io/LoL-DDragon/champions.json`)
    .then(res => res.json())
    .then(data => {
        for(let key in data) {
            let Champion = document.createElement("div");
            let Icon = document.createElement("img");
            let ChampionName = document.createElement("p");
            Champion.className = "champion";
            Champion.value = key;
            Champion.setAttribute("data-name", data[key].name);
            Icon.className = "champion-icon";
            Icon.src = data[key].icon;
            ChampionName.className = "champion-name";
            ChampionName.innerText = data[key].name;
            Champion.appendChild(Icon);
            Champion.appendChild(ChampionName);
            Champion.addEventListener("click",() => {
                console.log(Champion.getAttribute("data-name"));
                grabChampionDetails(Champion.value);
                document.querySelector("input#searchChampions").value = "";
                document.querySelectorAll("div.champion").forEach(champion => {
                    if (champion.style.display == "none") {
                        champion.style.display = "flex";
                    }
                })
            })
            document.querySelector("div#champions").appendChild(Champion);
        }
        document.getElementById('loading').style.display = 'none';
    })
    .catch(error => console.alert(error));
}

function grabChampionDetails(ChampionKey) {
    fetch(`https://shazzaam7.github.io/LoL-DDragon/champions/${ChampionKey}.json`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.log(error));
}

// Events
/**
 * Searching Champions based on name
 */
document.querySelector("input#searchChampions").addEventListener("input", () => {
    const Champions = document.querySelectorAll("div.champion");
    Champions.forEach(champion => {
        if (champion.dataset.name.toLowerCase().includes(document.querySelector("input#searchChampions").value.toLowerCase())) {
            champion.style.display = "flex";
        } else {
            champion.style.display = "none";
        }
    })
})