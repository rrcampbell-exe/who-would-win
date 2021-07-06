// MECHANICS FOR GAMEPLAY

// designate first move
function firstMove() {
    if (pokeInfo.pokeSpeed > dCharInfo.characterSpeed) {
        pokeAttack();
    } else {
        dCharAttack();
    }
};


// poke attack
function pokeAttack() {
    // generate strength of pokemon attack
    let pokeAttackDamage = Math.floor(Math.random() * (pokeInfo.pokeAttackPower - (pokeInfo.pokeAttackPower * 0.65) +1) + (pokeInfo.pokeAttackPower * 0.65))
    console.log(pokeAttackDamage)
    // display attack damage on screen

    // update d&d character HP value
    dCharInfo.characterHp = dCharInfo.characterHp - pokeAttackDamage

    // continue to d&d attack if d&d character has HP remaining
    if (dCharInfo.characterHp > 0) {
        dAttackMove();
    } else {
        endBattle();
    }
}


// d&d attack
function dAttackMove() {
    // generate strenght of d&d character attack
    let dAttackDamage = (numberOfdice * Math.ceil(Math.random() * diceType))
    console.log(dAttackDamage)
    // display attack damage on screen

    // update pokemon character HP value
    pokeInfo.pokeHp = pokeInfo.pokeHp - dAttackDamage

    // continue to pokemon attack if pokemon has HP remaining
    if (pokeInfo.pokeHp > 0) {
        pokeAttack();
    } else {
        endBattle();
    }
}

// ENDGAME MECHANICS
function endBattle(){
    if (pokeInfo.pokeHp > dCharInfo.characterHp) {
        // declare pokemon the winner

        // add win to pokemon's streak

        // save win to pokemon's streak

        // add win to pokemon team, all-time

        // save win to pokemon team, all time

        // save pokemon for next battle (winner stays)

        // clear save data for d&d character (loser goes home)

    } else {
        // declare d&d character the winner

        // add win to d&d character's streak

        // save win to d&d character's streak

        // add win to d&d team, all-time

        // save win to d&d team, all time

        // save d&d character for next battle (winner stays)

        // clear save data for pokemon (loser goes home)
    }
};
