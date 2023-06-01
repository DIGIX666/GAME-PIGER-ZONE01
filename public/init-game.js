let dataTeam = []

export const reduce = () => {
    let logo = document.getElementById("logo")
    window.addEventListener("load", function () {
        setTimeout(() => {
            logo.style.transform = "scale(0.6)"
            logo.style.top = "-250px"
            logo.style.animation = "2s ease-in-out 0s infinite waver"
        }, 1300)
    })
}

export const planetSpawner = () => {
    let planets = document.getElementsByClassName("everyPlanet")
    window.addEventListener("load", function () {
        for (let i of planets) {
            setTimeout(() => {
                i.style.transform = "scale(1.0)"
            }, 1500)
        }
    })
    let starts = document.getElementsByClassName("start")
    window.addEventListener("load", function () {
        for (let i of starts) {
            setTimeout(() => {
                i.style.transform = "scale(1)"
            }, 1500)
        }
    })
}

export const planetSelector = () => {
    let planets = document.getElementsByClassName("everyPlanet");
    let form = document.getElementById("form")
    let start = document.getElementById("starts")
    
    for (let i of planets) {
        i.addEventListener("click", function () {
            for (let j of planets) {
                j.style.transform = "scale(0)"
                j.style.transition = "all 0.3s ease-out"
            }
            setTimeout(() => {
                i.style.transform = "scale(3)"
                i.style.transition = "transform 0.3s ease-in"
                i.style.left = "300px"
                i.style.top = "60vh"
                start.style.transform = "scale(0)"
                form.style.transform = "scale(1)"
                form.style.transition = "all 0.3s ease-in"
            }, 500)
            
            document.getElementById("form-team").onsubmit = function(e) {
                e.preventDefault()
                for (let j of planets) {
                    j.style.transform = "scale(1)"
                    j.style.transition = "all 0.3s ease-out"
                }
                setTimeout(() => {
                    i.style.display = "none"
                    i.style.transition = "transform 0.3s ease-in"
                    start.style.transform = "scale(1)"
                    form.style.transform = "scale(0)"
                    form.style.transition = "all 0.3s ease-in"
                }, 500)
                
                let inputTeam = document.getElementById("team")
                dataTeam.push({ planet: i.id, team: inputTeam.value })
                inputTeam.value = ""
            }
        })
    }
}

document.getElementById("starts").addEventListener("click", function(){
    console.log(dataTeam.length);
    let json = JSON.stringify(dataTeam)
    console.log(json);
    fetch("/data", {
        body: json,
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        location.href = "/game"
    })
})