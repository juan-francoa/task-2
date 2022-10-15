function imprimirCard(padre, value){
    padre.innerHTML += 
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
}
function cardMain(data){
    let conteMain = document.getElementById("main")
    conteMain.className = ("d-flex flex-wrap justify-content-center gap-5")
    data.events.forEach(value => imprimirCard(conteMain, value))
}
//upcoming
function cardUpcoming(data) {
    let container = document.getElementById("upcoming")
    container.className = ("d-flex flex-wrap justify-content-center gap-5")
    let fecha = new Date(data.currentDate)
    data.events.filter(value => (fecha >= new Date(value.date) && imprimirCard(container,value)))
}

//past
function cardpast(data) {
    let container = document.getElementById("past")
    container.className = ("d-flex flex-wrap justify-content-center gap-5")
    let fecha = new Date(data.currentDate)
    let card = data.events.filter(value => (fecha < new Date(value.date) && imprimirCard(container,value)))
}


let xs = document.getElementById("main")
if(xs !== null){
    cardMain(data)
    categorysCheckbox(data, "checkbox-index")
    eventsCategory(data, "checkbox-index", "main")
    eventSearch(data, "main" ,"form")
}

/*
let up = document.getElementById("upcoming")
if(up !== null){
    cardUpcoming(data)
    categorysCheckbox(data, "checkbox-upcoming")
    eventsCategory(data, "checkbox-upcoming", "upcoming")
}
let pas = document.getElementById("past")
if(pas !== null){
    cardpast(data)
    categorysCheckbox(data, "checkbox-past")
    eventsCategory(data, "checkbox-past", "past")
}
*/
function categorys(data){
    let array = data.events.map(value => value.category)
    return [... new Set(array)].sort()
}
function categorysCheckbox(data, id){
    let category = categorys(data)
    let container = document.getElementById(id)
    category.map(value => imprimirCategorys(container, value));
}
function imprimirCategorys(padre, value){

    padre.innerHTML += 
        `
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="${value}">
            <label class="form-check-label" for="inlineCheckbox1"> ${value} </label>
        </div>
        `
}


function eventsCategory(data,id,id2){
    let checkbox = document.getElementById(id)
    let aray = categorys(data).map(values => ({ value : values, checked : false}))
    return checkbox.addEventListener("change",(element => imprimirCardCategory(data, aray, element,id2)))
}
function imprimirCardCategory(data, aray, element,id2){
    let array = document.getElementById(id2)
    array.className = ("d-flex flex-wrap justify-content-center gap-5")
    aray.map(elements => {
        if(elements.value === element.target.value){
           elements.checked = element.target.checked
        }
    } )
    let x = aray.filter(element1 => element1.checked).map(element0 => element0.value)
    if(x.length !== 0){
        array.innerHTML = ""
        if(id2 === "main"){
           data.events.filter(element2 => x.includes(element2.category)).forEach(value0 => imprimirCard(array,value0))
        }
        if(id2 === "upcoming"){
            let fecha = new Date(data.currentDate)
            data.events.filter(value => (fecha >= new Date(value.date))).filter(element2 => x.includes(element2.category)).forEach(value0 => imprimirCard(array,value0))
        }
        if(id2 === "past"){
            let fecha = new Date(data.currentDate)
            data.events.filter(value => (fecha < new Date(value.date))).filter(element2 => x.includes(element2.category)).forEach(value0 => imprimirCard(array,value0))
        }
    }
    else{
        array.innerHTML = ""
        if(id2 === "main"){
            cardMain(data)
        }
        if(id2 === "upcoming"){
            cardUpcoming(data)
        }
        if(id2 === "past"){
            cardpast(data)
        }
    }   
}
function eventSearch(data, id2, selector){
    let form = document.querySelector(selector)
    let card = document.getElementById(id2)
    form.addEventListener("submit", (events) =>  imprimirSearch(data, events, id2, card))
}

function formData(events){
    events.preventDefault()
    return events.target[0].value.toLowerCase()
}

function imprimirSearch(data, events, id2, card){
    let stringEvent = formData(events)
        if( stringEvent.length !== 0){
            card.innerHTML = ""
            if(id2 === "main"){
                data.events.filter(element11 => element11.name.toLowerCase().includes(stringEvent) || element11.description.toLowerCase().includes(stringEvent)).forEach(element101 => imprimirCard(card ,element101) )
            }
            if(id2 === "upcoming"){
                let fecha = new Date(data.currentDate)
                data.events.filter(value => (fecha >= new Date(value.date))).filter(element11 => element11.name.toLowerCase().includes(stringEvent) || element11.description.toLowerCase().includes(stringEvent)).forEach(element101 => imprimirCard(card ,element101) )
            }
            if(id2 === "past"){
                let fecha = new Date(data.currentDate)
                data.events.filter(value => (fecha < new Date(value.date))).filter(element11 => element11.name.toLowerCase().includes(stringEvent) || element11.description.toLowerCase().includes(stringEvent)).forEach(element101 => imprimirCard(card ,element101) )
            }
        }
        else{
            card.innerHTML = ""
            if(id2 === "main"){
                cardMain(data)
            }
            if(id2 === "upcoming"){
                cardUpcoming(data)
            }
            if(id2 === "past"){
                cardpast(data)
            }
        }
}