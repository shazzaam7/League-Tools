const latestVersionURL = "https://ddragon.leagueoflegends.com/api/versions.json";
let gameVersion;

const ChampionSelect = document.querySelector("select#champion-select");
let currentChampion;
let resources = ["MANA", "ENERGY", "RAGE", "FURY"];

function grabLatestVersion() {
    fetch(latestVersionURL)
        .then(res => res.json())
        .then(data => {
            gameVersion = parseFloat(data[0]).toFixed(2);
            let version = document.createElement("h1");
            version.innerText = `Patch: ${gameVersion}`;
            ChampionSelect.before(version);
            grabAllChampions();
        })
        .catch(error => console.log(error))
};

function grabAllChampions() {
    fetch(`https://shazzaam7.github.io/LoL-DDragon/champions.json`)
        .then(res => res.json())
        .then(data => {
            for (let key in data) {
                let newChampion = document.createElement("option");
                newChampion.value = key;
                newChampion.innerText = data[key].name;
                ChampionSelect.appendChild(newChampion);
            }
            document.getElementById('loading-screen').style.display = 'none';
        }).catch(error => console.log(error))
}

function grabChampionDetails(championKey) {
    fetch(`https://shazzaam7.github.io/LoL-DDragon/Champions/${championKey}.json`)
        .then(res => res.json())
        .then(data => {
            currentChampion = data;
            fillBaseStats();
            fillAbilities();
        })
        .catch(error => console.log(error))
}

function fillBaseStats() {
    document.querySelector("img#champion-loading").src = currentChampion.skins[0].loadScreenPath;
    document.querySelector("span#champion-name").innerText = currentChampion.name.toUpperCase();
    document.querySelector("span#champion-title").innerText = currentChampion.title.toUpperCase();
    document.querySelector("p#health").innerText = currentChampion.stats.health.flat + ` (+ ${currentChampion.stats.health.perLevel} per Level)`;
    if (resources.indexOf(currentChampion.resource) < 0) {
        document.querySelector("p#resource-type").innerText = "RESOURCE";
        document.querySelector("p#resource").innerText = "N/A";
    } else {
        document.querySelector("p#resource-type").innerText = currentChampion.resource;
        document.querySelector("p#resource").innerText = currentChampion.stats.mana.flat + ` (+  ${currentChampion.stats.mana.perLevel} per Level)`;
    };
    document.querySelector("p#healthregen").innerText = currentChampion.stats.healthRegen.flat + ` (+ ${currentChampion.stats.healthRegen.perLevel} per Level)`;
    if (currentChampion.stats.manaRegen.flat > 0) {
        document.querySelector("p#resourceregen").innerText = currentChampion.stats.manaRegen.flat + ` (+ ${currentChampion.stats.manaRegen.perLevel} per Level)`;
    } else {
        document.querySelector("p#resourceregen").innerText = "0";
    }
    document.querySelector("p#armor").innerText = currentChampion.stats.armor.flat + ` (+ ${currentChampion.stats.armor.perLevel} per Level)`;
    document.querySelector("p#attackdamage").innerText = currentChampion.stats.attackDamage.flat + ` (+ ${currentChampion.stats.attackDamage.perLevel} per Level)`;
    document.querySelector("p#magicresist").innerText = currentChampion.stats.magicResistance.flat + ` (+ ${currentChampion.stats.magicResistance.perLevel} per Level)`;
    document.querySelector("p#critdamage").innerText = currentChampion.stats.criticalStrikeDamage.flat;
    document.querySelector("p#movementspeed").innerText = currentChampion.stats.movespeed.flat;
    document.querySelector("p#attackrange").innerText = currentChampion.stats.attackRange.flat;
    document.querySelector("p#baseattackspeed").innerText = currentChampion.stats.attackSpeed.flat;
    document.querySelector("p#attackspeedratio").innerText = currentChampion.stats.attackSpeedRatio.flat.toFixed(3);
    document.querySelector("p#bonusas").innerText = `${currentChampion.stats.attackSpeed.perLevel}% per Level`;
    document.querySelector("p#gameplayradius").innerText = currentChampion.stats.gameplayRadius.flat;
    document.querySelector("p#selectionradius").innerText = currentChampion.stats.selectionRadius.flat;
    document.querySelector("p#pathingradius").innerText = currentChampion.stats.pathingRadius.flat;
    document.querySelector("p#acqradius").innerText = currentChampion.stats.acquisitionRadius.flat;
}

