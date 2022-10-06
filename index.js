function cardMain(data) {
    let conteMain = document.getElementById("main")
    conteMain.className +=(" d-flex flex-wrap justify-content-center gap-5")
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
        conteMain.appendChild(div)   
    }
}
cardMain(data)