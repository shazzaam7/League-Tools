const ChampionSelect = document.querySelector("div#champion-selector");

let currentChampion;
let resources = ["MANA", "ENERGY", "RAGE", "FURY"];
let lowerBound, upperBound;

function grabAllChampions() {
    document.getElementById('loading-screen').style.display = 'flex';
    ChampionSelect.innerHTML = "";
    fetch(`https://shazzaam7.github.io/LoL-DDragon/champions.json`)
        .then(res => res.json())
        .then(data => {
            for (let key in data) {
                let newChampion = document.createElement("div");
                let icon = document.createElement("img");
                let name = document.createElement("p");
                newChampion.className = "champion-icon";
                newChampion.value = key;
                newChampion.setAttribute("data-name", data[key].name);
                icon.src = data[key].icon;
                icon.className = "champion-icon";
                name.innerText = data[key].name;
                newChampion.appendChild(icon);
                newChampion.appendChild(name);
                newChampion.addEventListener("click", () => {
                    document.getElementById('loading-screen').style.display = 'flex';
                    grabChampionDetails(newChampion.value);
                    document.getElementById('loading-screen').style.display = 'none';
                    document.querySelector("div#champion-info-spells").style.display = "grid";
                    document.querySelector("div#champion-info-spells").scrollIntoView({ behavior: "smooth" });
                });
                ChampionSelect.appendChild(newChampion);
            }
            grabChampionDetails("Ahri");
            ChampionSelect.style.display = "grid";
            document.getElementById('loading-screen').style.display = 'none';
        }).catch(error => console.log(error))
}

function grabChampionDetails(championKey) {
    fetch(`https://shazzaam7.github.io/LoL-DDragon/Champions/${championKey}.json`)
        .then(res => res.json())
        .then(data => {
            currentChampion = data;
            switch (currentChampion.key) {
                case "Aatrox":
                    if (document.querySelector("select#champion-level").selectedIndex == 0) {
                        DefaultfillBaseStats();
                        fillAbilitiesDefault();
                    } else {
                        LevelFillBaseStats(document.querySelector("select#champion-level").selectedIndex);
                        fillAbilitiesDefault();
                    }
                    AatroxAbilities();
                    break;
                /*case "Akali":
                    console.log("Special Case!");
                    break;
                case "Aphelios":
                    console.log("Special Case!");
                    break;
                case "Ashe":
                    console.log("Special Case!");
                    break;
                case "AurelionSol":
                    console.log("Special Case!");
                    break;
                case "Camille":
                    console.log("Special Case!");
                    break;
                case "Corki":
                    console.log("Special Case!");
                    break;
                case "Elise":
                    console.log("Special Case!");
                    break;
                case "Evelynn":
                    console.log("Special Case!");
                    break;
                case "Fizz":
                    console.log("Special Case!");
                    break;
                case "Gnar":
                    console.log("Special Case!");
                    break;
                case "Heimerdinger":
                    console.log("Special Case!");
                    break;
                case "Jayce":
                    console.log("Special Case!");
                    break;
                case "Karma":
                    console.log("Special Case!");
                    break;
                case "Khazix":
                    console.log("Special Case!");
                    break;
                case "Kled":
                    console.log("Special Case!");
                    break;
                case "LeeSin":
                    console.log("Special Case!");
                    break;
                case "Nidalee":
                    console.log("Special Case!");
                    break;
                case "Qiyana":
                    console.log("Special Case!");
                    break;
                case "Quinn":
                    console.log("Special Case!");
                    break;
                case "RekSai":
                    console.log("Special Case!");
                    break;
                case "Rell":
                    console.log("Special Case!");
                    break;
                case "Renekton":
                    console.log("Special Case!");
                    break;
                case "Riven":
                    console.log("Special Case!");
                    break;
                case "Sion":
                    console.log("Special Case!");
                    break;
                case "Swain":
                    console.log("Special Case!");
                    break;
                case "Sylas":
                    console.log("Special Case!");
                    break;
                case "TahmKench":
                    console.log("Special Case!");
                    break;
                case "Yorick":
                    console.log("Special Case!");
                    break;*/
                default:
                    if (document.querySelector("select#champion-level").selectedIndex == 0) {
                        DefaultfillBaseStats();
                        fillAbilitiesDefault();
                    } else {
                        LevelFillBaseStats(document.querySelector("select#champion-level").selectedIndex);
                        fillAbilitiesDefault();
                    }
                    break;
            }
        })
        .catch(error => console.log(error))
    ResetSearchChampions();
}

