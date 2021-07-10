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

// FUNCTIONS FOR COMBATANT GENERATION

// establish d&d race
function dRace() {
    let apiRace = "https://www.dnd5eapi.co/api/races/"
    let dRace = document.querySelector(".d-race") // to populate page with chosen race of d&d character
    fetch(apiRace)
        .then(res => res.json())
        .then(data => {
            let randomIndex = Math.floor(Math.random() * (data.results.length))
            // dRace.forEach(node => { node.textContent = data.results[randomIndex].index 
            dCharInfo.characterRace = data.results[randomIndex].index
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
            dCharInfo.characterClass = chosenClass
            dLevel(dCharInfo.characterClass)
            dAttack(dCharInfo.characterClass)
        })
};

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
        })
}

// establish weapon or spell selection based on class
function dAttack(chosenClass) {
    if (chosenClass == "barbarian" || chosenClass == "fighter" || chosenClass == "monk" || chosenClass == "ranger" || chosenClass == "rogue") {
        let apiAttackChoice = "https://www.dnd5eapi.co/api/equipment-categories/weapon"
        fetch(apiAttackChoice)
            .then(res => res.json())
            .then(data => {
                let randomIndex = Math.ceil(Math.random() * (data.equipment.length - 28))
                let weapon = data.equipment[randomIndex].name.toLowerCase()
                let weaponIndex = data.equipment[randomIndex].index
                dCharInfo.characterAttackName = weapon;
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
                dCharInfo.characterAttackName = spell;
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
            pokeInfo.pokeName = data.name
            pokeHpFetch(pokeInfo.pokeName)
            pokeSpeedFetch(pokeInfo.pokeName)
            pokeMoveFetch(pokeInfo.pokeName)
        })
};

// establish pokemon hp
function pokeHpFetch(pokemon) {
    let chosenPokeApi = "https://pokeapi.co/api/v2/pokemon/" + pokemon + "/"
    fetch(chosenPokeApi)
        .then(res => res.json())
        .then(data => {
            pokeInfo.pokeHp = data.stats[0].base_stat
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
                pokeChoice()
                return
            }
            let randomIndex = Math.ceil(Math.random() * (data.moves.length))
            pokeInfo.pokeAttackName = data.moves[randomIndex].move.name
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
            if (data.power) {
                pokeInfo.pokeAttackPower = data.power
            } else {
                pokeMoveFetch(pokeInfo.pokeName)
            }
            console.log(pokeInfo.pokeAttackName, pokeInfo.pokeAttackPower)
        })
}


// RUNNING OF FUNCTIONS ON PAGE LOAD
// d&d character functions
dRace();
dClass();
console.log(dCharInfo);

// pokemon functions
pokeChoice();
console.log(pokeInfo);

