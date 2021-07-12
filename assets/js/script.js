// UNIVERSAL VARIABLES AND CONSTANTS
var dCharInfo = {
    characterRace: "",
    characterSpeed: "",
    characterClass: "",
    characterLevel: "",
    characterHp: "",
    characterAttackName: "",
    characterAttackPower: "",
    numberOfDice: "",
    diceType: "",
}

var pokeInfo = {
    pokeName: "",
    pokeHp: "",
    pokeSpeed: "",
    pokeAttackName: "",
    pokeMoveUrl: "",
    pokeAttackPower: "",
}

var winTracker = {
    pokeWins: 0,
    dWins: 0,
}

// capitalize names where necessary
function capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// remove hyphens from names where necessary
function hyphenRemove (string) {
    string.split("-")[0]
}


// FUNCTIONS FOR COMBATANT GENERATION

// establish d&d race
function dRace() {
    let apiRace = "https://www.dnd5eapi.co/api/races/"
    fetch(apiRace)
        .then(res => res.json())
        .then(data => {
            let randomIndex = Math.floor(Math.random() * (data.results.length))
            dCharInfo.characterRace = data.results[randomIndex].index
            let dRaceDispEl = document.querySelector("#d-char-race")
            let raceCaps = capitalize(data.results[randomIndex].index)
            dRaceDispEl.textContent = ""
            dRaceDispEl.append(raceCaps)
            dSpeed(dCharInfo.characterRace);
        })
};


// establish d&d character speed
function dSpeed(race) {
    let apiRaceSpecified = "https://www.dnd5eapi.co/api/races/" + race + "/"
    fetch(apiRaceSpecified)
        .then(res => res.json())
        .then(data => {
            let dSpeed = data.speed
            let characterSpeed;
            // convert speed of d&d character to pokemon equivalent, with max d&d character speed = 100
            if (dSpeed == 25) {
                characterSpeed = Math.ceil(Math.random() * dSpeed) + 45
            } else {
                characterSpeed = Math.ceil(Math.random() * dSpeed) + 70
            }
            dCharInfo.characterSpeed = characterSpeed;
        })
};

// establish d&d class, descendant attributes
function dClass() {
    var apiClass = "https://www.dnd5eapi.co/api/classes/"
    var dClass = document.querySelector(".d-class") // to eventually populate page with chosen class of d&d character
    fetch(apiClass)
        .then(res => res.json())
        .then(data => {
            var randomIndex = Math.floor(Math.random() * (data.results.length))
            var chosenClass = data.results[randomIndex].index
            let dClassDispEl = document.querySelector("#d-char-class")
            let chosenClassCaps = capitalize(data.results[randomIndex].index)
            dClassDispEl.textContent = ""
            dClassDispEl.append(chosenClassCaps)
            dCharInfo.characterClass = chosenClass
            dLevel(dCharInfo.characterClass)
            dAttack(dCharInfo.characterClass)
        })
};

// establish d&d image
function characterImage() {
    let dCombatantEl = document.querySelector("#d-combatant-img")
    let dCharPng = document.createElement("img")
    dCharPng.src = "./assets/images/" + dCharInfo.characterRace + "-" + dCharInfo.characterClass + ".png"
    dCharPng.className = "d-fighter-image fighter-image"
    dCombatantEl.append(dCharPng)
}

// establish d&d level
function dLevel(chosenClass) {
    let apiChosenClass = "https://www.dnd5eapi.co/api/classes/" + chosenClass + "/"
    fetch(apiChosenClass)
        .then(res => res.json())
        .then(data => {
            let dLevel = Math.ceil(Math.random() * 5 + 8)
            dCharInfo.characterLevel = dLevel
            dCharHp(dCharInfo.characterClass, dCharInfo.characterLevel)
        })
};

// establish d&d hp
function dCharHp(chosenClass, level) {
    let apiChosenClass = "https://www.dnd5eapi.co/api/classes/" + chosenClass + "/"
    fetch(apiChosenClass)
        .then(res => res.json())
        .then(data => {
            let hpTotal = level * data.hit_die // currently, hit points are assigned assuming max roll of all hit point dice
            dCharInfo.characterHp = hpTotal
            let hpDispEl = document.querySelector("#d-char-hp")
            hpDispEl.textContent = ""
            hpDispEl.append(dCharInfo.characterHp)
        })
}

// establish weapon or spell selection based on class
function dAttack(chosenClass) {
    if (chosenClass == "barbarian" || chosenClass == "fighter" || chosenClass == "monk" || chosenClass == "ranger" || chosenClass == "rogue") {
        let apiAttackChoice = "https://www.dnd5eapi.co/api/equipment-categories/weapon"
        fetch(apiAttackChoice)
            .then(res => res.json())
            .then(data => {
                let randomIndex = Math.ceil(Math.random() * (data.equipment.length - 29))
                let weapon = data.equipment[randomIndex].name.toLowerCase()
                let weaponIndex = data.equipment[randomIndex].index
                dCharInfo.characterAttackName = weapon
                let dWeaponDispEl = document.querySelector("#d-char-attack")
                dWeaponDispEl.textContent = "Weapon: "
                dWeaponDispEl.append(dCharInfo.characterAttackName)
                dWeaponPower(weaponIndex)
            })
    } else {
        let apiAttackChoice = "https://www.dnd5eapi.co/api/spells"
        fetch(apiAttackChoice)
            .then(res => res.json())
            .then(data => {
                let randomIndex = Math.floor(Math.random() * (data.results.length))
                let spell = data.results[randomIndex].name
                let spellIndex = data.results[randomIndex].index
                dCharInfo.characterAttackName = spell
                let dSpellDispEl = document.querySelector("#d-char-attack")
                dSpellDispEl.textContent = "Spell: "
                dSpellDispEl.append(dCharInfo.characterAttackName)
                dSpellPower(spellIndex)
            })
    }
}