function DefaultfillBaseStats() {
    document.querySelector("img#champion-loading").src = currentChampion.skins[0].loadScreenPath;
    document.querySelector("span#champion-name").innerText = currentChampion.name.toUpperCase();
    document.querySelector("span#champion-title").innerText = currentChampion.title.toUpperCase();
    document.querySelector("p#health").innerText = roundNumbers(currentChampion.stats.health.flat) + ` (+ ${roundNumbers(currentChampion.stats.health.perLevel)} per Level)`;
    if (resources.indexOf(currentChampion.resource) < 0) {
        document.querySelector("p#resource-type").innerText = "RESOURCE";
        document.querySelector("p#resource").innerText = "N/A";
    } else {
        document.querySelector("p#resource-type").innerText = currentChampion.resource;
        document.querySelector("p#resource").innerText = roundNumbers(currentChampion.stats.mana.flat) + ` (+  ${roundNumbers(currentChampion.stats.mana.perLevel)} per Level)`;
    };
    document.querySelector("p#healthregen").innerText = roundNumbers(currentChampion.stats.healthRegen.flat) + ` (+ ${currentChampion.stats.healthRegen.perLevel} per Level)`;
    if (currentChampion.stats.manaRegen.flat > 0) {
        document.querySelector("p#resourceregen").innerText = currentChampion.stats.manaRegen.flat + ` (+ ${roundNumbers(currentChampion.stats.manaRegen.perLevel)} per Level)`;
    } else {
        document.querySelector("p#resourceregen").innerText = "0";
    }
    document.querySelector("p#armor").innerText = roundNumbers(currentChampion.stats.armor.flat) + ` (+ ${roundNumbers(currentChampion.stats.armor.perLevel)} per Level)`;
    document.querySelector("p#attackdamage").innerText = roundNumbers(currentChampion.stats.attackDamage.flat) + ` (+ ${roundNumbers(currentChampion.stats.attackDamage.perLevel)} per Level)`;
    document.querySelector("p#magicresist").innerText = roundNumbers(currentChampion.stats.magicResistance.flat) + ` (+ ${roundNumbers(currentChampion.stats.magicResistance.perLevel)} per Level)`;
    document.querySelector("p#critdamage").innerText = roundNumbers(currentChampion.stats.criticalStrikeDamage.flat) + "%";
    document.querySelector("p#movementspeed").innerText = roundNumbers(currentChampion.stats.movespeed.flat);
    document.querySelector("p#attackrange").innerText = roundNumbers(currentChampion.stats.attackRange.flat);
    document.querySelector("p#baseattackspeed").innerText = roundNumbers(currentChampion.stats.attackSpeed.flat);
    document.querySelector("p#attackspeedratio").innerText = roundNumbers(currentChampion.stats.attackSpeedRatio.flat);
    document.querySelector("p#bonusas").innerText = `${roundNumbers(currentChampion.stats.attackSpeed.perLevel)}% per Level`;
    document.querySelector("p#gameplayradius").innerText = roundNumbers(currentChampion.stats.gameplayRadius.flat);
    document.querySelector("p#selectionradius").innerText = roundNumbers(currentChampion.stats.selectionRadius.flat);
    document.querySelector("p#pathingradius").innerText = roundNumbers(currentChampion.stats.pathingRadius.flat);
    document.querySelector("p#acqradius").innerText = roundNumbers(currentChampion.stats.acquisitionRadius.flat);
}

