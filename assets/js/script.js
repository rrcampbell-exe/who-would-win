// SPACE FOR UNIVERSAL VARIABLES AND CONSTANTS

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
                        console.log(dSpeed)
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
                            let hpTotal = dLevel * data.hit_die
                            console.log(hpTotal)
                        })
                // establish weapon or spell selection based on class
                if (chosenClass == ("barbarian" || "fighter" || "monk" || "ranger" || "rogue")) {
                    let apiAttackChoice = "https://www.dnd5eapi.co/api/equipment-categories/weapon"
                    fetch(apiAttackChoice)
                        .then(res => res.json())
                        .then(data => {
                            let randomIndex = Math.floor(Math.random() * (data.equipment.length))
                            let weapon = data.equipment[randomIndex].name.toLowerCase()
                            console.log(weapon);
                        })
                    } else {
                        let apiAttackChoice = "https://www.dnd5eapi.co/api/spells"
                        fetch(apiAttackChoice)
                            .then(res => res.json())
                            .then(data => {
                                let randomIndex = Math.floor(Math.random() * (data.results.length))
                                let spell = data.results[randomIndex].index
                                console.log(spell);
                            })
                    }
                }) 
        
    };

    // establish pokemon from gen 1

    // establish pokemon hp

    // establish pokemon moveset

// FUNCTIONS FOR BATTLE

    // function to calculate win probability based on previously establish parameters

// RUNNING OF FUNCTIONS ON PAGE LOAD
dRace();
dClassEtAl();