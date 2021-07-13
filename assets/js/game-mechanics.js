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

// create fight button
function fightButton () {
    let buttonHolderEl = document.querySelector("#button-holder")
    let dButton = document.createElement("button")
    dButton.textContent = "Let's fight!"
    dButton.setAttribute("class", "fight-btn")
    buttonHolderEl.append(dButton);
    dButton.addEventListener("click", firstMove)
}

<<<<<<< HEAD
// function that takes in winner info and displays it on the page
function winner(winnerInfo) {
    let winnerHolderEl = document.querySelector('#winner')
    let announcerHeading = document.createElement("h1")
    let tracker = JSON.parse(localStorage.getItem('winTracker'))
    announcerHeading.textContent = winnerInfo + "\nPokemon: " + tracker.pokeWins + " Dungeons & Dragons: " + tracker.dWins
    announcerHeading.setAttribute("id", "winnerH1")
    winnerHolderEl.append(announcerHeading);
    endBattle()
}

// fight button
setTimeout(fightButton, 1500)
=======
// add fight button to page on timer
setTimeout(fightButton, 2000)

// create next pokemon battle round button
function nextPokeRound() {
    $(".fight-btn").remove()
    let buttonHolderEl = document.querySelector("#button-holder")
    let dButton = document.createElement("button")
    dButton.textContent = "Attack, " + pokeInfo.pokeName + "!"
    dButton.setAttribute("class", "fight-btn")
    buttonHolderEl.append(dButton);
    dButton.addEventListener("click", pokeAttack)
}

// create next dnd battle round button
function nextDndRound() {
    $(".fight-btn").remove()
    let buttonHolderEl = document.querySelector("#button-holder")
    let dButton = document.createElement("button")
    dButton.textContent = "Get 'em, " + dCharInfo.characterClass + "!"
    dButton.setAttribute("class", "fight-btn")
    buttonHolderEl.append(dButton);
    dButton.addEventListener("click", dAttackMove)
}
>>>>>>> b1c1620074d2f9595227167e035f6bb947f8f29f

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
<<<<<<< HEAD
        // pokeInfo.loser = dCharInfo
        // handleBattleEnding(pokeInfo)
        winner(pokeInfo.pokeName)
        // endBattle()
=======
        dCharInfo.characterHp = 0
        endBattle();
>>>>>>> b1c1620074d2f9595227167e035f6bb947f8f29f
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
<<<<<<< HEAD
        //battle += 1;
        // dCharInfo.loser = pokeInfo
        winner(dCharInfo.characterClass)
        // handleBattleEnding(dCharInfo)
        // endBattle()
=======
        pokeInfo.pokeHp = 0
        endBattle();
>>>>>>> b1c1620074d2f9595227167e035f6bb947f8f29f
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
<<<<<<< HEAD
        //battle += 1;
        // dCharInfo.loser = pokeInfo
        // handleBattleEnding(dCharInfo)
        winner(dCharInfo.characterClass)
        // endBattle()
=======
        pokeHpDisp.textContent = 0
>>>>>>> b1c1620074d2f9595227167e035f6bb947f8f29f
    }
    console.log(pokeInfo.pokeName + " now has " + pokeInfo.pokeHp + " HP remaining!")

    // continue to pokemon attack if pokemon has HP remaining
    if (pokeInfo.pokeHp > 0) {
        nextPokeRound();
    } else {
        endBattle();
    }
<<<<<<< HEAD
    //endBattle()
}

function setBattleStorage(dataAboutVictor) {
        let oldBattles = getOldBattleStorage() // [{}, {}, ...]
        oldBattles.push(dataAboutVictor) //old battles plus the latest
        // this overwrites everything there
        return localStorage.setItem('battles', JSON.stringify(oldBattles))
=======
>>>>>>> b1c1620074d2f9595227167e035f6bb947f8f29f
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
        localStorage.setItem('winTracker', JSON.stringify(winTracker))
    } else {
        winTracker = getBattleStorage()
    }

    if (pokeInfo.pokeHp > dCharInfo.characterHp) {
        // declare pokemon the winner
<<<<<<< HEAD
        // winner(pokeInfo.pokeName)
        window.alert(pokeInfo.pokeName + " has won the battle with the " + dCharInfo.characterRace + "!");
=======
        battleDispEl.textContent = ""
        battleDispEl.textContent = pokeInfo.pokeName + " has won the battle with the " + dCharInfo.characterRace + "!"
>>>>>>> b1c1620074d2f9595227167e035f6bb947f8f29f

        // add win to pokemon team, all-time
        winTracker.pokeWins = winTracker.pokeWins + 1
        pokeScore.textContent = winTracker.pokeWins


        // save win to pokemon team, all time
        localStorage.setItem('winTracker', JSON.stringify(winTracker))

    } else {
        // declare d&d character the winner
<<<<<<< HEAD
        // winner(dCharInfo.characterClass)
        window.alert("The " + dCharInfo.characterRace + " has won the battle with " + pokeInfo.pokeName + "!")
=======
        battleDispEl.textContent = ""
        battleDispEl.textContent = "The " + dCharInfo.characterRace + " " + dCharInfo.characterClass + " has won the battle with " + pokeInfo.pokeName + "!"
>>>>>>> b1c1620074d2f9595227167e035f6bb947f8f29f

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
<<<<<<< HEAD
    let playAgainConfirm = window.confirm("Would you like to play again?")

    if (playAgainConfirm) {
        $(".fighter-image-left").remove();
        $(".fighter-image-right").remove();
=======
    $(".fight-btn").remove()
    let buttonHolderEl = document.querySelector("#button-holder")
    let dButton = document.createElement("button")
    dButton.textContent = "Play again?"
    dButton.setAttribute("class", "fight-btn")
    buttonHolderEl.append(dButton);
    dButton.addEventListener("click", playAgain)
}
>>>>>>> b1c1620074d2f9595227167e035f6bb947f8f29f

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