// establish d&d character weapon attack power
function dWeaponPower(weaponIndex) {
    let apiAttackPower = "https://www.dnd5eapi.co/api/equipment/" + weaponIndex + "/"
    fetch(apiAttackPower)
        .then(res => res.json())
        .then(data => {
            dCharInfo.characterAttackPower = data.damage.damage_dice
            dCharInfo.numberOfDice = parseInt(dCharInfo.characterAttackPower.split("d")[0])
            dCharInfo.diceType = parseInt(dCharInfo.characterAttackPower.split("d")[1])
        })
}

// establish d&d character spell attack power
function dSpellPower(spellIndex) {
    let apiAttackPower = "https://www.dnd5eapi.co/api/spells/" + spellIndex + "/"
    fetch(apiAttackPower)
        .then(res => res.json())
        .then(data => {
            if (!data.damage) {
                dAttack(dCharInfo.characterClass)
                return
            }
            let spellDamage = data.damage.damage_at_slot_level || data.damage.damage_at_character_level
            dCharInfo.characterAttackPower = spellDamage[Object.keys(spellDamage)[Math.floor(Math.random() * Object.keys.length)]];
            dCharInfo.numberOfDice = parseInt(dCharInfo.characterAttackPower.split("d")[0]) 
            dCharInfo.diceType = parseInt(dCharInfo.characterAttackPower.split("d")[1])
        })
}

// establish pokemon from gen 1
function pokeChoice() {
    var randomPoke = Math.ceil(Math.random() * 151)
    let pokeApi = `https://pokeapi.co/api/v2/pokemon/${randomPoke}/`
    fetch(pokeApi)
        .then(res => res.json())
        .then(data => {
            pokeDataPass = data.name
            pokeInfo.pokeName = capitalize(data.name)
            let pokeNameDispEl = document.querySelector("#poke-name")
            pokeNameDispEl.textContent = ""
            let pokeNameAdj = pokeInfo.pokeName
            pokeNameAdj = pokeNameAdj.split("-")[0]
            pokeNameDispEl.append(pokeNameAdj)
            pokeHpFetch(pokeDataPass)
            pokeSpeedFetch(pokeDataPass)
            pokeMoveFetch(pokeDataPass)
            pokeImage(pokeDataPass)
        })
};

// establish pokemon image
function pokeImage(pokemon) {
    let chosenPokeApi = "https://pokeapi.co/api/v2/pokemon/" + pokemon + "/"
    console.log(chosenPokeApi)
    fetch (chosenPokeApi)
        .then(res => res.json())
        .then(data => {
            let pokeCombatantEl = document.querySelector("#poke-combatant-img")
            let pokeImageUrl = data.sprites.front_default
            let pokePng = document.createElement("img")
            pokePng.className = "poke-fighter-image fighter-image"
            pokePng.src = pokeImageUrl
            pokeCombatantEl.append(pokePng)
        }) 
}

// establish pokemon hp
function pokeHpFetch(pokemon) {
    let chosenPokeApi = "https://pokeapi.co/api/v2/pokemon/" + pokemon + "/"
    fetch(chosenPokeApi)
        .then(res => res.json())
        .then(data => {
            pokeInfo.pokeHp = data.stats[0].base_stat
            let pokeHpDispEl = document.querySelector("#poke-hp")
            pokeHpDispEl.textContent = ""
            pokeHpDispEl.append(pokeInfo.pokeHp)
        })
}

// establish pokemon speed
function pokeSpeedFetch(pokemon) {
    let chosenPokeApi = "https://pokeapi.co/api/v2/pokemon/" + pokemon + "/"
    fetch(chosenPokeApi)
        .then(res => res.json())
        .then(data => {
            pokeInfo.pokeSpeed = data.stats[5].base_stat
        })
}

// establish pokemon move of choice and attack power
function pokeMoveFetch(pokemon) {
    let chosenPokeApi = "https://pokeapi.co/api/v2/pokemon/" + pokemon + "/"
    fetch(chosenPokeApi)
        .then(res => res.json())
        .then(data => {
            if (pokemon == "ditto") {
                $("#poke-combatant-img").remove()
                pokeChoice()
                return
            }
            let randomIndex = Math.ceil(Math.random() * (data.moves.length))
            pokeInfo.pokeAttackName = data.moves[randomIndex].move.name
            let pokeAttackDispEl = document.querySelector("#poke-attack")
            pokeAttackDispEl.textContent = ""
            let pokeAttackDisp = pokeInfo.pokeAttackName
            pokeAttackDisp = pokeAttackDisp.replace(/-/g, " ")
            pokeAttackDispEl.append(pokeAttackDisp)
            pokeInfo.pokeMoveUrl = data.moves[randomIndex].move.url
            pokeMovePower(pokeInfo.pokeMoveUrl)
        })
    }

// establish pokemon move attack power
function pokeMovePower(moveUrl) {
    let chosenMoveApi = moveUrl
    fetch(chosenMoveApi)
        .then(res => res.json())
        .then(data => {
            if (data.power == null) {
                let pokeLowerCase = pokeInfo.pokeName.toLowerCase()
                pokeMoveFetch(pokeLowerCase)
                return
            } else {
                pokeInfo.pokeAttackPower = data.power
            }
            console.log(pokeInfo.pokeAttackName, pokeInfo.pokeAttackPower)
        })
}


// RUNNING OF FUNCTIONS ON PAGE LOAD
// d&d character functions
dRace();
dClass();
setTimeout(characterImage, 1500);
console.log(dCharInfo);

// pokemon functions
pokeChoice();
setTimeout(pokeImage, 1500);
console.log(pokeInfo);

