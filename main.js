function cardMain(data) {
    let conteMain = document.getElementById("main")
    let diy = document.createElement("div")
    diy.className += (" d-flex flex-wrap justify-content-center gap-5")
    conteMain.appendChild(diy)
    for (let i = 0;i<data.events.length;i++) {
        let div = document.createElement("div")
        div.innerHTML += 
        `
        <div class="card" style="width: 18rem;">
            <img src="${data.events[i]["image"]}" class="card-img-top" alt="${data.events[i]["name"]}">
            <div class="card-body">
                <h5 class="card-title">${data.events[i]["name"]}</h5>
                <p class="card-text">${data.events[i]["description"]}</p>
                <a href="#" class="btn btn-primary">Details</a>
            </div>
        </div>
        `  
        diy.appendChild(div)   
    }
}
//upcoming
function cardUpcoming(data) {
    let container = document.getElementById("upcoming")
    let diy = document.createElement("div")
    diy.className += (" d-flex flex-wrap justify-content-center gap-5")
    container.appendChild(diy)
    for (let i = 0; i < data.events.length; i++) {
        if (!upcomingEvents(data, i)) {
            let div = document.createElement("div")
            div.innerHTML +=
                `
                <div class="card" style="width: 18rem;">
                    <img src="${data.events[i]["image"]}" class="card-img-top" alt="${data.events[i]["name"]}">
                    <div class="card-body">
                        <h5 class="card-title">${data.events[i]["name"]}</h5>
                        <p class="card-text">${data.events[i]["description"]}</p>
                        <a href="#" class="btn btn-primary">Details</a>
                    </div>
                </div>
                `
            diy.appendChild(div)
        }
    }
}
function upcomingEvents(data, i) {
    for (let y = 0; y < 3; y++) {
        if (converDate(data, i)[y] < converCurrentDate(data)[y]) {
            return true
        }
    }
    return false
}
function converDate(data, i) {
    let array = []
    let arraystring = []
    for (let it = 0; it < data.events[i]["date"].length; it++) {
        arraystring.push(data.events[i]["date"][it])
        if (it === 3) {
            array.push(Number(arraystring.join("")))
            it++
            arraystring = []
        }
        else if (it === 6) {
            array.push(Number(arraystring.join("")))
            it++
            arraystring = []
        }
        else if (it === 9) {
            array.push(Number(arraystring.join("")))
            it++
            arraystring = []
        }
    }
    return array
}
function converCurrentDate(data) {
    let array = []
    let arraystring = []
    for (let it = 0; it < data.currentDate.length; it++) {
        arraystring.push(data.currentDate[it])
        if (it === 3) {
            array.push(Number(arraystring.join("")))
            it++
            arraystring = []
        }
        else if (it === 6) {
            array.push(Number(arraystring.join("")))
            it++
            arraystring = []
        }
        else if (it === 9) {
            array.push(Number(arraystring.join("")))
            it++
            arraystring = []
        }
    }
    return array
}
//past
function cardpast(data) {
    let container = document.getElementById("past")
    let diy = document.createElement("div")
    diy.className += (" d-flex flex-wrap justify-content-center gap-5")
    container.appendChild(diy)
    for (let i = 0; i < data.events.length; i++) {
        if (upcomingEvents(data, i)) {
            let div = document.createElement("div")
            div.innerHTML +=
                `
                <div class="card" style="width: 18rem;">
                    <img src="${data.events[i]["image"]}" class="card-img-top" alt="${data.events[i]["name"]}">
                    <div class="card-body">
                        <h5 class="card-title">${data.events[i]["name"]}</h5>
                        <p class="card-text">${data.events[i]["description"]}</p>
                        <a href="#" class="btn btn-primary">Details</a>
                    </div>
                </div>
                `
            diy.appendChild(div)
        }
    }
}
let Main = document.getElementById("main")
if(Main !== null){
    cardMain(data)
}
let up = document.getElementById("upcoming")
if(up !== null){
    cardUpcoming(data)
}
let pas = document.getElementById("past")
if(pas !== null){
   cardpast(data)
}