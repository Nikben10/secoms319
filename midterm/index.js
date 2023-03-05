fetch('./data.json')
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        append_data(data);
    })
    .catch(function (err){
        console.log('error: ' + err);
    });

function append_data(objects){
    let div = document.getElementById("first");

    // console.log(objects["computers"]);
    for(let object of objects["computers"]) {
        let col = document.createElement("div");
        // console.log(object);
        col.classList.add("col");
        let card = document.createElement("div");
        card.classList.add("card_shadow-sm");
        let image = document.createElement('img');
        image.src = "./images/" + object["imageName"];
        let body = document.createElement("div");
        body.classList.add("card-body");
        body.innerHTML = `<h1>${object["name"]}</h1> <br> <p> ${object["shortDescription"]} </p>`;
        card.appendChild(image);
        card.appendChild(body);
        col.appendChild(card);
        div.appendChild(col);
    }
}