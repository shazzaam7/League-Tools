// https://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/runesReforged.json - This is where everything about runes is
// https://github.com/InFinity54/LoL_DDragon - Easier way to find my way around the data

// Global
let PrimaryRuneTree, SecondaryRuneTree;

/**
 * This is where all Primary Runes are
 * Order: Keystone, Primary Rune 1, Primary Rune 2, Primary Rune 3
 */
let SelectedPrimaryRunes = [];

/**
 * This is where all Secondary Runes are
 * Order: Secondary Rune 1 (Oldest Selected), Secondary Rune 2 (Newest Selected)
 */
let SelectedSecondaryRunes = ["", ""];

/**
 * This is where all Mini Runes are
 * Order: Mini Rune Row 1, Mini Rune Row 2, Mini Rune Row 3
 */
let SelectedMiniRunes = [];

document.addEventListener("DOMContentLoaded", () => {

    /**
     * Primary Tree Selection
     */
    document.querySelectorAll(".primary-rune-tree-selection > div").forEach((RuneSelection) => {
        RuneSelection.addEventListener("click", () => {
            document.querySelector("div.secondary-tree").removeAttribute("hidden");
            if (RuneSelection.getAttribute("data-rune-tree") != PrimaryRuneTree) {
                // Trying to find secondary rune tree that is the same as currently selected primary rune tree
                document.querySelectorAll(".secondary-rune-tree-selection > div").forEach(SecondaryRune => {
                    if (RuneSelection.getAttribute("data-rune-tree") == SecondaryRune.getAttribute("data-rune-tree")) {
                        if (SecondaryRune.classList.contains("selected")) {
                            // Removing runes from Array SelectedSecondaryRunes
                            SelectedSecondaryRunes = ["", ""];
                            SecondaryRune.classList.remove("selected");
                            document.querySelectorAll(".secondary-rune-tree > div[id]").forEach((RuneTree) => {
                                console.log(RuneTree.id);
                                RuneTree.hidden = true;
                            });
                            document.querySelector("div.mini-runes").style.display = "none";
                        }
                        SecondaryRune.style.display = "none";
                    } else {
                        SecondaryRune.style.display = "flex";
                    }
                })

                // Putting currently selected primary tree into a var for later usage
                PrimaryRuneTree = RuneSelection.getAttribute("data-rune-tree");
                document.querySelectorAll(".primary-rune-tree-selection > div").forEach((otherRune) => {
                    if (otherRune != RuneSelection) {
                        otherRune.classList.remove("selected");
                    };
                });
                RuneSelection.classList.add("selected");
                document.querySelectorAll(".primary-rune-tree > div[id]").forEach((RuneTree) => {
                    RuneTree.hidden = true;
                });
                if (document.querySelector(`.primary-rune-tree > div#${RuneSelection.getAttribute("data-rune-tree")}`)) {
                    document.querySelector(`.primary-rune-tree > div#${RuneSelection.getAttribute("data-rune-tree")}`).hidden = false;
                };
                document.querySelector("button#clear-runes").removeAttribute("hidden");

                // Unselecting all of the previously selected runes
                document.querySelector(`.primary-rune-tree > div#${PrimaryRuneTree}`).childNodes.forEach(RuneTree => {
                    if (RuneTree.className == "rune-row" || RuneTree.className == "keystone-row") {
                        RuneTree.childNodes.forEach(Rune => {
                            if (Rune.localName == "div") {
                                if (Rune.classList.contains("selected")) {
                                    Rune.classList.remove("selected");
                                }
                            }
                        })
                    }
                });
            }
        });
    });

    /**
     * Primary Rune Selection
     */
    document.querySelectorAll('.primary-rune-tree > div[id]').forEach(RuneTree => {
        RuneTree.addEventListener('click', event => {
            // Check if the clicked element is an image inside a rune row
            if (event.target.parentElement.parentElement.classList.contains('rune-row') || event.target.parentElement.parentElement.classList.contains('keystone-row')) {
                let row = event.target.parentElement.parentElement;
                // Adding Primary Runes to the Array SelectedPrimaryRunes
                switch (true) {
                    case row.id.endsWith("row1"):
                        SelectedPrimaryRunes[1] = event.target.alt;
                        break;
                    case row.id.endsWith("row2"):
                        SelectedPrimaryRunes[2] = event.target.alt;
                        break;
                    case row.id.endsWith("row3"):
                        SelectedPrimaryRunes[3] = event.target.alt;
                        break;
                    default:
                        SelectedPrimaryRunes[0] = event.target.alt;
                        break;
                };
                // Remove the "selected" class from all runes in the row
                row.querySelectorAll('div').forEach(runeImg => {
                    runeImg.classList.remove('selected');
                });
                console.log(event.target.alt)
                // Add the "selected" class to the clicked rune image
                event.target.parentElement.classList.add('selected');
            }
        });
    });

    /**
     * Secondary Tree Selection
     */
    document.querySelectorAll(".secondary-rune-tree-selection > div").forEach((RuneSelection) => {
        RuneSelection.addEventListener("click", () => {
            if (RuneSelection.getAttribute("data-rune-tree") != SecondaryRuneTree) {
                // Removing runes from Array SelectedSecondaryRunes
                SelectedSecondaryRunes = ["", ""];
                SecondaryRuneTree = RuneSelection.getAttribute("data-rune-tree");
                document.querySelectorAll(".secondary-rune-tree-selection > div").forEach((otherRune) => {
                    if (otherRune != RuneSelection) {
                        otherRune.classList.remove("selected");
                    };
                });
                RuneSelection.classList.add("selected");
                document.querySelectorAll(".secondary-rune-tree > div[id]").forEach((RuneTree) => {
                    RuneTree.hidden = true;
                });
                if (document.querySelector(`.secondary-rune-tree > div#${RuneSelection.getAttribute("data-rune-tree")}`)) {
                    document.querySelector(`.secondary-rune-tree > div#${RuneSelection.getAttribute("data-rune-tree")}`).hidden = false;
                };
                document.querySelector("div.mini-runes").style.display = "flex";
                // Unselecting all of the previously selected runes
                document.querySelector(`.secondary-rune-tree > div#${SecondaryRuneTree}`).childNodes.forEach(RuneTree => {
                    if (RuneTree.className == "rune-row") {
                        RuneTree.childNodes.forEach(Rune => {
                            if (Rune.localName == "div") {
                                if (Rune.classList.contains("selected")) {
                                    Rune.classList.add("selected");
                                }
                            }
                        })
                    }
                });
            }
        });
    });

    /**
     * Secondary Rune Selection
     */
    document.querySelectorAll('.secondary-rune-tree > div[id]').forEach(RuneTree => {
        RuneTree.addEventListener('click', event => {
            // Check if the clicked element is an image inside a rune row
            if (event.target.parentElement.parentElement.classList.contains('rune-row')) {
                let row = event.target.parentElement.parentElement;
                // Case if none of the secondary runes are selected
                if (SelectedSecondaryRunes[0] == "" && SelectedSecondaryRunes[1] == "") {
                    SelectedSecondaryRunes[0] = event.target.alt;
                }
                else if (SelectedSecondaryRunes[0] != "" && SelectedSecondaryRunes[1] == "") {
                    if (document.querySelector(`div.secondary-rune-tree > div[id] > div[id] > div >img[alt="${SelectedSecondaryRunes[0]}"]`).parentElement.parentElement == event.target.parentElement.parentElement) {
                        SelectedSecondaryRunes[0] = event.target.alt;
                    }
                    else {
                        SelectedSecondaryRunes[1] = event.target.alt;
                    }
                }
                else {
                    if (document.querySelector(`div.secondary-rune-tree > div[id] > div[id] > div >img[alt="${SelectedSecondaryRunes[0]}"]`).parentElement.parentElement == row && document.querySelector(`div.secondary-rune-tree > div[id] > div[id] > div >img[alt="${SelectedSecondaryRunes[1]}"]`).parentElement.parentElement != row) {
                        SelectedSecondaryRunes[0] = event.target.alt;
                    }
                    else if (document.querySelector(`div.secondary-rune-tree > div[id] > div[id] > div >img[alt="${SelectedSecondaryRunes[0]}"]`).parentElement.parentElement != row && document.querySelector(`div.secondary-rune-tree > div[id] > div[id] > div >img[alt="${SelectedSecondaryRunes[1]}"]`).parentElement.parentElement == row) {
                        SelectedSecondaryRunes[1] = event.target.alt;
                    }
                    else {
                        row.parentElement.querySelectorAll("div.rune-row > div > img").forEach(runeImg => {
                            if (runeImg.alt == SelectedSecondaryRunes[0]) {
                                runeImg.parentElement.classList.remove('selected');
                            }
                        });
                        let temp = SelectedSecondaryRunes[1];
                        SelectedSecondaryRunes[0] = temp;
                        SelectedSecondaryRunes[1] = event.target.alt;
                    }
                };
                // Remove the "selected" class from all runes in the row
                row.querySelectorAll('div').forEach(runeImg => {
                    runeImg.classList.remove('selected');
                });
                // Add the "selected" class to the clicked rune image
                event.target.parentElement.classList.add('selected');
            }
        });
    });

    /**
     * Mini Runes Selection
     */
    document.querySelectorAll('.mini-runes > div').forEach(MiniRuneRow => {
        MiniRuneRow.addEventListener('click', event => {
            // Check if the clicked element is an image inside of a row
            if (event.target.parentElement.parentElement.classList.contains('mini-rune-row')) {
                let row = event.target.parentElement.parentElement;
                // Adding Primary Runes to the Array SelectedPrimaryRunes
                switch (true) {
                    case row.id.endsWith("row1"):
                        SelectedMiniRunes[0] = event.target.alt;
                        break;
                    case row.id.endsWith("row2"):
                        SelectedMiniRunes[1] = event.target.alt;
                        break;
                    case row.id.endsWith("row3"):
                        SelectedMiniRunes[2] = event.target.alt;
                        break;
                    default:
                        break;
                };
                // Remove the "selected" class from all mini runes in the same row
                row.querySelectorAll('div').forEach(runeImg => {
                    runeImg.classList.remove('selected');
                });
                // Add the "selected" class to the clicked mini rune image
                event.target.parentElement.classList.add('selected');
            }
        })
    })

    /**
     * Clear Runes Button
     */
    document.querySelector('button#clear-runes').addEventListener("click", () => {
        // Removing runes from Array SelectedPrimaryRunes
        SelectedPrimaryRunes = [];
        // Removing runes from Array SelectedSecondaryRunes
        SelectedSecondaryRunes = ["", ""];
        // Removing runes from Array SelectedMiniRunes
        SelectedMiniRunes = [];
        // Unselecting Primary Runes
        document.querySelectorAll('.primary-rune-tree > div[id]').forEach(RuneTree => {
            RuneTree.childNodes.forEach(RuneTreeRow => {
                if (RuneTreeRow.localName == "div") {
                    RuneTreeRow.childNodes.forEach(Rune => {
                        if (Rune.localName == "div" && Rune.classList.contains("selected")) {
                            Rune.classList.remove("selected");
                        }
                    })
                }
            })
        });

        // Unselecting Secondary Runes
        document.querySelectorAll('.secondary-rune-tree > div[id]').forEach(RuneTree => {
            RuneTree.childNodes.forEach(RuneTreeRow => {
                if (RuneTreeRow.localName == "div") {
                    RuneTreeRow.childNodes.forEach(Rune => {
                        if (Rune.localName == "div" && Rune.classList.contains("selected")) {
                            Rune.classList.remove("selected");
                        }
                    })
                }
            })
        });

        // Unselecting Mini Runes
        document.querySelectorAll('.mini-runes > div').forEach(MiniRuneRow => {
            MiniRuneRow.childNodes.forEach(MiniRune => {
                if (MiniRune.localName == "div" && MiniRune.classList.contains("selected")) {
                    MiniRune.classList.remove("selected");
                }
            })
        })
    })
});

