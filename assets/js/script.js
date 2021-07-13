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

// FUNCTIONS FOR COMBATANT GENERATION

// establish d&d race
function dRace() {
    let apiRace = "https://www.dnd5eapi.co/api/races/"
    fetch(apiRace)
        .then(res => res.json())
        .then(data => {
            // determine race, push result to dCharInfo object
            let randomIndex = Math.floor(Math.random() * (data.results.length))
            dCharInfo.characterRace = data.results[randomIndex].index

            // display result above on page, capitalized
            let dRaceDispEl = document.querySelector("#d-char-race")
            let raceCaps = capitalize(data.results[randomIndex].index)
            dRaceDispEl.textContent = ""
            dRaceDispEl.append(raceCaps)

            // send character race selection to speed function
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
            let characterSpeed

            // convert speed of d&d character to pokemon equivalent, with max d&d character speed = 100
            if (dSpeed == 25) {
                characterSpeed = Math.ceil(Math.random() * dSpeed) + 45
            } else {
                characterSpeed = Math.ceil(Math.random() * dSpeed) + 70
            }

            // send final characterSpeed result to dCharInfo object
            dCharInfo.characterSpeed = characterSpeed;
        })
};

// establish d&d class, descendant attributes
function dClass() {
    var apiClass = "https://www.dnd5eapi.co/api/classes/"
    fetch(apiClass)
        .then(res => res.json())
        .then(data => {
            // assign character class
            var randomIndex = Math.floor(Math.random() * (data.results.length))
            var chosenClass = data.results[randomIndex].index

            // display character class on page, capitalized
            let dClassDispEl = document.querySelector("#d-char-class")
            let chosenClassCaps = capitalize(data.results[randomIndex].index)
            dClassDispEl.textContent = ""
            dClassDispEl.append(chosenClassCaps)

            // pass character class result to dLevel and dAttack functions
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
            // set level of character to range of 10 - 15
            let dLevel = Math.ceil(Math.random() * 5 + 9)
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
            // assign hit points based on maximum roll of all hit point dice (for purposes of balance)
            let hpTotal = level * data.hit_die 
            dCharInfo.characterHp = hpTotal
            // display character hp on screen
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
                // select weapon for classes including barbarian, fighter, monk, ranger, or rogue
                let randomIndex = Math.ceil(Math.random() * (data.equipment.length - 29))
                let weapon = data.equipment[randomIndex].name.toLowerCase()
                let weaponIndex = data.equipment[randomIndex].index
                dCharInfo.characterAttackName = weapon
                // display weapon result on page
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
                // select spell for classes including bard, wizard, sorcerer, cleric, warlock, druid, and paladin 
                let randomIndex = Math.floor(Math.random() * (data.results.length))
                let spell = data.results[randomIndex].name
                let spellIndex = data.results[randomIndex].index
                dCharInfo.characterAttackName = spell
                // display resulting spell on screen
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
            // establish weapon power, split result into diceType (eg. d6, d12, etc.) and numberOfDice
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
            // if spell chosen in dAttack does not do damage, re-run dAttack
            if (!data.damage) {
                dAttack(dCharInfo.characterClass)
                return
            }
            // establish spell power, split result into diceType (eg. d6, d12, etc.) and numberOfDice
            let spellDamage = data.damage.damage_at_slot_level || data.damage.damage_at_character_level
            dCharInfo.characterAttackPower = spellDamage[Object.keys(spellDamage)[Math.floor(Math.random() * Object.keys.length)]];
            dCharInfo.numberOfDice = parseInt(dCharInfo.characterAttackPower.split("d")[0]) 
            dCharInfo.diceType = parseInt(dCharInfo.characterAttackPower.split("d")[1])
        })
}

