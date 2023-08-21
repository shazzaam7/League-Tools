const latestVersionURL = "https://ddragon.leagueoflegends.com/api/versions.json";

/**
 * This function is used to grab the latest version of the patch
 */
function grabLatestVersion() {
    fetch(latestVersionURL)
        .then(res => res.json())
        .then(data => {
            document.querySelector("p#patch-version").innerText = `Patch: ${parseFloat(data[0]).toFixed(2)}`;
            document.getElementById('loading').style.display = 'none';
        })
        .catch(error => console.log(error))
};

/**
 * This is used to round numbers to max 3 digits after the decimal line
 */
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

grabLatestVersion();