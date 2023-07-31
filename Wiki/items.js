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
    document.querySelector("div#active-effects").innerHTML = "";
    document.querySelector("div#passive-effects").innerHTML = "";
    fetch(`https://shazzaam7.github.io/LoL-DDragon/Items/${itemKey}.json`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            document.querySelector("div#item-info").style.display = "grid";
            document.querySelector("img#item-icon").src = data.icon;
            document.querySelector("span#item-name").innerHTML = data.name;
            document.querySelector("span#item-cost").innerHTML = data.shop.prices.total;
            if (data.active.length > 0) {
                let i = 1;
                data.active.forEach(active => {
                    let activeEffect = document.createElement("p");
                    activeEffect.id = `active-effect-${i}`;
                    activeEffect.innerHTML = `<span class="effect-name">Active - ${active.name}:</span> <span>${formatEffects(active.effects)}</span`;
                    document.querySelector("div#active-effects").appendChild(activeEffect);
                    i++;
                })
            }
            if (data.passives.length > 0) {
                let i = 1;
                let passiveEffects = document.createElement("ul");
                data.passives.forEach(passive => {
                    if (!passive.mythic) {
                        let passiveEffect = document.createElement("li");
                        passiveEffect.id = `passive-effect-${i}`
                        if (passive.name != null) {
                            passiveEffect.innerHTML = `<span class="effect-name">${passive.name}:</span> <span>${formatEffects(passive.effects)}</span>`
                        } else {
                            passiveEffect.innerHTML = `<span>${formatEffects(passive.effects)}</span>`
                        }
                        passiveEffects.appendChild(passiveEffect);
                        i++;
                    }
                })
                document.querySelector("div#passive-effects").appendChild(passiveEffects);
            }
        })
        .catch(error => console.log(error));
}

