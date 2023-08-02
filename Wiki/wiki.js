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

function roundNumbers(number) {
    const decimals = (number.toString().split('.')[1] || '').length;
    if (decimals === 0) {
        return number; // No decimals, return the original numberber without rounding
    } else if (decimals === 1) {
        return Math.round(number * 10) / 10; // Round to 1 decimal place
    } else if (decimals === 2) {
        return Math.round(number * 100) / 100; // Round to 2 decimal places
    } else {
        return Math.round(number * 1000) / 1000; // Round to 3 decimal places
    }
}

ChampionItems.addEventListener("change", () => {
    if (ChampionItems.selectedIndex == 1) {
        grabAllChampions();
        document.querySelector("select#champion-level").selectedIndex = 0;
        document.querySelector("div#item-selector").style.display = "none";
        document.querySelector("div#champion-selector-search").style.display = "grid";
        document.querySelector("div#item-info").style.display = "none";
    } else if (ChampionItems.selectedIndex == 2) {
        grabAllItems();
        document.querySelector("select#champion-level").selectedIndex = 0;
        document.querySelector("div#champion-info-spells").style.display = "none";
        document.querySelector("div#champion-selector-search").style.display = "none";
        document.querySelector("div#item-selector").style.display = "grid";
    } else {
        document.querySelector("select#champion-level").selectedIndex = 0;
        document.querySelector("div#champion-info-spells").style.display = "none";
        document.querySelector("div#champion-selector-search").style.display = "none";
        document.querySelector("div#item-selector").style.display = "none";
        document.querySelector("div#item-info").style.display = "none";
    };
});

document.querySelector("select#champion-level").selectedIndex = 0;
document.querySelector("div#item-selector").style.display = "none";
document.querySelector("div#champion-info-spells").style.display = "none";
document.querySelector("div#champion-selector-search").style.display = "none";
document.querySelector("div#item-info").style.display = "none";
document.querySelector("input#searchItems").value = "";
document.querySelector("input#searchChampions").value = "";
grabLatestVersion();