let nonSummonersRiftItems = ["Guardian's Horn", "Guardian's Orb", "Guardian's Blade", "Guardian's Hammer", "Hextech Gunblade", "Zephyr", "Rite of Ruin", "Spectral Cutlass", "Fortification", "Base Turret Reinforced Armor (Turret Item)", "Reinforced Armor (Turret Item)", "Warden's Eye", "Overcharged", "Anti-Tower Socks", "Gusto", "Phreakish Gusto", "Super Mech Armor", "Super Mech Power Field", "Turret Plating", "Health Potion", "Total Biscuit of Everlasting Will", "Refillable Potion", "Corrupting Potion", "Poro-Snax", "Control Ward", "Elixir of Iron", "Elixir of Sorcery", "Elixir of Wrath", "Minion Dematerializer", "Commencing Stopwatch", "Slightly Magical Boots", "Perfectly Timed Stopwatch", "Atma's Reckoning", "Eye of the Herald", "Your Cut", "Oracle Lens", "Farsight Alteration", "Stealth Ward"]

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
                    icon.className = "item-icon";
                    icon.setAttribute("data-name", data[key].name);
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
                            document.querySelector("div#legendary-items").appendChild(icon);
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
    document.querySelector("div#item-stats").innerHTML = "";
    fetch(`https://shazzaam7.github.io/LoL-DDragon/Items/${itemKey}.json`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            document.querySelector("img#item-icon").src = data.icon;
            document.querySelector("span#item-name").innerHTML = data.name;
            document.querySelector("span#item-cost").innerHTML = data.shop.prices.total;
            let statsList = document.createElement("ul");
            statsList.className = "item-stats";
            for (let stats in data.stats) {
                if (data.stats[stats].flat != 0 || data.stats[stats].percent != 0) {
                    console.log(data.stats[stats]);
                    let newStat = document.createElement("li");
                    switch (stats) {
                        case "attackDamage":
                            newStat.innerHTML = `<img id="stat-icon" src="../Icons/Tooltip/attack_damage.png"/> <span>${data.stats[stats].flat} Attack Damage</span>`
                            break;
                        case "abilityPower":
                            newStat.innerHTML = `<img id="stat-icon" src="../Icons/Tooltip/ability_power.png"/> <span>${data.stats[stats].flat} Ability Power</span>`
                            break;
                        case "abilityHaste":
                            newStat.innerHTML = `<img id="stat-icon" src="../Icons/Tooltip/cdr_reduction.png"/> <span>${data.stats[stats].flat} Ability Haste</span>`
                            break;
                        case "attackSpeed":
                            newStat.innerHTML = `<img id="stat-icon" src="../Icons/Tooltip/attack_speed.png"/> <span>${data.stats[stats].flat} Attack Speed</span>`
                            break;
                        case "criticalStrikeChance":
                            newStat.innerHTML = `<img id="stat-icon" src="../Icons/Tooltip/critical_chance.png"/> <span>${data.stats[stats].percent}% Critical Chance</span>`
                            break;
                        case "health":
                            newStat.innerHTML = `<img id="stat-icon" src="../Icons/Tooltip/health.png"/> <span>${data.stats[stats].flat} Health</span>`
                            break;
                        case "mana":
                            newStat.innerHTML = `<img id="stat-icon" src="../Icons/Tooltip/mana.png"/> <span>${data.stats[stats].flat} Mana</span>`
                            break;
                        case "healthRegen":
                            newStat.innerHTML = `<img id="stat-icon" src="../Icons/Tooltip/health_regen.png"/> <span>${data.stats[stats].percent}% Health Regeneration</span>`
                            break;
                        case "manaRegen":
                            newStat.innerHTML = `<img id="stat-icon" src="../Icons/Tooltip/mana_regen.png"/> <span>${data.stats[stats].percent}% Mana Regeneration</span>`
                            break;
                        case "armor":
                            newStat.innerHTML = `<img id="stat-icon" src="../Icons/Tooltip/armor.png"/> <span>${data.stats[stats].flat} Armor</span>`
                            break;
                        case "magicResistance":
                            newStat.innerHTML = `<img id="stat-icon" src="../Icons/Tooltip/magic_resist.png"/> <span>${data.stats[stats].flat} Magic Resistance</span>`
                            break;
                        case "movespeed":
                            if (data.stats[stats].flat != 0) {
                                newStat.innerHTML = `<img id="stat-icon" src="../Icons/Tooltip/move_speed.png"/> <span>${data.stats[stats].flat} Movement Speed</span>`
                            } else {
                                newStat.innerHTML = `<img id="stat-icon" src="../Icons/Tooltip/move_speed.png"/> <span>${data.stats[stats].percent}% Movement Speed</span>`
                            }
                            break;
                        case "lifesteal":
                            newStat.innerHTML = `<img id="stat-icon" src="../Icons/Tooltip/life_steal.png"/> <span>${data.stats[stats].percent}% Life Steal</span>`
                            break;
                        case "omnivamp":
                            newStat.innerHTML = `<img id="stat-icon" src="../Icons/Tooltip/omnivamp.png"/> <span>${data.stats[stats].percent}% Omnivamp</span>`
                            break;
                        case "armorPenetration":
                            newStat.innerHTML = `<img id="stat-icon" src="../Icons/Tooltip/armor_pen.png"/> <span>${data.stats[stats].percent}% Armor Penetration</span>`
                            break;
                        case "lethality":
                            newStat.innerHTML = `<img id="stat-icon" src="../Icons/Tooltip/armor_pen.png"/> <span>${data.stats[stats].flat} Lethality</span>`
                            break;
                        case "magicPenetration":
                            if (data.stats[stats].flat != 0) {
                                newStat.innerHTML = `<img id="stat-icon" src="../Icons/Tooltip/magic_pen.png"/> <span>${data.stats[stats].flat} Magic Penetration</span>`
                            } else {
                                newStat.innerHTML = `<img id="stat-icon" src="../Icons/Tooltip/magic_pen.png"/> <span>${data.stats[stats].percent}% Magic Penetration</span>`
                            }
                            break;
                        case "cooldownReduction":
                            newStat.innerHTML = `<img id="stat-icon" src="../Icons/Tooltip/cdr_reduction.png"/> <span>${data.stats[stats].flat} Cooldown Reduction</span>`
                            break;
                        case "goldPer10":
                            newStat.innerHTML = `<img id="stat-icon" src="https://raw.communitydragon.org/latest/game/assets/ux/floatingtext/goldicon.png"/> <span>${data.stats[stats].flat} Gold Per 10 seconds</span>`
                            break;
                        case "healAndShieldPower":
                            newStat.innerHTML = `<img id="stat-icon" src="../Icons/Tooltip/Heal_and_shield_power.webp"/> <span>${data.stats[stats].flat}% Heal And Shield Power</span>`
                            break;
                        case "tenacity":
                            newStat.innerHTML = `<img id="stat-icon" src="../Icons/Tooltip/tenacity.png"/> <span>${data.stats[stats].flat}% Tenacity</span>`
                            break;
                        default:
                            break;
                    }
                    statsList.appendChild(newStat);
                }
                document.querySelector("div#item-stats").appendChild(statsList);
            }
            if (data.active.length > 0) {
                let i = 1;
                data.active.forEach(active => {
                    let activeEffect = document.createElement("p");
                    activeEffect.id = `active-effect-${i}`;
                    activeEffect.innerHTML = `<span class="effect-name">Active - ${active.name}:</span> <span>${formatEffects(active.effects)}</span`;
                    if (active.cooldown != null) {
                        activeEffect.innerHTML = ` <span> ${active.cooldown} seconds</span>`
                    }
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
                        if (passive.cooldown != null) {
                            passiveEffect.innerHTML += ` <span>(${passive.cooldown} seconds)</span>`
                        }
                        passiveEffects.appendChild(passiveEffect);
                        i++;
                    }
                })
                document.querySelector("div#passive-effects").appendChild(passiveEffects);
            }
        })
        .catch(error => console.log(error));
    ResetSearchItems();
}

