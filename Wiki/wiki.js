const latestVersionURL = "https://ddragon.leagueoflegends.com/api/versions.json";
const ChampionItems = document.querySelector("select#champions-items");
document.querySelector("select#champions-items").selectedIndex = 0;

function grabLatestVersion() {
    fetch(latestVersionURL)
        .then(res => res.json())
        .then(data => {
            let version = document.createElement("h1");
            version.innerText = `Patch: ${parseFloat(data[0]).toFixed(2)}`;
            ChampionItems.before(version);
            document.getElementById('loading-screen').style.display = 'none';
        })
        .catch(error => console.log(error))
};

ChampionItems.addEventListener("change", (event) => {
    document.getElementById('loading-screen').style.display = 'flex';
    if (ChampionItems.selectedIndex == 1) {
        grabAllChampions();
        document.querySelector("div#champion-selector").style.display = "grid";
        document.querySelector("div#items-info").style.display = "none";
    } else if (ChampionItems.selectedIndex == 2) {
        document.querySelector("div#champion-info-spells").style.display = "none";
        document.querySelector("div#champion-selector").style.display = "none";
        document.querySelector("div#items-info").style.display = "grid";
    } else {
        document.querySelector("div#champion-info-spells").style.display = "none";
        document.querySelector("div#champion-selector").style.display = "none";
        document.querySelector("div#items-info").style.display = "none";
    };
    document.getElementById('loading-screen').style.display = 'none';
});
grabLatestVersion();