function formatEffects(inputText) {
    // Replace Statikk Shiv Text
    inputText = inputText.replace("When fully {{tip|Energized}}, your next basic attack deals {{as|{{pp|100;110;120;130;140;145;150;155;160;165;170;175;180|1;7;8;9;10;11;12;13;14;15;16;17;18|formula=100 at level 1, then +10 per level starting at level 7, then +5 per level starting at level 11}}|magic damage}} {{as|(+ 30% AP)}} {{as|'''bonus''' magic damage}}, modified to {{pp|250 to 350 for 11|1;9 to 18|formula=250 at level 1, then + 10 per level starting at level 9|color=magic damage}} against minions. ''Energized'' attacks bounce their additional effect to the closest target within 500 units, repeating from the new target to strike up to {{pp|6 to 12 for 3|1;11;16}} targets.", `When fully Energized, your next basic attack deals 100 - 180 (Based on Level, Dealing 100 damage Level 1-7, then gaining +10 damage per Level from Level 7 - 11, then +5 per Level from 11 onwards) (+30% AP) bonus magic damage, modified to 250 - 350 (Baed on Level, Dealing 250 damage Level 1-7, then gaining +10 damage per Level from Level 9 onwards).
Energized attacks bounce their additional effect to the closest target within 500 units, repeating from the new target to strike up to 6 / 9 / 12 (Based on Level) targets.`);

    // Replace Doran's Shield Text"
    inputText = inputText.replace("After taking damage from a champion or large monster, gain health regeneration equal to {{pp|0 to 40 for 11|type='''current missing''' health|color=health|key1=%|0 to 75|formula=0.53 health regen for every 1% missing health}} health over 8 seconds. Reduced to{{ft|66% effectiveness|{{pp|0 to 26.4 for 11|type='''current missing''' health|color=health|key1=%|0 to 75|formula=0.35 health regen for every 1% missing health}}}} on ranged champions or when triggered by area of effect, damage over time, or damage|proc.", 'After taking damage from a champion or large monster, gain health regeneration equal to 0 − 40 (based on current missing health) health over 8 seconds, reduced to 66% effectiveness on ranged champions or when triggered by area of effect, damage over time, or proc.');

    // Replace "1.5|mana" with "1.5 mana"
    inputText = inputText.replace(/(\d+(\.\d+)?)\|mana/g, '$1 mana');

    // Replace "{{ft|45% of this value|{{ap|1.5*0.45}}}}"
    inputText = inputText.replace(/\{\{ft\|(\d+)% of this value\|(\{\{ap\|.*?)\}\}\}\}/g, ' $1% of this value ');

    // Replace "{{ii|Mejai's Soulstealer}}"
    inputText = inputText.replace(/\{\{ii\|([^\}]+)\}\}/g, '$1');

    // Replace Cull "{{g|1}}" with "(any number) gold"
    inputText = inputText.replace(/\{\{g\|(\d+)\}\}/g, '$1 gold');

    inputText = inputText.replace(/\{\{g\|([^\}]+)\}\}/g, 'gold')

    // Replace Jungle buff"{{bi|Gustwalker}}" with "Gustwalker"
    inputText = inputText.replace(/\{\{bi\|([^\}]+)\}\}/g, '$1');

    // Replace Support item "nearby|2000" with "2000 (or any other number)"
    inputText = inputText.replace(/nearby\|(\d+)/g, '$1');

    // Replace Support item "'''below''' {{rd|50%|30% of their maximum health}}"
    inputText = inputText.replace(/'''below''' \{\{rd\|(\d+%)\|(\d+% of their maximum health)\}\}/g, 'below $1 (Melee Champions)/$2 (Ranged Champions)');

    // Replace Hearthbound Axe "{{rd|20|10 bonus movement speed}}"
    inputText = inputText.replace(/\{\{rd\|(\d+)\|(\d+) bonus movement speed\}\}/g, '$1 (Melee Champions)/$2 (Ranged Champions) bonus movement speed');

    // Replace Phage "{{rd|1.6%|{{fd|0.8%}} of maximum health}}"
    inputText = inputText.replace(/\{\{rd\|(\d+(?:\.\d+)?%)\|\{\{fd\|(\d+(?:\.\d+)?%)\}\} of maximum health\}\}/g, '$1 (Melee Champion)/$2 (Ranged Champion) of maximum health');

    // Replace Tiamat "{{rd|40% AD|20% AD}}"
    inputText = inputText.replace(/\{\{rd\|(\d+% AD)\|(\d+% AD)\}\}/g, '$1 (Melee Champions)/$2 (Ranged Champions)');

    // Replace Lethality "{{Lethality|10}}"
    inputText = inputText.replace(/\{\{Lethality\|(\d+)\}\}/g, '$1 Lethality');

    // Replace Alternator "{{pp|50 to 125 bonus magic damage}}"
    inputText = inputText.replace(/\{\{pp\|(\d+) to (\d+) bonus magic damage\}\}/g, '$1 to $2 bonus magic damage');

    // Replace Hexdrinker "{{pp|110 to 280|82.5 to 210|pp=true magic damage}}"
    inputText = inputText.replace(/\{\{rd\|(\d+(\.\d+)?) to (\d+(\.\d+)?)\|(\d+(\.\d+)?) to (\d+(\.\d+)?)\|pp=true magic damage\}\}/g, '($1 to $2 Melee Champions)/($3 to $4 Ranged Champions) (Based on Level) magic damage');

    // Replace Seeker's "15|armor" with "15"
    inputText = inputText.replace(/(\d+)\|armor/g, '$1 Armor');

    // Replace Verdant Barrier "9|magic resistance" with "15"
    inputText = inputText.replace(/(\d+)\|magic resistance/g, '$1 Magic Resistance');

    // Replace Wardstone "Control Ward|Control Wards" with "Control Wards"
    inputText = inputText.replace(/Control Ward\|Control Wards/g, 'Control Wards');

    // Replace Sunfire/Bami's "{{as|(+ 1% bonus health) magic damage|magic damage}}"
    inputText = inputText.replace(/\{\{as\|(.+?)\|magic damage\}\}/g, '$1');

    // Replace GA "death|lethal damage" with "lethal damage"
    inputText = inputText.replace(/death\|lethal damage/g, 'lethal damage');

    // Replace LDR "{{pp|type=maximum health difference|color=health|key=%|0 to 25 for 11|0 to 2500|formula=1% per 100 greater maximum health}}"
    inputText = inputText.replace(/\{\{pp\|type=maximum health difference\|color=health\|key=%\|0 to 25 for 11\|0 to 2500\|formula=1% per 100 greater maximum health\}\}/g, '0% − 25% (based on maximum health difference, 1% per 100 maximum health difference)');

    // Replace Mejais "125|ap at maximum stacks" with "125 AP at maximum stacks"
    inputText = inputText.replace(/(\d+)\|ap at maximum stacks/g, '$1 AP at maximum stacks');

    // Replace Muramana "{{as|1.5% maximum mana bonus physical damage}}"
    inputText = inputText.replace(/\{\{as\|(.+?)\}\}/g, '$1');

    // Replace Muramana "{{rd|3.5%|{{fd|2.7% maximum mana}} (+ 6% AD) bonus physical damage|physical damage}}"
    inputText = inputText.replace(/\{\{rd\|(\d+\.\d+)%\|\{\{fd\|(\d+\.\d+)% maximum mana\}\} \(\+ (\d+)% AD\) bonus physical damage\|physical damage\}\}/g, '$1% (Melee Champions)/$2% (Ranged Champions) maximum mana (+ $3% AD) bonus physical damage');

    // Replace Zeke's "{{pp|30 to 70 (+ 7.5% AP) (+ 1.5% maximum health) bonus magic damage|magic damage}}"
    inputText = inputText.replace(/\{\{pp\|([^}]+)\|magic damage\}\}/g, '$1');

    // Replace Spirit Visage "{{stil|health regeneration}}"
    inputText = inputText.replace(/\{\{stil\|([^\}]+)\}\}/g, '$1');

    // Replace Black Cleaver "30%|armor" with "30"
    inputText = inputText.replace(/(\d+%)\|armor/g, '$1 armor reduction');

    // Replace Black Cleaver "18|ms" with "18"
    inputText = inputText.replace(/(\d+)\|ms/g, '$1 movement speed');

    // Replace Bloodthirster"{{pp|10;15 to 40 for 6|1;13 to 18 bonus attack damage}}"
    inputText = inputText.replace(/\{\{pp\|(\d+);(\d+) to (\d+) for (\d+)\|(\d+);(\d+) to (\d+) bonus attack damage\}\}/g, '$1 - $3 (Based on Level, scaling from Level 13 onwards) bonus attack damage');

    // Replace Warmogs "{{ft|2.5% maximum health every 0.5 seconds|25% maximum health every 5 seconds}}"
    inputText = inputText.replace(/\{\{ft\|([^\|]+)\|([^\}]+)\}\}/g, '$1/$2');

    // Replace Runaan's "you|180{{degree}}"
    inputText = inputText.replace(/you\|180\{\{degree\}\}/g, 'you (180°)');

    // Replace Serpants "{{rd|50%|35%}}" with "(any number)% (Melee Champions)/(any number)% (Ranged Champions)"
    inputText = inputText.replace(/\{\{rd\|(\d+%)\|(\d+%)\}\}/g, '$1 (Melee Champions)/$2 (Ranged Champions)');

    // Remove Anathema's "cr|icononly = true"
    inputText = inputText.replace(/cr\|icononly = true/g, '');

    // Remove {{tip|...}} and {{tt|...}} using regular expressions
    inputText = inputText.replace(/\{\{(?:tip|tt)\|(.*?)\}\}/g, '$1');

    // Remove [[...]] using regular expressions
    inputText = inputText.replace(/\[\[(.*?)\]\]/g, '$1');

    // Remove {{as|...}} using regular expressions
    inputText = inputText.replace(/\{\{as\|(.*?)\}\}/g, '$1');

    // Remove {{fd|...}} using regular expressions
    inputText = inputText.replace(/\{\{fd\|(.*?)\}\}/g, '$1');

    // Replace "slow|slows" with "slows"
    inputText = inputText.replace(/slow\|slows/g, 'slows');

    // Replace "shield|shields" with "shields"
    inputText = inputText.replace(/shield\|shields/g, 'shields');

    // Replace "shield|shielding" with "shielding"
    inputText = inputText.replace(/shield\|shielding/g, 'shielding');

    // Replace "heal|healing" with "healing"
    inputText = inputText.replace(/heal\|healing/g, 'healing');

    // Replace "post-mitigation|Damage calculated after modifiers" with "post-mitigation"
    inputText = inputText.replace(/post-mitigation\|Damage calculated after modifiers/g, 'post-mitigation');

    // Replace "Damage modifier|reduced" with "reduced"
    inputText = inputText.replace(/Damage modifier\|reduced/g, 'reduced');

    // Replace "Immobilize|Immobilizing" with "Immobilizing"
    inputText = inputText.replace(/Immobilize\|Immobilizing/g, 'Immobilizing');

    // Replace "ability|abilities" with "abilities"
    inputText = inputText.replace(/ability\|abilities/g, 'abilities');

    // Replace "ability|abilities" with "abilities"
    inputText = inputText.replace(/ability\|ability/g, 'ability');

    // Replace "Health regeneration|Regenerate" with "Regenerate"
    inputText = inputText.replace(/Health regeneration\|Regenerate/g, 'Regenerate ');

    // Replace "'''maximum'''" with "maximum"
    inputText = inputText.replace(/'''maximum'''/g, 'maximum');

    // Replace '''bonus''' with "bonus"
    inputText = inputText.replace(/'''bonus'''/g, 'bonus');

    // Replace '''current''' with "current"
    inputText = inputText.replace(/'''current'''/g, 'current');

    // Replace '''base''' with "base"
    inputText = inputText.replace(/'''base'''/g, 'base');

    // Replace '''below''' with "below"
    inputText = inputText.replace(/'''below'''/g, 'below');

    // Replace "critical strike|critical strikes" with "critical strikes"
    inputText = inputText.replace(/critical strike\|critical strikes/g, 'critical strikes');

    // Replace "(buff)|stasis" with "statis"
    inputText = inputText.replace(/\(buff\)\|stasis/g, '');

    // Replace "active ability items|activate items" with "abilities"
    inputText = inputText.replace(/active ability items\|activate items/g, 'activate items');

    // Replace "combat status|in-combat" with "in-combat"
    inputText = inputText.replace(/combat status\|in-combat/g, 'in-combat');

    // Remove ".{{recurring|3}}"
    inputText = inputText.replace(/\.\{\{recurring\|(\d+)\}\}/g, '');

    // Replace "pre-mitigation damage|Damage calculated before modifiers" with "pre-mitigation damage"
    inputText = inputText.replace(/pre-mitigation damage\|Damage calculated before modifiers/g, 'pre-mitigation damage');

    return inputText;
}