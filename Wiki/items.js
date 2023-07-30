let nonSummonersRiftItems = ["Guardian's Horn", "Guardian's Orb", "Guardian's Blade", "Guardian's Hammer", "Hextech Gunblade", "Zephyr", "Rite of Ruin", "Spectral Cutlass"]

function grabAllItems() {
    document.getElementById('loading-screen').style.display = 'flex';
    document.querySelector("div#starter-items").innerHTML = "";
    fetch("https://shazzaam7.github.io/LoL-DDragon/items.json")
        .then(res => res.json())
        .then(data => {
            for (let key in data) {
                if (data[key].requiredChampion == "" && !nonSummonersRiftItems.includes(data[key].name)) {
                    let icon = document.createElement("img");
                    icon.src = data[key].icon;
                    icon.alt = key;
                    icon.addEventListener("click", () => {
                        grabItemDetails(icon.alt);
                    });
                    switch (data[key].rank[0]) {
                        case "STARTER":
                            document.querySelector("div#starter-items").appendChild(icon);
                            break;
                        case "BASIC":
                            document.querySelector("div#basic-items").appendChild(icon);
                            break;
                        case "BOOTS":
                            document.querySelector("div#boots").appendChild(icon);
                            break;
                        case "EPIC":
                            document.querySelector("div#epic-items").appendChild(icon);
                            break;
                        case "LEGENDARY":
                            document.querySelector("div#legendary-items").appendChild(icon);
                            break;
                        case "MYTHIC":
                            document.querySelector("div#mythic-items").appendChild(icon);
                            break;
                        default:
                            break;
                    }
                    if (data[key].requiredAlly == "Ornn") {
                        document.querySelector("div#ornn-items").appendChild(icon);
                    }
                }
            }
            document.getElementById('loading-screen').style.display = 'none';
        })
        .catch(error => console.log(error));
}

function grabItemDetails(itemKey) {
    fetch(`https://shazzaam7.github.io/LoL-DDragon/Items/${itemKey}.json`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            document.querySelector("div#item-info").style.display = "grid";
            document.querySelector("img#item-icon").src = data.icon;
            document.querySelector("span#item-name").innerHTML = data.name;
            document.querySelector("span#item-cost").innerHTML = data.shop.prices.total;
        })
        .catch(error => console.log(error));
}