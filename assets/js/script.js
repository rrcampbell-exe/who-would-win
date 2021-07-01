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
                dRace.forEach(node => { node.textContent = data.results[randomIndex].index
                })
    })};

    // establish d&d class
    function dClass() {
        let apiClass = "https://www.dnd5eapi.co/api/classes/"
        let dClass = document.querySelectorAll(".d-class") // to populate page with chosen class of d&d character
        fetch(apiClass)
            .then(res => res.json())
            .then(data => {
                let randomIndex = Math.floor(Math.random() * (data.results.length))
                dClass.forEach(node => {node.textContent = data.results[randomIndex].index
                console.log(data.results[randomIndex].index)
                }) 
    })};

    // establish d&d hp
    

    // establish d&d moveset

    // establish pokemon from gen 1

    // establish pokemon hp

    // establish pokemon moveset

// FUNCTIONS FOR BATTLE

    // function to calculate win probability based on previously establish parameters

// RUNNING OF FUNCTIONS ON PAGE LOAD