function fillAbilities() {
    // Passive
    for (let index = currentChampion.abilities.P.length; index < 6; index++) {
        document.querySelector(`div#champion-passive${index + 1}`).removeAttribute("show");
        document.querySelector(`div#champion-passive${index + 1}`).setAttribute("hidden", "");
    }
    for (let index = 0; index < currentChampion.abilities.P.length; index++) {
        document.querySelector(`div#champion-passive${index + 1}`).removeAttribute("hidden");
        document.querySelector(`div#champion-passive${index + 1}`).setAttribute("show", "");
        document.querySelector(`p#passive-name${index + 1}`).innerText = currentChampion.abilities.P[index].name;
        document.querySelector(`div#passive-effect${index + 1}`).innerHTML = "";
        document.querySelector(`img#passive-icon${index + 1}`).removeAttribute("hidden");
        document.querySelector(`img#passive-icon${index + 1}`).setAttribute("show", "");
        document.querySelector(`img#passive-icon${index + 1}`).src = currentChampion.abilities.P[index].icon;
        currentChampion.abilities.P[index].effects.forEach(effect => {
            let newItem = document.createElement('div');
            newItem.id = "passive-effect";
            newItem.innerText = effect.description;
            document.querySelector(`div#passive-effect${index + 1}`).appendChild(newItem);
        })
        stylePassive(document.querySelectorAll(`div#passive-effect${index + 1}`));
        if (currentChampion.abilities.P[index].notes != "No additional details.") {
            document.querySelector(`div#passive-notes${index + 1}`).removeAttribute("hidden");
            document.querySelector(`p#passive-notes${index + 1}`).innerText = currentChampion.abilities.P[index].notes;
        } else {
            document.querySelector(`div#passive-notes${index + 1}`).setAttribute("hidden", "");
            document.querySelector(`p#passive-notes${index + 1}`).innerText = "";
        }
        document.getElementById(`passive-tab-hide${index + 1}`).addEventListener("click", () => {
            document.getElementById(`passive-details${index + 1}`).removeAttribute("show");
            document.getElementById(`passive-details${index + 1}`).setAttribute("hidden", "");
        });
        document.getElementById(`passive-tab-details${index + 1}`).addEventListener("click", () => {
            document.getElementById(`passive-details${index + 1}`).removeAttribute("hidden");
            document.getElementById(`passive-details${index + 1}`).setAttribute("show", "");
        })
    }
    // Q
    for (let index = currentChampion.abilities.Q.length; index < 6; index++) {
        document.querySelector(`div#championQ${index + 1}`).removeAttribute("show");
        document.querySelector(`div#championQ${index + 1}`).setAttribute("hidden", "");
    }
    for (let index = 0; index < currentChampion.abilities.Q.length; index++) {
        document.querySelector(`div#championQ${index + 1}`).removeAttribute("hidden");
        document.querySelector(`div#championQ${index + 1}`).setAttribute("show", "");
        document.querySelector(`p#q${index + 1}-name`).innerText = currentChampion.abilities.Q[index].name;
        document.querySelector(`div#q${index + 1}-effect`).innerHTML = "";
        document.querySelector(`img#q${index + 1}-icon`).removeAttribute("hidden");
        document.querySelector(`img#q${index + 1}-icon`).setAttribute("show", "");
        document.querySelector(`img#q${index + 1}-icon`).src = currentChampion.abilities.Q[index].icon;
        currentChampion.abilities.Q[index].effects.forEach(effect => {
            let newItem = document.createElement('div');
            newItem.id = "passive-effect";
            newItem.innerText = effect.description;
            document.querySelector(`div#q${index + 1}-effect`).appendChild(newItem);
        })
        styleAbilities(document.querySelectorAll(`div#q${index + 1}-effect`));
        if (currentChampion.abilities.Q[index].notes != "No additional details.") {
            document.querySelector(`div#q${index + 1}-notes`).removeAttribute("hidden");
            document.querySelector(`p#q${index + 1}-notes`).innerText = currentChampion.abilities.Q[index].notes;
        } else {
            document.querySelector(`div#q${index + 1}-notes`).setAttribute("hidden", "");
            document.querySelector(`p#q${index + 1}-notes`).innerText = "";
        }
        document.getElementById(`q${index + 1}-tab-hide`).addEventListener("click", () => {
            document.getElementById(`q${index + 1}-details`).removeAttribute("show");
            document.getElementById(`q${index + 1}-details`).setAttribute("hidden", "");
        });

        document.getElementById(`q${index + 1}-tab-details`).addEventListener("click", () => {
            document.getElementById(`q${index + 1}-details`).removeAttribute("hidden");
            document.getElementById(`q${index + 1}-details`).setAttribute("show", "");
        })
    }
    // W
    for (let index = currentChampion.abilities.W.length; index < 2; index++) {
        document.querySelector(`div#championW${index + 1}`).removeAttribute("show");
        document.querySelector(`div#championW${index + 1}`).setAttribute("hidden", "");
    }
    for (let index = 0; index < currentChampion.abilities.W.length; index++) {
        document.querySelector(`div#championW${index + 1}`).removeAttribute("hidden");
        document.querySelector(`div#championW${index + 1}`).setAttribute("show", "");
        document.querySelector(`p#w${index + 1}-name`).innerText = currentChampion.abilities.W[index].name;
        document.querySelector(`div#w${index + 1}-effect`).innerHTML = "";
        document.querySelector(`img#w${index + 1}-icon`).removeAttribute("hidden");
        document.querySelector(`img#w${index + 1}-icon`).setAttribute("show", "");
        document.querySelector(`img#w${index + 1}-icon`).src = currentChampion.abilities.W[index].icon;
        currentChampion.abilities.W[index].effects.forEach(effect => {
            let newItem = document.createElement('div');
            newItem.id = "passive-effect";
            newItem.innerText = effect.description;
            document.querySelector(`div#w${index + 1}-effect`).appendChild(newItem);
        })
        styleAbilities(document.querySelectorAll(`div#w${index + 1}-effect`));
        if (currentChampion.abilities.W[index].notes != "No additional details.") {
            document.querySelector(`div#w${index + 1}-notes`).removeAttribute("hidden");
            document.querySelector(`p#w${index + 1}-notes`).innerText = currentChampion.abilities.W[index].notes;
        } else {
            document.querySelector(`div#w${index + 1}-notes`).setAttribute("hidden", "");
            document.querySelector(`p#w${index + 1}-notes`).innerText = "";
        }
        document.getElementById(`w${index + 1}-tab-hide`).addEventListener("click", () => {
            document.getElementById(`w${index + 1}-details`).removeAttribute("show");
            document.getElementById(`w${index + 1}-details`).setAttribute("hidden", "");
        });

        document.getElementById(`w${index + 1}-tab-details`).addEventListener("click", () => {
            document.getElementById(`w${index + 1}-details`).removeAttribute("hidden");
            document.getElementById(`w${index + 1}-details`).setAttribute("show", "");
        })
    }
    // E
    for (let index = currentChampion.abilities.E.length; index < 2; index++) {
        document.querySelector(`div#championE${index + 1}`).removeAttribute("show");
        document.querySelector(`div#championE${index + 1}`).setAttribute("hidden", "");
    }
    for (let index = 0; index < currentChampion.abilities.E.length; index++) {
        document.querySelector(`div#championE${index + 1}`).removeAttribute("hidden");
        document.querySelector(`div#championE${index + 1}`).setAttribute("show", "");
        document.querySelector(`p#e${index + 1}-name`).innerText = currentChampion.abilities.E[index].name;
        document.querySelector(`div#e${index + 1}-effect`).innerHTML = "";
        document.querySelector(`img#e${index + 1}-icon`).removeAttribute("hidden");
        document.querySelector(`img#e${index + 1}-icon`).setAttribute("show", "");
        document.querySelector(`img#e${index + 1}-icon`).src = currentChampion.abilities.E[index].icon;
        currentChampion.abilities.E[index].effects.forEach(effect => {
            let newItem = document.createElement('div');
            newItem.id = "passive-effect";
            newItem.innerText = effect.description;
            document.querySelector(`div#e${index + 1}-effect`).appendChild(newItem);
        })
        styleAbilities(document.querySelectorAll(`div#e${index + 1}-effect`));
        if (currentChampion.abilities.E[index].notes != "No additional details.") {
            document.querySelector(`div#e${index + 1}-notes`).removeAttribute("hidden");
            document.querySelector(`p#e${index + 1}-notes`).innerText = currentChampion.abilities.E[index].notes;
        } else {
            document.querySelector(`div#e${index + 1}-notes`).setAttribute("hidden", "");
            document.querySelector(`p#e${index + 1}-notes`).innerText = "";
        }
        document.getElementById(`e${index + 1}-tab-hide`).addEventListener("click", () => {
            document.getElementById(`e${index + 1}-details`).removeAttribute("show");
            document.getElementById(`e${index + 1}-details`).setAttribute("hidden", "");
        });

        document.getElementById(`e${index + 1}-tab-details`).addEventListener("click", () => {
            document.getElementById(`e${index + 1}-details`).removeAttribute("hidden");
            document.getElementById(`e${index + 1}-details`).setAttribute("show", "");
        })
    }
    // R
    for (let index = currentChampion.abilities.R.length; index < 2; index++) {
        document.querySelector(`div#championR${index + 1}`).removeAttribute("show");
        document.querySelector(`div#championR${index + 1}`).setAttribute("hidden", "");
    }
    for (let index = 0; index < currentChampion.abilities.R.length; index++) {
        document.querySelector(`div#championR${index + 1}`).removeAttribute("hidden");
        document.querySelector(`div#championR${index + 1}`).setAttribute("show", "");
        document.querySelector(`p#r${index + 1}-name`).innerText = currentChampion.abilities.R[index].name;
        document.querySelector(`div#r${index + 1}-effect`).innerHTML = "";
        document.querySelector(`img#r${index + 1}-icon`).removeAttribute("hidden");
        document.querySelector(`img#r${index + 1}-icon`).setAttribute("show", "");
        document.querySelector(`img#r${index + 1}-icon`).src = currentChampion.abilities.R[index].icon;
        currentChampion.abilities.R[index].effects.forEach(effect => {
            let newItem = document.createElement('div');
            newItem.id = "passive-effect";
            newItem.innerText = effect.description;
            document.querySelector(`div#r${index + 1}-effect`).appendChild(newItem);
        })
        styleAbilities(document.querySelectorAll(`div#r${index + 1}-effect`));
        if (currentChampion.abilities.R[index].notes != "No additional details.") {
            document.querySelector(`div#r${index + 1}-notes`).removeAttribute("hidden");
            document.querySelector(`p#r${index + 1}-notes`).innerText = currentChampion.abilities.R[index].notes;
        } else {
            document.querySelector(`div#r${index + 1}-notes`).setAttribute("hidden", "");
            document.querySelector(`p#r${index + 1}-notes`).innerText = "";
        }
        document.getElementById(`r${index + 1}-tab-hide`).addEventListener("click", () => {
            document.getElementById(`r${index + 1}-details`).removeAttribute("show");
            document.getElementById(`r${index + 1}-details`).setAttribute("hidden", "");
        });

        document.getElementById(`r${index + 1}-tab-details`).addEventListener("click", () => {
            document.getElementById(`r${index + 1}-details`).removeAttribute("hidden");
            document.getElementById(`r${index + 1}-details`).setAttribute("show", "");
        })
    }
    document.getElementById('loading-screen').style.display = 'none';
    document.querySelector("div#champion-info-spells").style.display = "grid";
}

function stylePassive(element) {
    element.forEach(p => {
        let text = p.textContent;
        const regex = /Innate(?:\s*-\s*[\w\s]+)?\s*:/g;
        const modifiedContent = text.replace(regex, '\n$&');
        p.innerHTML = modifiedContent.replace(regex,
            '<br><span class="innate-text">$&</span>');
    })
}

function styleAbilities(element) {
    element.forEach(p => {
        let text = p.textContent;
        const regex = /(Active(?:\s*-\s*[\w\s]+)?\s*:|Passive(?:\s*-\s*[\w\s]+)?\s*:)/g;
        const modifiedContent = text.replace(regex, '\n$&');
        p.innerHTML = modifiedContent.replace(regex,
            '<br><span class="innate-text">$&</span>');
    })
}

document.querySelector("div#champion-info-spells").style.display = "none";

ChampionSelect.addEventListener("change", (event) => {
    if (ChampionSelect.selectedIndex > 0) {
        document.getElementById('loading-screen').style.display = 'flex';
        grabChampionDetails(event.target.value)
    } else if (ChampionSelect.selectedIndex == 0) {
        document.querySelector("div#champion-info-spells").style.display = "none";
    }
});

grabLatestVersion();