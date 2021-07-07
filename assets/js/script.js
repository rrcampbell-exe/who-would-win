// SPACE FOR UNIVERSAL VARIABLES AND CONSTANTS
var roundId = function() {
    for (i = 1; )
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
                let chosenRace = data.results[randomIndex].index
                console.log(chosenRace)
                // establish d&d character speed
                    let apiChosenRace = "https://www.dnd5eapi.co/api/races/" + chosenRace + "/"
                    fetch(apiChosenRace)
                    .then(res => res.json())
                    .then(data => { 
                        let dSpeed = data.speed
                        // convert speed of d&d character to pokemon equivalent, with max d&d character speed = 100
                        if (dSpeed == 25) {
                            let dSpeedAdj = Math.ceil(Math.random() * dSpeed) + 45
                            console.log(dSpeedAdj)
                        } else {
                            let dSpeedAdj = Math.ceil(Math.random() * dSpeed) + 70
                            console.log(dSpeedAdj)
                        }
                    })
                })
    };

    // establish d&d class, descendant attributes
    function dClassEtAl() {
        let apiClass = "https://www.dnd5eapi.co/api/classes/"
        let dClass = document.querySelector(".d-class") // to populate page with chosen class of d&d character
        fetch(apiClass)
            .then(res => res.json())
            .then(data => {
                let randomIndex = Math.floor(Math.random() * (data.results.length))
                // dClass.forEach(node => { node.textContent = data.results[randomIndex].index
                let chosenClass = data.results[randomIndex].index
                console.log(chosenClass)
                // establish d&d hp
                    let apiChosenClass = "https://www.dnd5eapi.co/api/classes/" + chosenClass + "/"
                    fetch(apiChosenClass)
                        .then(res => res.json())
                        .then(data => {
                            let dLevel = Math.ceil(Math.random() * 5)
                            console.log(dLevel)
                            let hpTotal = dLevel * data.hit_die // currently, hit points are assigned assuming max roll of all hit point dice
                            console.log(hpTotal)
                        })
                // establish weapon or spell selection based on class
                if (chosenClass == "barbarian" || chosenClass == "fighter" || chosenClass == "monk" || chosenClass == "ranger" || chosenClass == "rogue") {
                    let apiAttackChoice = "https://www.dnd5eapi.co/api/equipment-categories/weapon"
                    fetch(apiAttackChoice)
                        .then(res => res.json())
                        .then(data => {
                            let randomIndex = Math.ceil(Math.random() * (data.equipment.length - 1))
                            let weapon = data.equipment[randomIndex].name.toLowerCase()
                            console.log(weapon);
                        })
                    } else {
                        let apiAttackChoice = "https://www.dnd5eapi.co/api/spells"
                        fetch(apiAttackChoice)
                            .then(res => res.json())
                            .then(data => {
                                let randomIndex = Math.floor(Math.random() * (data.results.length))
                                let spell = data.results[randomIndex].name
                                let spellIndex = data.results[randomIndex].index
                                console.log(spell);

                                let apiAttackPower = "https://www.dnd5eapi.co/api/spells/" + spellIndex + "/"
                                fetch(apiAttackPower)
                                    .then(res => res.json())
                                    .then(data => {
                                        let spellDamage = data.damage.damage_at_slot_level[5] // will only work if spell can be cast at level 5
                                        console.log(spellDamage)
                                        // consider exploring the solutions on this page: https://stackoverflow.com/questions/49684828/how-do-i-select-a-random-object-from-a-json-file-with-javascript
                                        // if (typeof spellDamage === 'undefined') {
                                        //     dClassEtAl();
                                        // }
                                    })
                            })
                    }
                }) 
        
    };

    // establish pokemon from gen 1
    function pokeStats () {
        var randomPoke = Math.ceil(Math.random() * 151)
        let pokeApi = `https://pokeapi.co/api/v2/pokemon/${randomPoke}/`
        fetch(pokeApi)
            .then(res => res.json())
            .then(data => {
                let pokeChoice = data.name
                console.log(pokeChoice)
            // establish pokemon hp
            let chosenPokeApi = "https://pokeapi.co/api/v2/pokemon/" + pokeChoice + "/"
            fetch(chosenPokeApi)
                .then(res => res.json())
                .then(data => {
                    let pokeHp = data.stats[0].base_stat
                    console.log(pokeHp);
                })
            // establish pokemon speed
            fetch(chosenPokeApi)
                .then(res => res.json())
                .then(data => {
                    let pokeSpeed = data.stats[5].base_stat
                    console.log(pokeSpeed)
                })
            // establish pokemon move of choice
            fetch(chosenPokeApi)
                .then(res => res.json())
                .then(data => {
                    let randomIndex = Math.ceil(Math.random() * (data.moves.length))
                    let pokeMove = data.moves[randomIndex].move.name
                    console.log(pokeMove);  
                // establish power of pokemon's move of choice
                let chosenMoveApi = data.moves[randomIndex].move.url 
                fetch(chosenMoveApi)
                    .then(res => res.json())
                    .then(data => {
                        let pokeMovePower = data.power
                        console.log(pokeMovePower);
                        if (pokeMovePower == null) {
                            pokeStats(); // don't do this long-term; need to un-nest fetches and create separate functions so you can call the chosenMove function again here
                        }
                    })
                })

            })

    }


// FUNCTIONS FOR BATTLE

    // function to calculate win probability based on previously establish parameters

// RUNNING OF FUNCTIONS ON PAGE LOAD
dRace();
dClassEtAl();
pokeStats();