function LevelFillBaseStats(Level) {
    let f = (Level - 1) * (.7025 + (.0175 * (Level - 1)));
    document.querySelector("img#champion-loading").src = currentChampion.skins[0].loadScreenPath;
    document.querySelector("span#champion-name").innerText = currentChampion.name.toUpperCase();
    document.querySelector("span#champion-title").innerText = currentChampion.title.toUpperCase();
    document.querySelector("p#critdamage").innerText = currentChampion.stats.criticalStrikeDamage.flat + "%";
    document.querySelector("p#movementspeed").innerText = currentChampion.stats.movespeed.flat;
    document.querySelector("p#attackrange").innerText = currentChampion.stats.attackRange.flat;
    document.querySelector("p#baseattackspeed").innerText = currentChampion.stats.attackSpeed.flat;
    document.querySelector("p#attackspeedratio").innerText = roundNumbers(currentChampion.stats.attackSpeedRatio.flat);
    document.querySelector("p#bonusas").innerText = roundNumbers(currentChampion.stats.attackSpeed.perLevel * f) + "%";
    document.querySelector("p#gameplayradius").innerText = roundNumbers(currentChampion.stats.gameplayRadius.flat);
    document.querySelector("p#selectionradius").innerText = roundNumbers(currentChampion.stats.selectionRadius.flat);
    document.querySelector("p#pathingradius").innerText = roundNumbers(currentChampion.stats.pathingRadius.flat);
    document.querySelector("p#acqradius").innerText = roundNumbers(currentChampion.stats.acquisitionRadius.flat);
    document.querySelector("p#health").innerText = roundNumbers(currentChampion.stats.health.flat + (currentChampion.stats.health.perLevel * f));
    document.querySelector("p#healthregen").innerText = roundNumbers(currentChampion.stats.healthRegen.flat + (currentChampion.stats.healthRegen.perLevel * f));
    document.querySelector("p#armor").innerText = roundNumbers(currentChampion.stats.armor.flat + (currentChampion.stats.armor.perLevel * f));
    document.querySelector("p#attackdamage").innerText = roundNumbers(currentChampion.stats.attackDamage.flat + (currentChampion.stats.attackDamage.perLevel * f));
    document.querySelector("p#magicresist").innerText = roundNumbers(currentChampion.stats.magicResistance.flat + (currentChampion.stats.magicResistance.perLevel * f));
    if (resources.indexOf(currentChampion.resource) < 0) {
        document.querySelector("p#resource-type").innerText = "RESOURCE";
        document.querySelector("p#resource").innerText = "N/A";
        document.querySelector("p#resourceregen").innerText = 0;
    } else {
        document.querySelector("p#resource-type").innerText = currentChampion.resource;
        document.querySelector("p#resource").innerText = roundNumbers(currentChampion.stats.mana.flat + (currentChampion.stats.mana.perLevel * f));
        document.querySelector("p#resourceregen").innerText = roundNumbers(currentChampion.stats.manaRegen.flat + (currentChampion.stats.manaRegen.perLevel * f));
    };
}

function fillAbilitiesDefault() {
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
            let br = document.createElement('br');
            newItem.id = "passive-effect";
            styleEffect(effect.description);
            newItem.innerText = effect.description;
            document.querySelector(`div#passive-effect${index + 1}`).appendChild(newItem);
        });
        document.querySelector(`div#passive-stats${index + 1}`).innerHTML = "";
        for (let attribute in currentChampion.abilities.P[index]) {
            if (currentChampion.abilities.P[0][attribute] != null) {
                switch (attribute) {
                    case "cooldown":
                        let newDiv = document.createElement("div");
                        let newItem = document.createElement("p");
                        if (currentChampion.abilities.P[index].cooldown.modifiers[0].values[0] == currentChampion.abilities.P[index].cooldown.modifiers[0].values[currentChampion.abilities.P[index].cooldown.modifiers[0].values.length - 1]) {
                            newItem.innerText = `Cooldown: ${currentChampion.abilities.P[index].cooldown.modifiers[0].values[0]} seconds`;
                            newDiv.appendChild(newItem);
                        } else {
                            if (currentChampion.abilities.P[index].cooldown.modifiers[0].values.length > 5) {
                                newItem.innerText = `Cooldown: ${currentChampion.abilities.P[index].cooldown.modifiers[0].values[0]} - ${currentChampion.abilities.P[index].cooldown.modifiers[0].values[currentChampion.abilities.P[index].cooldown.modifiers[0].values.length - 1]} (Based on Level) seconds`;
                                newItem.title = `Formula: ${currentChampion.abilities.P[index].cooldown.modifiers[0].values[0]} - ${currentChampion.abilities.P[index].cooldown.modifiers[0].values[currentChampion.abilities.P[index].cooldown.modifiers[0].values.length - 1]} / 17 * (Level - 1)`;
                                newDiv.appendChild(newItem);
                            } else {
                                newItem.innerText = `Cooldown: ${currentChampion.abilities.P[index].cooldown.modifiers[0].values.join(' / ')} (Based on Level) seconds`;
                                newItem.title = `Formula: ${currentChampion.abilities.P[index].cooldown.modifiers[0].values[0]} - ${currentChampion.abilities.P[index].cooldown.modifiers[0].values[currentChampion.abilities.P[index].cooldown.modifiers[0].values.length - 1]} / 17 * (Level - 1)`;
                                newDiv.appendChild(newItem);
                            }
                        }
                        document.querySelector(`div#passive-stats${index + 1}`).appendChild(newDiv);
                        break;

                    default:
                        break;
                }
            }
        }
        styleAbilities(document.querySelectorAll(`div#passive-effect${index + 1}`));
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
}

