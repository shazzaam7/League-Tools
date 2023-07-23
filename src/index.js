const latestVersionURL = "https://ddragon.leagueoflegends.com/api/versions.json";
let gameVersion;

const ChampionSelect = document.querySelector("#ChampionSelect");

function grabLatestVersion() {
    fetch(latestVersionURL)
        .then(res => res.json())
        .then(data => {
            gameVersion = data[0];
            let version = document.createElement("h1");
            version.innerText = `Patch: ${gameVersion}`;
            ChampionSelect.before(version);
            grabAllChampions();
        })
        .catch(error => console.log(error))
};

function grabAllChampions() {
    fetch(`https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json`)
        .then(res => res.json())
        .then(data => {
            for (let key in data) {
                let newChampion = document.createElement("option");
                newChampion.value = key;
                newChampion.innerText = data[key].name;
                ChampionSelect.appendChild(newChampion);
            }
        }).catch(error => console.log(error))
}

function grabChampionDetails(championKey) {
    fetch(`https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions/${championKey}.json`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log(error))
}

ChampionSelect.addEventListener("change", (event) => {
    if (ChampionSelect.selectedIndex > 0) {
        grabChampionDetails(event.target.value)
    }
});

grabLatestVersion();