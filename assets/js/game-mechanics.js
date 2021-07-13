// VARIABLES FOR DISPLAY
var battleDispEl = document.querySelector("#battle-narration")
var pokeHpDisp = document.querySelector("#poke-hp")
var dHpDisp = document.querySelector("#d-char-hp")
var pokeScore = document.querySelector("#poke-win")
var dndScore = document.querySelector("#dnd-win")

// FUNCTIONS FOR DISPLAY

// load all-time scoreboard on page load
function fetchScoreboard() {
    let winTracker = getBattleStorage()
    pokeScore.textContent = winTracker.pokeWins
    dndScore.textContent = winTracker.dWins
}

// explode, then restore combat area
function combatContainerOffOn() {
    $(".combat-container").effect("puff")
    $(".combat-container").show(2000)
}

// make battle-narration box visible
function seeBattleBox() {
    let battleNarrationEl = document.querySelector("#battle-narration")
    battleNarrationEl.style.visibility = "visible"
}

// hide battle-narration box
function hideBattleBox() {
    let battleNarrationEl = document.querySelector("#battle-narration")
    battleNarrationEl.style.visibility = "hidden"
}

// FUNCTIONS FOR GAMEPLAY

// designate first move
function firstMove() {
    seeBattleBox()
    if (pokeInfo.pokeSpeed > dCharInfo.characterSpeed) {
        console.log(pokeInfo.pokeName + " attacks first!")
        pokeAttack();
    } else {
        console.log("The " + dCharInfo.characterClass + " attacks first!")
        dAttackMove();
    }
};

// create fight button
function fightButton () {
    let buttonHolderEl = document.querySelector("#button-holder")
    let dButton = document.createElement("button")
    dButton.textContent = "Start!"
    dButton.setAttribute("class", "fight-btn btn-large red pulse")
    buttonHolderEl.append(dButton);
    dButton.addEventListener("click", firstMove)
}

// add fight button to page on timer
fightButton()

// create next pokemon battle round button
function nextPokeRound() {
    $(".fight-btn").remove()
    let buttonHolderEl = document.querySelector("#button-holder")
    let dButton = document.createElement("button")
    dButton.textContent = "Attack!"
    dButton.setAttribute("class", "fight-btn btn-large red pulse")
    buttonHolderEl.append(dButton);
    dButton.addEventListener("click", pokeAttack)
}

// create next dnd battle round button
function nextDndRound() {
    $(".fight-btn").remove()
    let buttonHolderEl = document.querySelector("#button-holder")
    let dButton = document.createElement("button")
    dButton.textContent = "Fight!"
    dButton.setAttribute("class", "fight-btn btn-large red pulse")
    buttonHolderEl.append(dButton);
    dButton.addEventListener("click", dAttackMove)
}

// poke attack
function pokeAttack() {
    // generate strength of pokemon attack
    let pokeAttackDamage = Math.ceil(Math.random() * (pokeInfo.pokeAttackPower - (pokeInfo.pokeAttackPower * 0.65) +1) + (pokeInfo.pokeAttackPower * 0.65))
    
    // update attack name
    let pokeAttackDisp = pokeInfo.pokeAttackName
    pokeAttackDisp = pokeAttackDisp.replace(/-/g, " ")
    
    // display attack damage on screen
    battleDispEl.textContent = ""
    battleDispEl.textContent = pokeInfo.pokeName + " does " + pokeAttackDamage + " HP of damage with " + pokeAttackDisp + "!"

    // update d&d character HP value
    dCharInfo.characterHp = dCharInfo.characterHp - pokeAttackDamage
    if (dCharInfo.characterHp > 0) {
        dHpDisp.textContent = dCharInfo.characterHp
    } else {
        dHpDisp.textContent = 0
    } 

    // display updated d&d character HP value
    console.log("The " + dCharInfo.characterClass + " now has " + dCharInfo.characterHp + " HP remaining!")

    // continue to d&d attack if d&d character has HP remaining
    if (dCharInfo.characterHp > 0) {
        nextDndRound();
    } else {
        dCharInfo.characterHp = 0
        endBattle();
    }
}


// d&d attack logic
function dAttackMove() {
    if (dCharInfo.characterClass == "barbarian" || dCharInfo.characterClass == "fighter" || dCharInfo.characterClass == "monk" || dCharInfo.characterClass == "ranger" || dCharInfo.characterClass == "rogue") {
        dWeaponAttack();
    } else {
        dSpellAttack();
    }
}

