// VARIABLES FOR DISPLAY

var battleDispEl = document.querySelector("#battle-narration")
var pokeHpDisp = document.querySelector("#poke-hp")
var dHpDisp = document.querySelector("#d-char-hp")
var pokeScore = document.querySelector("#poke-win")
var dndScore = document.querySelector("#dnd-win")

// FUNCTIONS FOR SCOREBOARD DISPLAY

// load all-time scoreboard on page load
function fetchScoreboard() {
    let winTracker = getBattleStorage()
    pokeScore.textContent = winTracker.pokeWins
    dndScore.textContent = winTracker.dWins
}

// FUNCTIONS FOR GAMEPLAY

// designate first move
function firstMove() {
    if (pokeInfo.pokeSpeed > dCharInfo.characterSpeed) {
        console.log(pokeInfo.pokeName + " attacks first!")
        pokeAttack();
    } else {
        console.log("The " + dCharInfo.characterClass + " attacks first!")
        dAttackMove();
    }
};

function fightButton () {
    let buttonHolderEl = document.querySelector("#button-holder")
    let dButton = document.createElement("button")
    dButton.textContent = "Let's fight!"
    dButton.setAttribute("class", "fight-btn")
    buttonHolderEl.append(dButton);
    dButton.addEventListener("click", firstMove)
}

// fight button
setTimeout(fightButton, 2000)

// poke attack
function pokeAttack() {
    // generate strength of pokemon attack
    let pokeAttackDamage = Math.ceil(Math.random() * (pokeInfo.pokeAttackPower - (pokeInfo.pokeAttackPower * 0.65) +1) + (pokeInfo.pokeAttackPower * 0.65))
    
    // display attack damage on screen
    battleDispEl.textContent = ""
    battleDispEl.textContent = pokeInfo.pokeName + " does " + pokeAttackDamage + " HP of damage with " + pokeInfo.pokeAttackName + "!"

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
        dAttackMove();
    } else {
        dCharInfo.characterHp = 0
        setTimeout(endBattle, 2000)
    }
}


// d&d attack logic
function dAttackMove() {
    if (dCharInfo.characterClass == "barbarian" || dCharInfo.characterClass == "fighter" || dCharInfo.characterClass == "monk" || dCharInfo.characterClass == "ranger" || dCharInfo.characterClass == "rogue") {
        setTimeout(dWeaponAttack, 2000);
    } else {
        setTimeout(dSpellAttack, 2000);
    }
}

function dWeaponAttack() {
    // generate strength of d&d character attack
    let dAttackDamage = ((dCharInfo.numberOfDice * (dCharInfo.characterLevel - 8)) * (Math.ceil(Math.random() * dCharInfo.diceType)))

    // display attack damage on screen
    battleDispEl.textContent = ""
    battleDispEl.textContent = "The " + dCharInfo.characterClass + " does " + dAttackDamage + " HP of damage with their " + dCharInfo.characterAttackName + "!"

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
        setTimeout(pokeAttack, 2000)
    } else {
        pokeInfo.pokeHp = 0
        setTimeout(endBattle, 2000)
    }
}

function dSpellAttack() {
    // generate strength of d&d character attack
    if (isNaN(dCharInfo.diceType)) {
        dCharInfo.diceType = 1
    }

    let dAttackDamage = (dCharInfo.numberOfDice * (Math.ceil(Math.random() * dCharInfo.diceType)))

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
        setTimeout(pokeAttack, 2000)
    } else {
        setTimeout(endBattle, 2000)
    }
}

function getBattleStorage() {
    return JSON.parse(localStorage.getItem('winTracker'))
}

// ENDGAME MECHANICS
function endBattle(){
    // pull/store the winTracker variable
    if (localStorage.getItem('winTracker') == null) {
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
        battleDispEl.textContent = "The " + dCharInfo.characterRace + " has won the battle with " + pokeInfo.pokeName + "!"

        // add win to d&d team, all-time
        winTracker.dWins = winTracker.dWins + 1
        dndScore.textContent = winTracker.dWins

        // save win to d&d team, all time
        localStorage.setItem('winTracker', JSON.stringify(winTracker))

    }

    playAgainConfirm()
}

// ask player if they would like to play again
function playAgainConfirm() {
    $(".fight-btn").remove()
    let buttonHolderEl = document.querySelector("#button-holder")
    let dButton = document.createElement("button")
    dButton.textContent = "Play again?"
    dButton.setAttribute("class", "fight-btn")
    buttonHolderEl.append(dButton);
    dButton.addEventListener("click", playAgain)
}

function playAgain() {
    battleDispEl.textContent = ""
    $(".d-fighter-image").remove();
    $(".poke-fighter-image").remove();
    $(".fight-btn").remove();

    fightButton();
    
    // d&d character functions
    dRace();
    dClass();
    setTimeout(characterImage, 1500);
    console.log(dCharInfo);

    // pokemon functions
    pokeChoice();
    setTimeout(pokeImage, 1500);
    console.log(pokeInfo);
}

// RUN ON PAGE LOAD
fetchScoreboard();
