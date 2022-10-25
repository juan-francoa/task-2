function imprimirCard(padre, value){
    padre.innerHTML += 
        `
        <div class="card" style="width: 18rem;">
            <img src="${value["image"]}" class="card-img-top" alt="${value["name"]}">
            <div class="card-body">
                <h5 class="card-title">${value["name"]}</h5>
                <p class="card-text">${value["description"]}</p>
                <a href="details.html?id=${value.id}" class="btn btn-primary">Details</a>
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
    let fecha = new Date(data.date)
    data.events.forEach(value => (fecha < new Date(value.date) && imprimirCard(container,value)))
}

//past
function cardpast(data) {
    let container = document.getElementById("past")
    container.className = ("d-flex flex-wrap justify-content-center gap-5")
    let fecha = new Date(data.date)
    data.events.forEach(value => (fecha > new Date(value.date) && imprimirCard(container,value)))
}
async function api(check, id2 , form){
    try{
        let a = await fetch("https://mh-amazing.herokuapp.com/amazing")
    a =  await a.json()
    let fecha = new Date(a.date)
    if(id2==="main"){
        cardMain(a)
    }
    if(id2==="upcoming"){
        cardUpcoming(a)
    }
    if(id2==="past"){
        cardpast(a)
    }
    categorysCheckbox(a, check)
    eventsCategory(a, check, id2, fecha)
    eventSearch(a, id2 , form, fecha)

    }
    catch(error){
        console.log(error)
    }
}

async function api2(id){
    try{
        let c = location.search.slice(4)
        let card = document.getElementById(id)
        let a = await fetch("https://mh-amazing.herokuapp.com/amazing/"+c)
        a =  await a.json()
        imprimirDetails(a ,card)

    }
    catch(error){
        console.log("error inesperado")
    }
}
let xs = document.getElementById("main")
if(xs){
    api("checkbox-index", "main" , "form")
}

let up = document.getElementById("upcoming")
if(up){
    
    api("checkbox-upcoming", "upcoming", "form")
    
}

let pas = document.getElementById("past")
if(pas){
    api("checkbox-past", "past", "form")
}

let deta = document.getElementById("details")
if(deta){
    api2("details")
}



let arrayCat = []

let applied ={
}

function filters (fn, value, id2, data, fecha){
    let arrayBusqueda = data.events
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
            arrayBusqueda = imprimirSearch(arrayBusqueda, applied[name] , id2 , fecha)
        }
        if( name === "imprimirCardCategory"){
            arrayBusqueda = imprimirCardCategory(arrayBusqueda, applied[name], id2, fecha)
        }
    }
    return arrayBusqueda
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


function eventsCategory(data, id, id2 , fecha){
    let checkbox = document.getElementById(id)
    let array = document.getElementById(id2)
    checkbox.addEventListener("change",(value => filters("imprimirCardCategory" , value.target.value, id2, data, fecha).forEach(value0 => imprimirCard(array,value0))))
}

function filterCategorys(info, x){
    return info.filter(element2 => x.includes(element2.category))  
}

function imprimirCardCategory(data, x, id2, fecha){
    let array = document.getElementById(id2)
    let arrayfiltrado
    array.className = ("d-flex flex-wrap justify-content-center gap-5")
    array.innerHTML = ""
    if(x.length !== 0){   
        if(id2 === "main"){
            arrayfiltrado = filterCategorys(data, x)            
        }
        if(id2 === "upcoming"){
            
            arrayfiltrado = filterCategorys(filterUpcoming(data, fecha), x)
        }
        if(id2 === "past"){    
            arrayfiltrado = filterCategorys(filterPast(data, fecha), x) 
        }
    }
    else{
        arrayfiltrado = elseFiltrado(data, id2, fecha)
    }
    return arrayfiltrado   
}

function filterUpcoming(data, fecha){
    return data.filter(value => (fecha < new Date(value.date)))
}
function filterPast(data, fecha){
    return data.filter(value => (fecha > new Date(value.date)))
}

function elseFiltrado(data, id2, fecha){
    let arrayfiltrado
    if(id2 === "main"){
        arrayfiltrado = data
    }
    if(id2 === "upcoming"){
        arrayfiltrado =   filterUpcoming(data, fecha)
    }
    if(id2 === "past"){
        arrayfiltrado = filterPast(data, fecha)
    }
    return arrayfiltrado
}
function eventSearch(data, id2, selector, fecha){
    let form = document.querySelector(selector)
    let card = document.getElementById(id2)
    form.addEventListener("submit", (events) => events.preventDefault() || filters("imprimirSearch" , events.target[0].value.toLowerCase(), id2, data, fecha).forEach(element101 => imprimirCard(card ,element101) ))
}

function filtrarSearch(info, stringEvent){
    return info.filter(element11 => element11.name.toLowerCase().includes(stringEvent) || element11.description.toLowerCase().includes(stringEvent))
}

function imprimirSearch(data, events, id2, fecha){
    let stringEvent = events.toLowerCase()
    let card = document.getElementById(id2)
    let arrayfiltrado
    card.innerHTML = ""
        if( stringEvent.length !== 0){
            
            if(id2 === "main"){
                arrayfiltrado = filtrarSearch(data, stringEvent)
            }
            if(id2 === "upcoming"){
                arrayfiltrado = filtrarSearch(filterUpcoming(data, fecha), stringEvent)
            }
            if(id2 === "past"){         
                arrayfiltrado = filtrarSearch(filterPast(data, fecha), stringEvent)
            }
        }
        else{
            arrayfiltrado = elseFiltrado(data,id2, fecha)
        }
        return arrayfiltrado
}


function imprimirDetails(array,padre){
    padre.className = ("d-flex flex-wrap justify-content-center")
    let date = array.event.date.slice(0,-14)
    let assistance
    let assistanceOrEstimate 
    if(array.event.assistance){
        assistance = array.event.assistance 
        assistanceOrEstimate = "Assistance"
    }
    else{
        assistance =  array.event.estimate
        assistanceOrEstimate =  "Estimate"
    }
    
    padre.innerHTML = 
        `
        <div class="card text-center mb-5 mt-5 " style="width: 40%;">
            <img src="${array.event.image}" class="card-img-top" alt="${array.event.image}">
            <div class="card-body">
                    <p class="bg-primary bg-opacity-50">Name : ${array.event.name}</p> 

                    <p>Date : ${date}</p> 

                    <p class="bg-primary bg-opacity-50">Category : ${array.event.category}</p> 

                    <p>Description : ${array.event.description}</p> 

                    <p class="bg-primary bg-opacity-50">Place : ${array.event.place}</p> 

                    <p> Capacity: ${array.event.capacity}</p> 

                    <p class="bg-primary bg-opacity-50">${assistanceOrEstimate} : ${assistance}</p>
                    
                    <p>Price : ${array.event.price}$</p> 
            </div>
        </div>
        `  
}
async function table(id){
    try{
        let card = document.getElementById(id)
        let a = await fetch("https://mh-amazing.herokuapp.com/amazing?time=past")
        let copiaDeA =  await a.json()
        a = copiaDeA.events.sort((a, b)=> ((Number(b.assistance)/Number(b.capacity)) - (Number(a.assistance)/Number(a.capacity))))
        let  b = a.slice(0,1)
        b.forEach(value => imprimirContenidoTableHighPorc(value, card))
        let c = a.slice(-1)
        c.forEach(value => imprimirContenidoTableHighPorc(value, card))
        copiaDeA = copiaDeA.events.sort((a, b)=> Number(b.capacity) - Number(a.capacity)).slice(0,1)
        copiaDeA.forEach(value => imprimirContenidoTableHighPorc(value, card))
    }
    catch(error){
        console.log(error)
    }
}
function imprimirContenidoTableHighPorc(value, padre ){
    let porcent = value.assistance/value.capacity*100
    porcent = parseFloat(porcent).toFixed(2)
    padre.innerHTML += 
        `
        <td>
            <a class="btn btn-primary d-flex" href="details.html?id=${value.id}" role="button">${value.name}: ${porcent}% </a>
        </td>

        `  
}
async function table1(id, url, estimate){
    try{
        let a = await fetch(url)
        let copiaDeA =  await a.json()
        copiaDeA = copiaDeA.events.sort(function(a,b){
            if (a.category < b.category) {
                return -1;
              }
              if (a.category > b.category) {
                return 1;
              }
              return 0;
        })
        let listCategoys = copiaDeA.map(value => value.category)
        listCategoys =   [... new Set(listCategoys)].sort()
        let arrayTableRevenues = {}
        let arrayTableAttendance = {}
        listCategoys.forEach(value => arrayTableRevenues[value] = 0)
        listCategoys.forEach(value => arrayTableAttendance[value] = 0)
      
        copiaDeA.forEach(function (a, b, c){
            if((b+1) <= c.length){
                if(arrayTableRevenues[a.category] === 0){
                    arrayTableRevenues[a.category] = a[estimate]*a.price
                }
                else{
                    arrayTableRevenues[a.category] += a[estimate]*a.price
                }
                
            }
        })
        
        let e = 1
        copiaDeA.forEach(function (a, b, c){
            if((b+1) <= c.length){
                if(arrayTableAttendance[a.category] === 0){
                    arrayTableAttendance[a.category] = a[estimate]/a.capacity*100
                    if(b !== 0){
                        arrayTableAttendance[c[b-1].category] /= e
                        e = 1

                    }
                }
                else{
                    e++
                    arrayTableAttendance[a.category] += a[estimate]/a.capacity*100
                    if(b+1 === c.length){
                        arrayTableAttendance[c[b-1].category] /= e
                    }
                }
            }
        })
        imprimirCategorysTable(id, arrayTableRevenues, arrayTableAttendance)
    }
    catch(error){
        console.log(error)
    }
}
let det = document.getElementById("highest-percentage")
if(det){
    table("highest-percentage")
    table1("table2", "https://mh-amazing.herokuapp.com/amazing?time=upcoming", "estimate")
    table1("table3","https://mh-amazing.herokuapp.com/amazing?time=past", "assistance")
}
function imprimirCategorysTable(id, arrayTableRevenues, arrayTableAttendance){
    let card = document.getElementById(id)
    for(let value in arrayTableRevenues){
        let porcent = arrayTableAttendance[value]
        if(arrayTableAttendance[value]%2 !== 0){
             porcent = parseFloat(arrayTableAttendance[value]).toFixed(2)
        }

        card.innerHTML +=  
        `
         <tr>
            <td class="text-center">${value}</td>
            <td class="text-center">${arrayTableRevenues[value]}$</td>
            <td class="text-center">${porcent}%</td>
         </tr>
        ` 
    }
}