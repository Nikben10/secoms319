let objects = JSON.parse("./data.json");

function append_data(objects){
    let div = document.getElementById("container");

    for(let object in objects){
        let col = document.createElement(div);
        console.log(object);
        col.classList.add("col");
        let card = document.createElement(div);
        card.classList.add("card shadow-sm");
        let image = document.createElement(img);
        image.src = object["imageName"];
        let body = document.createElement(div);
        body.classList.add("card-body");
        body.innerHTML = `<p> description here </p>`;
        card.appendChild(image);
        card.appendChild(body);
        col.appendChild(card);
    }
}