function dWeaponAttack() {
    // generate strength of d&d character attack
    let dAttackDamage = ((dCharInfo.numberOfDice * (dCharInfo.characterLevel - 6)) * (Math.ceil(Math.random() * dCharInfo.diceType)))

    // update weapon name
    let weaponDisp = dCharInfo.characterAttackName
    weaponDisp = weaponDisp.split(",")[0]
    
    // display attack damage on screen
    battleDispEl.textContent = ""
    battleDispEl.textContent = "The " + dCharInfo.characterClass + " does " + dAttackDamage + " HP of damage with their " + weaponDisp + "!"

    // update pokemon character HP value
    pokeInfo.pokeHp = pokeInfo.pokeHp - dAttackDamage
    if (pokeInfo.pokeHp > 0) {
        pokeHpDisp.textContent = pokeInfo.pokeHp
    } else {
        pokeHpDisp.textContent = 0
    }
    console.log(pokeInfo.pokeName + " now has " + pokeInfo.pokeHp + " HP remaining!")

    // continue to pokemon attack if pokemon has HP remaining
    if (pokeInfo.pokeHp > 0) {
        nextPokeRound();
    } else {
        pokeInfo.pokeHp = 0
        endBattle();
    }
}

function dSpellAttack() {
    // generate strength of d&d character attack
    if (isNaN(dCharInfo.diceType)) {
        dCharInfo.diceType = 1
    }

    let dAttackDamage = (dCharInfo.numberOfDice * (Math.ceil(Math.random() * dCharInfo.diceType)) + Math.ceil(Math.random() * 10) + 5)

    // display attack damage on screen
    battleDispEl.textContent = ""
    battleDispEl.textContent = "The " + dCharInfo.characterClass + " does " + dAttackDamage + " HP of damage with " + dCharInfo.characterAttackName + "!"
    console.log("The " + dCharInfo.characterClass + " does " + dAttackDamage + " HP of damage with " + dCharInfo.characterAttackName + "!")

    // update pokemon character HP value
    pokeInfo.pokeHp = pokeInfo.pokeHp - dAttackDamage
    if (pokeInfo.pokeHp > 0) {
        pokeHpDisp.textContent = pokeInfo.pokeHp
    } else {
        pokeHpDisp.textContent = 0
    }
    console.log(pokeInfo.pokeName + " now has " + pokeInfo.pokeHp + " HP remaining!")

    // continue to pokemon attack if pokemon has HP remaining
    if (pokeInfo.pokeHp > 0) {
        nextPokeRound();
    } else {
        endBattle();
    }
}

function getOldBattleStorage() {
    return JSON.parse(localStorage.getItem('battles'))
}

function getBattleStorage() {
    return JSON.parse(localStorage.getItem('winTracker'))
}

// ENDGAME MECHANICS
function endBattle(){
    // pull/store the winTracker variable
    if (localStorage.getItem('winTracker') == null) {
        // let scoreBoardEl = document.querySelector(".scoreboard")
        // scoreBoardEl.style.display = "none"
        localStorage.setItem('winTracker', JSON.stringify(winTracker))
    } else {
        winTracker = getBattleStorage()
    }

    if (pokeInfo.pokeHp > dCharInfo.characterHp) {
        // declare pokemon the winner
        battleDispEl.textContent = ""
        battleDispEl.textContent = pokeInfo.pokeName + " has won the battle with the " + dCharInfo.characterRace + "!"

        // add win to pokemon team, all-time
        winTracker.pokeWins = winTracker.pokeWins + 1
        pokeScore.textContent = winTracker.pokeWins


        // save win to pokemon team, all time
        localStorage.setItem('winTracker', JSON.stringify(winTracker))

    } else {
        // declare d&d character the winner
        battleDispEl.textContent = ""
        battleDispEl.textContent = "The " + dCharInfo.characterRace + " " + dCharInfo.characterClass + " has won the battle with " + pokeInfo.pokeName + "!"

        // add win to d&d team, all-time
        winTracker.dWins = winTracker.dWins + 1
        dndScore.textContent = winTracker.dWins

        // save win to d&d team, all time
        localStorage.setItem('winTracker', JSON.stringify(winTracker))

    }

    let scoreBoardEl = document.querySelector(".scoreboard")
    scoreBoardEl.style.display = "flex"

    playAgainConfirm()
}

// ask player if they would like to play again
function playAgainConfirm() {
    hideBattleBox()
    $(".fight-btn").remove()
    let buttonHolderEl = document.querySelector("#button-holder")
    let dButton = document.createElement("button")
    dButton.textContent = "Again?"
    dButton.setAttribute("class", "fight-btn btn-large red pulse")
    buttonHolderEl.append(dButton);
    dButton.addEventListener("click", playAgain)
}

function playAgain() {
    combatContainerOffOn();
    
    // d&d character functions
    setTimeout(dRace, 300)
    setTimeout(dClass, 300)
    setTimeout(characterImage, 1000);
    console.log(dCharInfo);

    // pokemon functions
    setTimeout(pokeChoice, 300)
    setTimeout(pokeImage, 1500);
    console.log(pokeInfo);

    battleDispEl.textContent = ""
    $(".d-fighter-image").remove();
    $(".poke-fighter-image").remove();
    $(".fight-btn").remove();

    setTimeout(fightButton, 300)
}

// RUN ON PAGE LOAD
fetchScoreboard();
