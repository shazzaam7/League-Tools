// Global
let PrimaryRuneTree, SecondaryRuneTree;

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

                // Unselecting all of the prevously selected runes
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
                // Unselecting all of the prevously selected runes
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