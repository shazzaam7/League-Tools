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
            console.log(data);
            for (let key in data) {
                let newChampion = document.createElement("option");
                newChampion.value = key;
                newChampion.innerText = data[key].name;
                ChampionSelect.appendChild(newChampion);
            }
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
    console.log(currentChampion.abilities);
    // Passive
    document.querySelector("p#passive-name").innerText = "Passive: " + currentChampion.abilities.P[0].name;
    document.querySelector("div#passive-effect").innerHTML = "";
    document.querySelector("img#passive-icon").removeAttribute("hidden");
    document.querySelector("img#passive-icon").setAttribute("show", "");
    document.querySelector("img#passive-icon").src = currentChampion.abilities.P[0].icon;
    currentChampion.abilities.P[0].effects.forEach(effect => {
        let newItem = document.createElement('div');
        newItem.id = "passive-effect";
        newItem.innerText = effect.description;
        document.querySelector("div#passive-effect").appendChild(newItem);
    })
    styleText(document.querySelectorAll("div#passive-effect"));
    if (currentChampion.abilities.P[0].notes != "No additional details.") {
        document.querySelector("div#passive-notes").removeAttribute("hidden");
        document.querySelector("p#passive-notes").innerText = currentChampion.abilities.P[0].notes;
    } else {
        document.querySelector("div#passive-notes").setAttribute("hidden", "");
        document.querySelector("p#passive-notes").innerText = "";
    }
    // Q
}

function styleText(element) {
    element.forEach(p => {
        let lines = p.textContent.split('\n');
        lines.forEach((line, index) => {
            const colonIndex = line.indexOf(':');
            if (colonIndex !== -1) {
                const styledText = `<span>${line.substring(0, colonIndex + 1)}</span>${line.substring(colonIndex + 1)}`;
                lines[index] = styledText;
            }
        });
        p.innerHTML = lines.join('<br>');
    })
}

ChampionSelect.addEventListener("change", (event) => {
    if (ChampionSelect.selectedIndex > 0) {
        grabChampionDetails(event.target.value)
    }
});

document.getElementById("passive-tab-hide").addEventListener("click", () => {
    document.getElementById("passive-details").removeAttribute("show");
    document.getElementById("passive-details").setAttribute("hidden", "");
});

document.getElementById("passive-tab-details").addEventListener("click", () => {
    document.getElementById("passive-details").removeAttribute("hidden");
    document.getElementById("passive-details").setAttribute("show", "");
})

document.getElementById("q-tab-hide").addEventListener("click", () => {
    document.getElementById("q-details").removeAttribute("show");
    document.getElementById("q-details").setAttribute("hidden", "");
});

document.getElementById("q-tab-details").addEventListener("click", () => {
    document.getElementById("q-details").removeAttribute("hidden");
    document.getElementById("q-details").setAttribute("show", "");
})

document.getElementById("w-tab-hide").addEventListener("click", () => {
    document.getElementById("w-details").removeAttribute("show");
    document.getElementById("w-details").setAttribute("hidden", "");
});

document.getElementById("w-tab-details").addEventListener("click", () => {
    document.getElementById("w-details").removeAttribute("hidden");
    document.getElementById("w-details").setAttribute("show", "");
})

document.getElementById("e-tab-hide").addEventListener("click", () => {
    document.getElementById("e-details").removeAttribute("show");
    document.getElementById("e-details").setAttribute("hidden", "");
});

document.getElementById("e-tab-details").addEventListener("click", () => {
    document.getElementById("e-details").removeAttribute("hidden");
    document.getElementById("e-details").setAttribute("show", "");
})

document.getElementById("r-tab-hide").addEventListener("click", () => {
    document.getElementById("r-details").removeAttribute("show");
    document.getElementById("r-details").setAttribute("hidden", "");
});

document.getElementById("r-tab-details").addEventListener("click", () => {
    document.getElementById("r-details").removeAttribute("hidden");
    document.getElementById("r-details").setAttribute("show", "");
})


grabLatestVersion();