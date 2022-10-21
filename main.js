function imprimirCard(padre, value){
    padre.innerHTML += 
        `
        <div class="card" style="width: 18rem;">
            <img src="${value["image"]}" class="card-img-top" alt="${value["name"]}">
            <div class="card-body">
                <h5 class="card-title">${value["name"]}</h5>
                <p class="card-text">${value["description"]}</p>
                <a href="details.html?id=${value._id}" class="btn btn-primary">Details</a>
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
    data.events.forEach(value => (fecha < new Date(value.date) && imprimirCard(container,value)))
}

//past
function cardpast(data) {
    let container = document.getElementById("past")
    container.className = ("d-flex flex-wrap justify-content-center gap-5")
    let fecha = new Date(data.currentDate)
    data.events.forEach(value => (fecha > new Date(value.date) && imprimirCard(container,value)))
}


let xs = document.getElementById("main")
if(xs){
    cardMain(data)
    categorysCheckbox(data, "checkbox-index")
    eventsCategory(data, "checkbox-index", "main")
    eventSearch(data, "main" ,"form")
}

let up = document.getElementById("upcoming")
if(up){
    cardUpcoming(data)
    categorysCheckbox(data, "checkbox-upcoming")
    eventsCategory(data, "checkbox-upcoming", "upcoming")
    eventSearch(data, "upcoming" , "form")
}
let pas = document.getElementById("past")
if(pas){
    cardpast(data)
    categorysCheckbox(data, "checkbox-past")
    eventsCategory(data, "checkbox-past", "past")
    eventSearch(data, "past" , "form")
}
let deta = document.getElementById("details")
if(deta){
    details(data , "details")
}

arrayCat = []
fecha = new Date(data.currentDate)
let applied ={
}

function filters (fn, value, id2){
    let mentors = data.events
    if(fn === "imprimirCardCategory" ){
        if(!arrayCat.includes(value)){
            arrayCat.push(value)
        }
        else{
            let i = arrayCat.indexOf(value)
            arrayCat.splice(i,1)
        }
        applied[fn] = arrayCat
    }
    else{
        applied[fn] = value
    }
    //console.log(applied)
    for(let name in applied){
        if( name === "imprimirSearch"){
            mentors = imprimirSearch(mentors, applied[name] , id2)
        }
        if( name === "imprimirCardCategory"){
            mentors = imprimirCardCategory(mentors, applied[name], id2)
        }
    }
    return mentors
}


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
            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="${value}">${value}
        </div>
        `
}


function eventsCategory(data,id,id2){
    let checkbox = document.getElementById(id)
    let array = document.getElementById(id2)
    checkbox.addEventListener("change",(value => filters("imprimirCardCategory" , value.target.value, id2).forEach(value0 => imprimirCard(array,value0))))
}

function filterCategorys(info, x){
    return info.filter(element2 => x.includes(element2.category))  
}

function imprimirCardCategory(data, x, id2){
    let array = document.getElementById(id2)
    let arrayfiltrado
    array.className = ("d-flex flex-wrap justify-content-center gap-5")
    array.innerHTML = ""
    if(x.length !== 0){   
        if(id2 === "main"){
            arrayfiltrado = filterCategorys(data, x)            
        }
        if(id2 === "upcoming"){
            
            arrayfiltrado = filterCategorys(filterUpcoming(data), x)
        }
        if(id2 === "past"){    
            arrayfiltrado = filterCategorys(filterPast(data), x) 
        }
    }
    else{
        arrayfiltrado = elseFiltrado(data,id2)
    }
    return arrayfiltrado   
}

function filterUpcoming(data){
    return data.filter(value => (fecha < new Date(value.date)))
}
function filterPast(data){
    return data.filter(value => (fecha > new Date(value.date)))
}

function elseFiltrado(data, id2){
    let arrayfiltrado
    if(id2 === "main"){
        arrayfiltrado = data
    }
    if(id2 === "upcoming"){
        arrayfiltrado =   filterUpcoming(data)
    }
    if(id2 === "past"){
        arrayfiltrado = filterPast(data)
    }
    return arrayfiltrado
}
function eventSearch(data, id2, selector){
    let form = document.querySelector(selector)
    let card = document.getElementById(id2)
    form.addEventListener("submit", (events) => events.preventDefault() || filters("imprimirSearch" , events.target[0].value.toLowerCase(), id2).forEach(element101 => imprimirCard(card ,element101) ))
}

function filtrarSearch(info, stringEvent){
    return info.filter(element11 => element11.name.toLowerCase().includes(stringEvent) || element11.description.toLowerCase().includes(stringEvent))
}

function imprimirSearch(data, events, id2){
    let stringEvent = events.toLowerCase()
    let card = document.getElementById(id2)
    let arrayfiltrado
    card.innerHTML = ""
        if( stringEvent.length !== 0){
            
            if(id2 === "main"){
                arrayfiltrado = filtrarSearch(data, stringEvent)
            }
            if(id2 === "upcoming"){
                arrayfiltrado = filtrarSearch(filterUpcoming(data), stringEvent)
            }
            if(id2 === "past"){         
                arrayfiltrado = filtrarSearch(filterPast(data), stringEvent)
            }
        }
        else{
            arrayfiltrado = elseFiltrado(data,id2)
        }
        return arrayfiltrado
}

function details(data, id){
    let a = Number(location.search.slice(4))
    let card = document.getElementById(id)
    dataFiltrada = data.events.find(element => (element._id === a))
    imprimirDetails(dataFiltrada ,card)
}
function imprimirDetails(array,padre){
    padre.className = ("d-flex flex-wrap justify-content-center")
    padre.innerHTML = 
        `
        <div class="card text-center mb-5 mt-5 " style="width: 40%;">
            <img src="${array.image}" class="card-img-top" alt="${array.image}">
            <div class="card-body">
                    <p class="bg-primary bg-opacity-50">Name : ${array["name"]}</p> 

                    <p>Date : ${array.date}</p> 

                    <p class="bg-primary bg-opacity-50">Category : ${array.category}</p> 

                    <p>Description : ${array.description}</p> 

                    <p class="bg-primary bg-opacity-50">Place : ${array.place}</p> 

                    <p>Capacity : ${array.capacity}</p> 
                    
                    <p class="bg-primary bg-opacity-50">Price : ${array.price}$</p> 
            </div>
        </div>
        `  
}