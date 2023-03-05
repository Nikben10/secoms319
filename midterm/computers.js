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
        if (object["screenSize"] != "") {
            col.innerHTML = `
                <div class="card shadow-sm">
                    <img src=${"./images/" + object["imageName"]} alt=${object["alt"]}> 
                    <div class="card-body">
                        <h1 class="product_name">${object["name"]}</h1>
                        <p class="card-text">${object["shortDescription"]}</p>
                        <p class="screen_size">${object["screenSize"]} inch</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="price">$${object["price"]}</p> 
                        </div>
                    </div>
                </div>
            `;
        } else {
            col.innerHTML = `
                <div class="card shadow-sm">
                    <img src=${"./images/" + object["imageName"]} alt=${object["alt"]}> 
                    <div class="card-body">
                        <h1 class="product_name">${object["name"]}</h1>
                        <p class="card-text">${object["shortDescription"]}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="price">$${object["price"]}</p> 
                        </div>
                    </div>
                </div>
            `;
        }
        div.appendChild(col);
    }
}