// Champion Abilities Fit
function AatroxAbilities() {
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
            styleEffect(effect.description);
            newItem.innerText = effect.description;
            document.querySelector(`div#passive-effect${index + 1}`).appendChild(newItem);
        })
        styleAbilities(document.querySelectorAll(`div#passive-effect${index + 1}`));
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


    // W


    // E


    // R
}

function styleEffect(effectDescription) {
    const match = effectDescription.match(/(\d+)% − (\d+)% \(based on level\)/);
    if (effectDescription.match(/(\d+)% − (\d+)% \(based on level\)/)) {
        if (match[1] !== undefined && match[2] !== undefined) {
            lowerBound = parseInt(match[1]);
            upperBound = parseInt(match[2]);
        }
    }
}

function styleAbilities(element) {
    element.forEach(p => {
        let text = p.textContent;
        const regex = /(Innate(?:\s*-\s*[\w\s]+)?\s*:|Active(?:\s*-\s*[\w\s]+)?\s*:|Passive(?:\s*-\s*[\w\s]+)?\s*:|Recast(?:\s*-\s*[\w\s]+)?\s*:|Toggle(?:\s*-\s*[\w\s]+)?\s*:|Pow-Pow(?:\s*-\s*[\w\s]+)?\s*:|Fishbones(?:\s*-\s*[\w\s]+)?\s*:|First Cast(?:\s*-\s*[\w\s]+)?\s*:|Second Cast(?:\s*-\s*[\w\s]+)?\s*:|Third Cast(?:\s*-\s*[\w\s]+)?\s*:|Passive - Soul-Marked(?:\s*-\s*[\w\s]+)?\s*:|Swinging Kama(?:\s*-\s*[\w\s]+)?\s*:|Singularity(?:\s*-\s*[\w\s]+)?\s*:|Breath of Light(?:\s*-\s*[\w\s]+)?\s*:|Astral Flight(?:\s*-\s*[\w\s]+)?\s*:)/g;
        let modifiedContent = text.replace(regex, match => {
            switch (match) {
                case /Pow-Pow(?:\s*-\s*[\w\s]+)?\s*:/.test(match) && match:
                    return `<br><span class="extra-text">${match}</span>`;
                case /Fishbones(?:\s*-\s*[\w\s]+)?\s*:/.test(match) && match:
                    return `<br><span class="extra-text">${match}</span>`;
                case /Swinging Kama(?:\s*-\s*[\w\s]+)?\s*:/.test(match) && match:
                    return `<br><span class="extra-text">${match}</span>`;
                case /Singularity(?:\s*-\s*[\w\s]+)?\s*:/.test(match) && match:
                    return `<br><span class="extra-text">${match}</span>`;
                case /Breath of Light(?:\s*-\s*[\w\s]+)?\s*:/.test(match) && match:
                    return `<br><span class="extra-text">${match}</span>`;
                case /Astral Flight(?:\s*-\s*[\w\s]+)?\s*:/.test(match) && match:
                    return `<br><span class="extra-text">${match}</span>`;
                case /First Cast(?:\s*-\s*[\w\s]+)?\s*:/.test(match) && match:
                    return `<br><span class="extra-text">${match}</span>`;
                case /Second Cast(?:\s*-\s*[\w\s]+)?\s*:/.test(match) && match:
                    return `<br><span class="extra-text">${match}</span>`;
                case /Third Cast(?:\s*-\s*[\w\s]+)?\s*:/.test(match) && match:
                    return `<br><span class="extra-text">${match}</span>`;
                default:
                    return `<br><span class="innate-text">${match}</span>`;
            };
        });
        p.innerHTML = modifiedContent;
    })
}

document.querySelector("input#searchChampions").addEventListener("input", () => {
    const Champions = document.querySelectorAll("div.champion-icon");
    Champions.forEach(champion => {
        if (champion.dataset.name.toLowerCase().includes(document.querySelector("input#searchChampions").value.toLowerCase())) {
            champion.style.display = "flex";
        } else {
            champion.style.display = "none";
        }
    })
})

function ResetSearchChampions() {
    document.querySelector("input#searchChampions").value = "";
    const Champions = document.querySelectorAll("div.champion-icon");
    Champions.forEach(champion => {
        champion.style.display = "flex";
    })
}

document.querySelector("select#champion-level").addEventListener("change", () => {
    if (currentChampion != "") {
        if (document.querySelector("select#champion-level").selectedIndex == 0) {
            DefaultfillBaseStats()
        } else {
            LevelFillBaseStats(document.querySelector("select#champion-level").selectedIndex);
        }
    }
});