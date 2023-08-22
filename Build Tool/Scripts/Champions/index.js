// Global variables
//let f = (Level - 1) * (.7025 + (.0175 * (Level - 1))); - Used to calculate stats per level

/**
 * Used to store current champion for further use
 */
let currentChampion;

// Functions
/**
 * GetAllChampions Function
 * Used to get all of the champions and load them into the champion select
 */
function getAllChampions() {
  fetch(`https://shazzaam7.github.io/LoL-DDragon/champions.json`)
    .then((res) => res.json())
    .then((data) => {
      for (let key in data) {
        let Champion = document.createElement("div");
        let Icon = document.createElement("img");
        let ChampionName = document.createElement("p");
        Champion.className = "champion";
        Champion.value = key;
        Champion.setAttribute("data-name", data[key].name);
        Icon.className = "champion-icon";
        Icon.src = data[key].icon;
        Icon.alt = data[key].name;
        ChampionName.className = "champion-name";
        ChampionName.innerText = data[key].name;
        Champion.appendChild(Icon);
        Champion.appendChild(ChampionName);
        Champion.addEventListener("click", () => {
          console.log(Champion.getAttribute("data-name"));
          grabChampionDetails(Champion.value);
          document.querySelector("input#searchChampions").value = "";
          document.querySelectorAll("div.champion").forEach((champion) => {
            if (champion.style.display == "none") {
              champion.style.display = "flex";
            }
          });
        });
        document.querySelector("div#champions").appendChild(Champion);
      }
      document.getElementById("loading").style.display = "none";
    })
    .catch((error) => console.log(error));
}

/**
 * grabChampionDetails Function
 * Used for grabbing details about Champions (Base Stats, Abilities, etc.)
 * @param {*} ChampionKey
 */
function grabChampionDetails(ChampionKey) {
  document.getElementById("loading").style.display = "flex";
  fetch(`https://shazzaam7.github.io/LoL-DDragon/champions/${ChampionKey}.json`)
    .then((res) => res.json())
    .then((data) => {
      currentChampion = data;
      switch (ChampionKey) {
        case "Aatrox":
        case "Ahri":
          window[`${ChampionKey}`](data);
          document.getElementById("loading").style.display = "none";
          document.querySelector("div.champion-details").style.display =
            "block";
          document
            .querySelector("div.champion-details")
            .scrollIntoView({ behavior: "smooth" });
          break;
        default:
          Default(data);
          document.getElementById("loading").style.display = "none";
          document.querySelector("div.champion-details").style.display =
            "block";
          document
            .querySelector("div.champion-details")
            .scrollIntoView({ behavior: "smooth" });
          break;
      }
    })
    .catch((error) => console.log(error));
}

// Events
/**
 * Input for Searching Champions in Champion Select
 * Searching Champions based on name
 */
document
  .querySelector("input#searchChampions")
  .addEventListener("input", () => {
    const Champions = document.querySelectorAll("div.champion");
    Champions.forEach((champion) => {
      if (
        champion.dataset.name
          .toLowerCase()
          .includes(
            document.querySelector("input#searchChampions").value.toLowerCase()
          )
      ) {
        champion.style.display = "flex";
      } else {
        champion.style.display = "none";
      }
    });
  });
