function imprimirCard(padre, value){
    let div = document.createElement("div")
    div.innerHTML = 
        `
        <div class="card" style="width: 18rem;">
            <img src="${value["image"]}" class="card-img-top" alt="${value["name"]}">
            <div class="card-body">
                <h5 class="card-title">${value["name"]}</h5>
                <p class="card-text">${value["description"]}</p>
                <a href="#" class="btn btn-primary">Details</a>
            </div>
        </div>
        `
        padre.appendChild(div)    
}
function cardMain(data){
    let conteMain = document.getElementById("main")
    conteMain.className = ("d-flex flex-wrap justify-content-center gap-5")
    let card = data.events.map(value => imprimirCard(conteMain, value))
}
//upcoming
function cardUpcoming(data) {
    let container = document.getElementById("upcoming")
    container.className = ("d-flex flex-wrap justify-content-center gap-5")
    let fecha = new Date(data.currentDate)
    let card = data.events.filter(value => (fecha >= new Date(value.date) && imprimirCard(container,value)))
}

//past
function cardpast(data) {
    let container = document.getElementById("past")
    container.className = ("d-flex flex-wrap justify-content-center gap-5")
    let fecha = new Date(data.currentDate)
    let card = data.events.filter(value => (fecha < new Date(value.date) && imprimirCard(container,value)))
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