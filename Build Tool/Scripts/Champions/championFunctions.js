// Aatrox functions
/**
 * Aatrox function
 * Shows everything about Aatrox
 * @param {championData} championData
 */
function Aatrox(championData) {
  console.log(championData);
  // Adds Champion Icon to the Champion Details Header img
  document.querySelector("img#champion-details-header-icon").src =
    championData.icon;

  // Adds Champion Name and Title to the Champion Details
  document.querySelector(
    "p#champion-name-title"
  ).innerText = `${championData.name} \n ${championData.title}`;
}

// Ahri functions
/**
 * Ahri function
 * Shows everything about Ahri
 * @param {championData} championData
 */
function Ahri(championData) {
  console.log(championData);
  // Adds Champion Icon to the Champion Details Header img
  document.querySelector("img#champion-details-header-icon").src =
    championData.icon;

  // Adds Champion Name and Title to the Champion Details
  document.querySelector(
    "p#champion-name-title"
  ).innerText = `${championData.name} \n ${championData.title}`;
}

/**
 * Temp Function for champions that don't have their functions yet
 * @param {championData} championData
 */
function Default(championData) {
  console.log(championData);
  // Adds Champion Icon to the Champion Details Header img
  document.querySelector("img#champion-details-header-icon").src =
    championData.icon;

  // Adds Champion Name and Title to the Champion Details
  document.querySelector(
    "p#champion-name-title"
  ).innerText = `${championData.name} \n ${championData.title}`;
}