// establish pokemon from gen 1
function pokeChoice() {
    // choose pokemon from original 151 (gen 1)
    var randomPoke = Math.ceil(Math.random() * 151)
    let pokeApi = `https://pokeapi.co/api/v2/pokemon/${randomPoke}/`
    fetch(pokeApi)
        .then(res => res.json())
        .then(data => {
            // capitalize pokemon name for display on page
            pokeInfo.pokeName = capitalize(data.name)
            let pokeNameDispEl = document.querySelector("#poke-name")
            pokeNameDispEl.textContent = ""
            let pokeNameAdj = pokeInfo.pokeName
            // adjust pokemon name for edge cases where hyphen is included in data.name
            pokeNameAdj = pokeNameAdj.split("-")[0]
            pokeNameDispEl.append(pokeNameAdj)
            pokeDataPass = data.name
            pokeHpFetch(pokeDataPass)
            pokeSpeedFetch(pokeDataPass)
            pokeMoveFetch(pokeDataPass)
            pokeImage(pokeDataPass)
            adjustPokeName(pokeNameAdj)
        })
};

// handle edge case of mr. mime, as pokeChoice will otherwise render the name as "Mr"
function adjustPokeName(mrMime) {
    console.log(mrMime)
    if (mrMime == "Mr") {
        mrMime = mrMime + ". Mime"
        let pokeNameDispEl = document.querySelector("#poke-name")
        pokeNameDispEl.textContent = mrMime
    } 
}

// establish pokemon image
function pokeImage(pokemon) {
    let chosenPokeApi = "https://pokeapi.co/api/v2/pokemon/" + pokemon + "/"
    console.log(chosenPokeApi)
    fetch (chosenPokeApi)
        .then(res => res.json())
        .then(data => {
            // create img element from front_default sprite
            let pokeCombatantEl = document.querySelector("#poke-combatant-img")
            let pokeImageUrl = data.sprites.front_default
            let pokePng = document.createElement("img")

            // assign classes and src to pokemon image
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
            // fetch base stat for hp from poke api, display on page
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
            // fetch base stat for speed from poke api
            pokeInfo.pokeSpeed = data.stats[5].base_stat
        })
}

// establish pokemon move of choice and attack power
function pokeMoveFetch(pokemon) {
    let chosenPokeApi = "https://pokeapi.co/api/v2/pokemon/" + pokemon + "/"
    fetch(chosenPokeApi)
        .then(res => res.json())
        .then(data => {
            // as ditto only has one non-attacking move available, re-run pokeChoice if ditto is chosen in initial pokeChoice run
            if (pokemon == "ditto") {
                $("#poke-combatant-img").remove()
                pokeChoice()
                return
            }
            // randomly choose move from pokemon's list of eligible moves
            let randomIndex = Math.ceil(Math.random() * (data.moves.length))
            pokeInfo.pokeAttackName = data.moves[randomIndex].move.name
            // find poke attack display location, reset textContent (for cases where pokeMoveFetch is re-reun after pokeMovePower returns an attack power of null)
            let pokeAttackDispEl = document.querySelector("#poke-attack")
            pokeAttackDispEl.textContent = ""
            let pokeAttackDisp = pokeInfo.pokeAttackName
            // remove hyphens from move name, display on page
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
            // if power of move selected in pokeMoveFetch is null, re-run pokeMoveFetch
            if (data.power == null) {
                let pokeLowerCase = pokeInfo.pokeName.toLowerCase()
                pokeMoveFetch(pokeLowerCase)
                return
            } else {
                // otherwise, assign poke attack power
                pokeInfo.pokeAttackPower = data.power
            }
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

// parallax function
(function(){

    var parallax = document.querySelectorAll("body"),
        speed = 0.15;
  
    window.onscroll = function(){
      [].slice.call(parallax).forEach(function(el,i){
  
        var windowYOffset = window.pageYOffset,
            elBackgrounPos = "15% " + (windowYOffset * speed) + "px";
  
        el.style.backgroundPosition = elBackgrounPos;
  
      });
    };
  
  })();