// MECHANICS FOR GAMEPLAY

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
setTimeout(fightButton, 1500)

// poke attack
function pokeAttack() {
    // generate strength of pokemon attack
    let pokeAttackDamage = Math.ceil(Math.random() * (pokeInfo.pokeAttackPower - (pokeInfo.pokeAttackPower * 0.65) +1) + (pokeInfo.pokeAttackPower * 0.65))
    
    // display attack damage on screen
    console.log(pokeInfo.pokeName + " does " + pokeAttackDamage + " HP of damage with " + pokeInfo.pokeAttackName + "!")

    // update d&d character HP value
    dCharInfo.characterHp = dCharInfo.characterHp - pokeAttackDamage
    console.log("The " + dCharInfo.characterClass + " now has " + dCharInfo.characterHp + " HP remaining!")

    // continue to d&d attack if d&d character has HP remaining
    if (dCharInfo.characterHp > 0) {
        dAttackMove();
    } else {
        pokeInfo.winner = pokeInfo.pokeName
        pokeInfo.loser = dCharInfo
        handleBattleEnding(pokeInfo)
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
    // generate strenght of d&d character attack
    let dAttackDamage = ((dCharInfo.numberOfDice * (dCharInfo.characterLevel - 8)) * (Math.ceil(Math.random() * dCharInfo.diceType)))

    // display attack damage on screen
    console.log("The " + dCharInfo.characterClass + " does " + dAttackDamage + " HP of damage with " + dCharInfo.characterAttackName + "!")

    // update pokemon character HP value
    pokeInfo.pokeHp = pokeInfo.pokeHp - dAttackDamage
    console.log(pokeInfo.pokeName + " now has " + pokeInfo.pokeHp + " HP remaining!")

    // continue to pokemon attack if pokemon has HP remaining
    if (pokeInfo.pokeHp > 0) {
        pokeAttack();
    } else {
        //battle += 1;
        dCharInfo.loser = pokeInfo
        dCharInfo.winner = dCharInfo.characterClass
        handleBattleEnding(dCharInfo)
    }
}

function dSpellAttack() {
    // generate strenght of d&d character attack
    let dAttackDamage = (dCharInfo.numberOfDice * (Math.ceil(Math.random() * dCharInfo.diceType)))

    // display attack damage on screen
    console.log("The " + dCharInfo.characterClass + " does " + dAttackDamage + " HP of damage with " + dCharInfo.characterAttackName + "!")

    // update pokemon character HP value
    pokeInfo.pokeHp = pokeInfo.pokeHp - dAttackDamage
    console.log(pokeInfo.pokeName + " now has " + pokeInfo.pokeHp + " HP remaining!")

    // continue to pokemon attack if pokemon has HP remaining
    if (pokeInfo.pokeHp > 0) {
        pokeAttack();
    } else {
        //battle += 1;
        dCharInfo.loser = pokeInfo
        dCharInfo.winner = dCharInfo.characterClass
        handleBattleEnding(dCharInfo)
    }
}

// functions made together!!!
// a function that is called at the end of the battling, that will store the victor and their information into localstorage to be retrievable on page load
function handleBattleEnding(victorsData) {
    if (localStorage.getItem('battles') == null) {
        localStorage.setItem('battles', JSON.stringify([victorsData]))
    } else {
        setBattleStorage(victorsData)
    }
    endBattle()
}

function setBattleStorage(dataAboutVictor) {
        let oldBattles = getBattleStorage() // [{}, {}, ...]
        oldBattles.push(dataAboutVictor) //old battles plus the latest
        // this overwrites everything there
        return localStorage.setItem('battles', JSON.stringify(oldBattles))
}

function getBattleStorage() {
    return JSON.parse(localStorage.getItem('battles'))
}

// ENDGAME MECHANICS
function endBattle(){
    if (pokeInfo.pokeHp > dCharInfo.characterHp) {
        // declare pokemon the winner
        window.alert(pokeInfo.pokeName + " has won the battle with the " + dCharInfo.characterRace + "!");

        // add win to pokemon team, all-time
        winTracker.pokeWins = winTracker.pokeWins + 1
        console.log(winTracker)

        // save winTracker object

    } else {
        // declare d&d character the winner
        window.alert("The " + dCharInfo.characterRace + " has won the battle with " + pokeInfo.pokeName + "!")

        // add win to d&d team, all-time
        winTracker.dWins = winTracker.dWins + 1
        console.log(winTracker)

        // save winTracker object

    }

    playAgainConfirm()
}

// ask player if they would like to play again
function playAgainConfirm() {
    let playAgainConfirm = window.confirm("Would you like to play again?")

    if (playAgainConfirm) {
        $(".fighter-image").remove();

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
    else {
        window.alert("Thank you for playing WhO wOuLd WiN?! Come again soon!")
    }
}