/**
 * FillRuneTooltips function
 * Used to fill Rune tooltips with info about them
 */
function fillRuneTooltips() {
    fetch(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/runesReforged.json`)
        .then(res => res.json())
        .then(data => {
            data.forEach(Tree => {
                for (let index = 0; index < Tree.slots.length; index++) {
                    if (index == 0) {
                        Tree.slots[index].runes.forEach(Keystone => {
                            document.querySelector(`img[alt=${Keystone.key}]`).parentElement.setAttribute("data-tooltip", formatRunesTooltips(Keystone));
                        })
                    }
                    else {
                        Tree.slots[index].runes.forEach(Rune => {
                            //document.querySelector(`img[alt=${Rune.key}]`).parentElement.setAttribute("data-tooltip", Rune.longDesc);
                            document.querySelectorAll(`img[alt=${Rune.key}]`).forEach(rune => {
                                rune.parentElement.setAttribute("data-tooltip", formatRunesTooltips(Rune));
                            })
                        })
                    }
                }
            })
        })
        .catch(error => console.log(error));
}

function formatRunesTooltips(RuneInfo) {
    /**
     * Precision
     */
    // <br><br> to /n
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<br><br>/g, '\n');
    // <hr><br> ignore
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<hr><br>/g, '');
    // <hr> ignore
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<hr>/g, '');
    // <br> to /n
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<br>/g, '\n');
    // <i>text</i> to text
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<i>(.*?)<\/i>/g, '$1');
    // <li>text</li> to text
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<li>(.*?)<\/li>/g, '\n$1');
    // <gold>text</gold> to text
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<gold>(.*?)<\/gold>/g, '$1');
    // <attention>text</attention> to text
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<attention>(.*?)<\/attention>/g, '$1');
    // <speed>text</speed> to text
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<speed>(.*?)<\/speed>/g, '$1');
    // <truedamage>text</truedamage> to text
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<truedamage>(.*?)<\/truedamage>/g, '$1');
    // <scaleLevel>text</scaleLevel> to text
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<scaleLevel>(.*?)<\/scaleLevel>/g, '$1');
    // <scalehealth>text</scalehealth> to text
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<scalehealth>(.*?)<\/scalehealth>/g, '$1');
    // <scaleMana>text</scaleMana> to text
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<scaleMana>(.*?)<\/scaleMana>/g, '$1');
    // Press The Attack formatting
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<lol-uikit-tooltipped-keyword[^>]*>(.*?)<\/lol-uikit-tooltipped-keyword>/g, '$1');
    // Fleet Footwork formatting
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<speed>(\d+(\.\d+)?)% Move Speed<\/speed>/g, '$1% Movement Speed');
    // Triumph formatting
    //RuneInfo.longDesc = RuneInfo.longDesc.replace(/<i>'The most dangerous game brings the greatest glory.' —Noxian Reckoner<\/i>/, "'The most dangerous game brings the greatest glory.' - Noxian Reckoner");
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<i>'(.*?)'\s*—(.*?)<\/i>/, '$1 - $2');
    // Presence of Mind formatting
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/@RegenAmount@ \(80% for ranged\)/g, "1.5 − 11 (Melee) /  1.2 − 8.8 (Ranged) (based on level)");
    // Legend Runes formatting
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<statGood>(.*?)<\/statGood>/g, 'max 10 stacks');
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<scaleAD>(.*?)<\/scaleAD>/g, '$1');
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<scaleHealth>(.*?)<\/scaleHealth>/g, '$1');
    // Cut Down formatting
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<rules>(.*?)<\/rules>/s, '$1');

    /**
     * Domination
     */
    // Electrocute formatting
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<b>(.*?)<\/b>/g, '$1');
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<i>'(.*?)'<\/i>/g, '$1');
    // Predator formatting
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/'<font color='#c60300'>Predator<\/font>\.'/g, 'Predator.');
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<scaleAP>(.*?)<\/scaleAP>/g, '$1');
    // Zombie Ward
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<font color='#48C4B7'>(.*?)<\/font>/, '$1');
    // Eyeball Collection
    RuneInfo.longDesc = RuneInfo.longDesc.replace(/<font color='#48C4B7'>(.*?)<\/font>/, '$1');
    return `${RuneInfo.name}\n\n ${RuneInfo.longDesc}`;
}