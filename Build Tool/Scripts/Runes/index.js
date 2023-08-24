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
                        if (SecondaryRune.className == "selected") {
                            // Removing runes from Array SelectedSecondaryRunes
                            SelectedSecondaryRunes = ["", ""];
                            SecondaryRune.className = "";
                            document.querySelectorAll(".secondary-rune-tree > div[id]").forEach((RuneTree) => {
                                RuneTree.hidden = true;
                            });
                            document.querySelector("div.mini-runes").style.display = "none";
                        };
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
                                if (Rune.className == "selected") {
                                    Rune.className = "";
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
                                if (Rune.className == "selected") {
                                    Rune.className = "";
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
                    SelectedSecondaryRunes[1] = event.target.alt;
                }
                else {
                    if (document.querySelector(`img[alt="${SelectedSecondaryRunes[0]}"]`).parentElement.parentElement == row) {
                        let temp = SelectedSecondaryRunes[1];
                        SelectedSecondaryRunes[0] = temp;
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
                    };
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
                        if (Rune.localName == "div" && Rune.className == "selected") {
                            Rune.className = "";
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
                        if (Rune.localName == "div" && Rune.className == "selected") {
                            Rune.className = "";
                        }
                    })
                }
            })
        });

        // Unselecting Mini Runes
        document.querySelectorAll('.mini-runes > div').forEach(MiniRuneRow => {
            MiniRuneRow.childNodes.forEach(MiniRune => {
                if (MiniRune.localName == "div" && MiniRune.className == "selected") {
                    MiniRune.className = "";
                }
            })
        })
    })
});