function formatEffects(effect) {
    // Replace Statikk Shiv Text
    effect = effect.replace("When fully {{tip|Energized}}, your next basic attack deals {{as|{{pp|100;110;120;130;140;145;150;155;160;165;170;175;180|1;7;8;9;10;11;12;13;14;15;16;17;18|formula=100 at level 1, then +10 per level starting at level 7, then +5 per level starting at level 11}}|magic damage}} {{as|(+ 30% AP)}} {{as|'''bonus''' magic damage}}, modified to {{pp|250 to 350 for 11|1;9 to 18|formula=250 at level 1, then + 10 per level starting at level 9|color=magic damage}} against minions. ''Energized'' attacks bounce their additional effect to the closest target within 500 units, repeating from the new target to strike up to {{pp|6 to 12 for 3|1;11;16}} targets.", `When fully Energized, your next basic attack deals 100 - 180 (Based on Level, Dealing 100 damage Level 1-7, then gaining +10 damage per Level from Level 7 - 11, then +5 per Level from 11 onwards) (+30% AP) bonus magic damage, modified to 250 - 350 (Baed on Level, Dealing 250 damage Level 1-7, then gaining +10 damage per Level from Level 9 onwards).
Energized attacks bounce their additional effect to the closest target within 500 units, repeating from the new target to strike up to 6 / 9 / 12 (Based on Level) targets.`);

    // Replace Doran's Shield Text"
    effect = effect.replace("After taking damage from a [[champion]] or large [[monster]], gain [[health regeneration]] equal to {{pp|0 to 40 for 11|type='''current missing''' health|color=health|key1=%|0 to 75|formula=0.53 health regen for every 1% missing health}} health over 8 seconds. Reduced to{{ft|66% effectiveness|{{pp|0 to 26.4 for 11|type='''current missing''' health|color=health|key1=%|0 to 75|formula=0.35 health regen for every 1% missing health}}}} on {{tip|ranged}} champions or when triggered by [[area of effect]], [[damage over time]], or [[damage|proc]].", 'After taking damage from a champion or large monster, gain health regeneration equal to 0 − 40 (based on current missing health) health over 8 seconds, reduced to 66% effectiveness on ranged champions or when triggered by area of effect, damage over time, or proc.');

    // Replace Wit's End Text
    effect = effect.replace("Basic attacks deal {{as|{{pp|15;25;35;45;55;65;75;76.25;77.5;78.75;80|1;9 to 18 for 10|formula=15, then +10 per level starting at level 9, then +1.25 per level starting at level 15}} '''bonus''' magic damage}} [[on-hit]] and grant you {{as|20 '''bonus''' movement speed}} for 2 seconds.", "Basic attacks deal 15 - 80 (Based on Level, dealing 15 damage Level 1 - 9, then gaining +10 damage per Level from Level 9 - 15, then gaining +1.25 per Level starting at Level 15 - 18) bonus magic damage on-hit and grant you 20 bonus movement speed for 2 seconds.");

    // Replace Redemption "{{pp|200 to 400|type=target's level}}" with "200 − 400 (based on target's level)"
    effect = effect.replace("Call upon a beam of light to strike upon the target location after {{fd|2.5}} seconds, granting {{tip|sight}} of the area for the duration. Allies within the area are {{tip|heal|healed}} for {{pp|200 to 400|type=target's level}}, while enemy champions within take {{as|10% of target's '''maximum''' health}} as {{as|true damage}}. '''Can be used while [[death|dead]].'''", `Call upon a beam of light to strike upon the target location after 2.5 seconds, granting sight of the area for the duration. Allies within the area are healed for 200 - 400 (Based on Level), while enemy champions within take 10% of target's maximum health as true damage. Can be used while dead.`);

    // Remove {{tip|...}} and {{tt|...}} using regular expressions
    effect = effect.replace(/\{\{(?:tip|tt)\|(.*?)\}\}/g, '$1');

    // Remove [[...]] using regular expressions
    effect = effect.replace(/\[\[(.*?)\]\]/g, '$1');

    // Remove {{as|...}} using regular expressions
    effect = effect.replace(/\{\{as\|(.*?)\}\}/g, '$1');

    // Remove {{fd|...}} using regular expressions
    effect = effect.replace(/\{\{fd\|(.*?)\}\}/g, '$1');

    // Replace "slow|slows" with "slows"
    effect = effect.replace(/slow\|slows/g, 'slows');

    // Replace "shield|shields" with "shields"
    effect = effect.replace(/shield\|shields/g, 'shields');

    // Replace "shield|shielding" with "shielding"
    effect = effect.replace(/shield\|shielding/g, 'shielding');

    // Replace "heal|healing" with "healing"
    effect = effect.replace(/heal\|healing/g, 'healing');

    // Replace "heal|healed" with "healed"
    effect = effect.replace(/heal\|healed/g, 'healed');

    // Replace "death|dead" with "dead"
    effect = effect.replace(/death\|dead/g, 'dead');

    // Replace "post-mitigation|Damage calculated after modifiers" with "post-mitigation"
    effect = effect.replace(/post-mitigation\|Damage calculated after modifiers/g, 'post-mitigation');

    // Replace "pre-mitigation|Damage calculated" with "post-mitigation"
    effect = effect.replace(/pre-mitigation\|Damage calculated/g, 'pre-mitigation');

    // Replace "physical|physical damage" with "physical damage"
    effect = effect.replace(/physical\|physical damage/g, 'physical');

    // Replace "magic|magic damage" with "magic"
    effect = effect.replace(/magic\|magic damage/g, 'magic');

    // Replace "Damage modifier|reduced" with "reduced"
    effect = effect.replace(/Damage modifier\|reduced/g, 'reduced');

    // Replace "Immobilize|Immobilizing" with "Immobilizing"
    effect = effect.replace(/Immobilize\|Immobilizing/g, 'Immobilizing');

    // Replace "ability|abilities" with "abilities"
    effect = effect.replace(/ability\|abilities/g, 'abilities');

    // Replace "ability|abilities" with "abilities"
    effect = effect.replace(/ability\|ability/g, 'ability');

    // Replace "Cripple|Cripples" with "Cripples"
    effect = effect.replace(/Cripple\|Cripples/g, 'Cripples');

    // Replace "Health regeneration|Regenerate" with "Regenerate"
    effect = effect.replace(/Health regeneration\|Regenerate/g, 'Regenerate ');

    // Replace "'''maximum'''" with "maximum"
    effect = effect.replace(/'''maximum'''/g, 'maximum');

    // Replace '''bonus''' with "bonus"
    effect = effect.replace(/'''bonus'''/g, 'bonus');

    // Replace '''current''' with "current"
    effect = effect.replace(/'''current'''/g, 'current');

    // Replace '''base''' with "base"
    effect = effect.replace(/'''base'''/g, 'base');

    // Replace '''below''' with "below"
    effect = effect.replace(/'''below'''/g, 'below');

    // Replace "critical strike|critical strikes" with "critical strikes"
    effect = effect.replace(/critical strike\|critical strikes/g, 'critical strikes');

    // Replace "(buff)|stasis" with "statis"
    effect = effect.replace(/\(buff\)\|stasis/g, '');

    // Replace "active ability items|activate items" with "abilities"
    effect = effect.replace(/active ability items\|activate items/g, 'activate items');

    // Replace "combat status|in-combat" with "in-combat"
    effect = effect.replace(/combat status\|in-combat/g, 'in-combat');

    // Remove ".{{recurring|3}}"
    effect = effect.replace(/\.\{\{recurring\|(\d+)\}\}/g, '');

    // Replace "pre-mitigation damage|Damage calculated before modifiers" with "pre-mitigation damage"
    effect = effect.replace(/pre-mitigation damage\|Damage calculated before modifiers/g, 'pre-mitigation damage');

    // Replace "pre-mitigation before modifiers" with "pre-mitigation"
    effect = effect.replace(/pre-mitigation before modifiers/g, 'pre-mitigation');

    // Replace "1.5|mana" with "1.5 mana"
    effect = effect.replace(/(\d+(\.\d+)?)\|mana/g, '$1 mana');

    // Replace "{{ft|45% of this value|{{ap|1.5*0.45}}}}"
    effect = effect.replace(/\{\{ft\|(\d+)% of this value\|(\{\{ap\|.*?)\}\}\}\}/g, ' $1% of this value ');

    // Replace "{{ii|Mejai's Soulstealer}}"
    effect = effect.replace(/\{\{ii\|([^\}]+)\}\}/g, '$1');

    // Replace Cull "{{g|1}}" with "(any number) gold"
    effect = effect.replace(/\{\{g\|(\d+)\}\}/g, '$1 gold');

    effect = effect.replace(/\{\{g\|([^\}]+)\}\}/g, 'gold')

    // Replace Jungle buff"{{bi|Gustwalker}}" with "Gustwalker"
    effect = effect.replace(/\{\{bi\|([^\}]+)\}\}/g, '$1');

    // Replace Support item "nearby|2000" with "2000 (or any other number)"
    effect = effect.replace(/nearby\|(\d+)/g, '$1');

    // Replace Support item {{rd|50%|30% of their maximum health}}"
    effect = effect.replace(/{\{rd\|(\d+%)\|(\d+% of their maximum health)\}\}/g, 'below $1 (Melee Champions)/$2 (Ranged Champions)');

    // Replace Hearthbound Axe "{{rd|20|10 bonus movement speed}}"
    effect = effect.replace(/\{\{rd\|(\d+)\|(\d+) bonus movement speed\}\}/g, '$1 (Melee Champions)/$2 (Ranged Champions) bonus movement speed');

    // Replace Phage "{{rd|1.6%|{{fd|0.8%}} of maximum health}}"
    effect = effect.replace(/\{\{rd\|(\d+(?:\.\d+)?%)\|\{\{fd\|(\d+(?:\.\d+)?%)\}\} of maximum health\}\}/g, '$1 (Melee Champion)/$2 (Ranged Champion) of maximum health');

    // Replace Tiamat "{{rd|40% AD|20% AD}}"
    effect = effect.replace(/\{\{rd\|(\d+% AD)\|(\d+% AD)\}\}/g, '$1 (Melee Champions)/$2 (Ranged Champions)');

    // Replace Lethality "{{Lethality|10}}"
    effect = effect.replace(/\{\{Lethality\|(\d+)\}\}/g, '$1 Lethality');

    // Replace Alternator "{{pp|50 to 125 bonus magic damage}}"
    effect = effect.replace(/\{\{pp\|(\d+) to (\d+) bonus magic damage\}\}/g, '$1 to $2 bonus magic damage');

    // Replace Hexdrinker "{{pp|110 to 280|82.5 to 210|pp=true magic damage}}"
    //effect = effect.replace(/\{\{rd\|(.+?)\|(.+?)\|pp=true magic damage\}\}/g, '$1 (Melee Champions)/$2 (Ranged Champions)(Based on Level) magic damage');
    effect = effect.replace(/\{\{rd\|(\d+(?:\.\d+)?) to (\d+(?:\.\d+)?)\|(\d+(?:\.\d+)?) to (\d+(?:\.\d+)?)\|pp=true magic damage\}\}/g, '$1 - $2 (Melee Champions)/$3 - $4 (Ranged Champions) (Based on Level) magic damage');

    // Replace Seeker's "15|armor" with "15"
    effect = effect.replace(/(\d+)\|armor/g, '$1 Armor');

    // Replace Verdant Barrier "9|magic resistance" with "15"
    effect = effect.replace(/(\d+)\|magic resistance/g, '$1 Magic Resistance');

    // Replace Wardstone "Control Ward|Control Wards" with "Control Wards"
    effect = effect.replace(/Control Ward\|Control Wards/g, 'Control Wards');

    // Replace Sunfire/Bami's "{{as|(+ 1% bonus health) magic damage|magic damage}}"
    effect = effect.replace(/\{\{as\|(.+?)\|magic damage\}\}/g, '$1');

    // Replace GA "death|lethal damage" with "lethal damage"
    effect = effect.replace(/death\|lethal damage/g, 'lethal damage');

    // Replace LDR "{{pp|type=maximum health difference|color=health|key=%|0 to 25 for 11|0 to 2500|formula=1% per 100 greater maximum health}}"
    effect = effect.replace(/\{\{pp\|type=maximum health difference\|color=health\|key=%\|0 to 25 for 11\|0 to 2500\|formula=1% per 100 greater maximum health\}\}/g, '0% − 25% (based on maximum health difference, 1% per 100 maximum health difference)');

    // Replace Mejais "125|ap at maximum stacks" with "125 AP at maximum stacks"
    effect = effect.replace(/(\d+)\|ap at maximum stacks/g, '$1 AP at maximum stacks');

    // Replace Muramana "{{as|1.5% maximum mana bonus physical damage}}"
    effect = effect.replace(/\{\{as\|(.+?)\}\}/g, '$1');

    // Replace Muramana "{{rd|3.5%|{{fd|2.7% maximum mana}} (+ 6% AD) bonus physical damage|physical damage}}"
    effect = effect.replace(/\{\{rd\|(\d+\.\d+)%\|\{\{fd\|(\d+\.\d+)% maximum mana\}\} \(\+ (\d+)% AD\) bonus physical damage\|physical damage\}\}/g, '$1% (Melee Champions)/$2% (Ranged Champions) maximum mana (+ $3% AD) bonus physical damage');

    // Replace Zeke's "{{pp|30 to 70 (+ 7.5% AP) (+ 1.5% maximum health) bonus magic damage|magic damage}}"
    effect = effect.replace(/\{\{pp\|([^}]+)\|magic damage\}\}/g, '$1');

    // Replace Spirit Visage "{{stil|health regeneration}}"
    effect = effect.replace(/\{\{stil\|([^\}]+)\}\}/g, '$1');

    // Replace Black Cleaver "30%|armor" with "30"
    effect = effect.replace(/(\d+%)\|armor/g, '$1 armor reduction');

    // Replace Black Cleaver "18|ms" with "18"
    effect = effect.replace(/(\d+)\|ms/g, '$1 movement speed');

    // Replace Bloodthirster"{{pp|10;15 to 40 for 6|1;13 to 18 bonus attack damage}}"
    effect = effect.replace(/\{\{pp\|(\d+);(\d+) to (\d+) for (\d+)\|(\d+);(\d+) to (\d+) bonus attack damage\}\}/g, '$1 - $3 (Based on Level, scaling from Level 13 onwards) bonus attack damage');

    // Replace Warmogs "{{ft|2.5% maximum health every 0.5 seconds|25% maximum health every 5 seconds}}"
    effect = effect.replace(/\{\{ft\|([^\|]+)\|([^\}]+)\}\}/g, '$1/$2');

    // Replace Runaan's "you|180{{degree}}"
    effect = effect.replace(/you\|180\{\{degree\}\}/g, 'you (180°)');

    // Replace Stormrazor "90|magic damage" with "90"
    effect = effect.replace(/(\d+)\|magic damage/g, '$1 magic damage');

    // Replace Knights Vow "you|1250 units" with "you 1250 units"
    effect = effect.replace(/you\|(\d+) units/g, 'you $1 units');

    // Replace Frozen Heart "700 units|center to edge" with "700 units (center to edge)"
    effect = effect.replace(/(\d+) units\|center to edge/g, '$1 units (center to edge)');

    // Replace BOTRK 
    effect = effect.replace(/{{rd\|(\d+)%\|(\d+)% of the target's current health}}/,
        "$1% (Melee Champions)/$2% (Ranged Champions) of the target's current health");

    // Replace Serpants "{{rd|50%|35%}}" with "(any number)% (Melee Champions)/(any number)% (Ranged Champions)"
    effect = effect.replace(/\{\{rd\|(\d+%)\|(\d+%)\}\}/g, '$1 (Melee Champions)/$2 (Ranged Champions)');

    // Remove Anathema's "cr|icononly = true"
    effect = effect.replace(/cr\|icononly = true/g, '');

    return effect;
}

function ResetSearchItems() {
    const icons = document.querySelectorAll("img.item-icon");
    document.querySelector("input#searchItems").value = "";
    icons.forEach(icon => {
        icon.removeAttribute("hidden");
        icon.setAttribute("show", "");
    })
}

document.querySelector("input#searchItems").addEventListener("input", () => {
    const icons = document.querySelectorAll("img.item-icon");
    icons.forEach(icon => {
        if (icon.dataset.name.toLowerCase().includes(document.querySelector("input#searchItems").value.toLowerCase())) {
            icon.removeAttribute("hidden");
            icon.setAttribute("show", "");
        } else {
            icon.removeAttribute("show");
            icon.setAttribute("hidden", "");
        }
    })
});