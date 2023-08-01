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

ChampionItems.addEventListener("change", () => {
    if (ChampionItems.selectedIndex == 1) {
        grabAllChampions();
        document.querySelector("div#item-selector").style.display = "none";
        document.querySelector("div#champion-selector-search").style.display = "grid";
        document.querySelector("div#item-info").style.display = "none";
    } else if (ChampionItems.selectedIndex == 2) {
        grabAllItems();
        document.querySelector("div#champion-info-spells").style.display = "none";
        document.querySelector("div#champion-selector-search").style.display = "none";
        document.querySelector("div#item-selector").style.display = "grid";
    } else {
        document.querySelector("div#champion-info-spells").style.display = "none";
        document.querySelector("div#champion-selector-search").style.display = "none";
        document.querySelector("div#item-selector").style.display = "none";
        document.querySelector("div#item-info").style.display = "none";
    };
});

document.querySelector("div#item-selector").style.display = "none";
document.querySelector("div#champion-info-spells").style.display = "none";
document.querySelector("div#champion-selector-search").style.display = "none";
document.querySelector("div#item-info").style.display = "none";
document.querySelector("input#searchItems").value = "";
grabLatestVersion();