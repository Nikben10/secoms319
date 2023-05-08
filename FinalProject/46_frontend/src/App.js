import './App.css';
import React, { useState, useEffect } from "react";

var userInfo = {
  fullName : '',
  cardNumber : '',
  city : '',
  zip : '',
  state : '',
  email : '',
  updateUser : function(fullname, cardNumber, email){
      this.fullName = fullname;
      this.cardNumber = cardNumber;
      this.email = email;
  }
}

let lowQuantity = 'red';
let normQuantity = 'grey';
let editedList = [];
let numAvailable = 10;

function App() {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [page, setPage] = useState(0);            // 0 : Browse, 1 : Cart, 2 : Confirmation, 3: itemView , 5: credits
  const [oneProduct, setOneProduct] = useState([]);
  const [addNewProduct, setAddNewProduct] = useState({
    _id: 0,
    name: "",
    price: 0.0,
    category: "",
    shortdescription: "",
    longdescription: "",
    imagename: "http://127.0.0.1:4000/images/",
    alt: "",
    screensize: 0.0,
    quantity: 0,
  });

  const [searchString, setSearchString] = useState("");

  function getAllProducts() {
    fetch("http://localhost:4000/")
    .then((response) => response.json())
    .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        if (product != data) {

            setProduct(data);
        }
    });
  }

  let itemsCopy = product;


  if (searchString.length > 0) {
    itemsCopy = product.filter((item) => {
        return item.name.toUpperCase().includes(searchString.toUpperCase()) ||
                item.shortDescription.toUpperCase().includes(searchString.toUpperCase());
    });
  }

  const listItems = itemsCopy.map((el) => (
    <div className="row border-top border-bottom" key={el._id}>
        <div className="row main align-items-center">
            <div className="col-2">
                <img className="img-fluid" src={el.imageName} alt={el.alt} onClick={() => {setPage(3); getOneProduct(el._id);}}/>
            </div>
            <div className="col">
                <div className="row text-muted" onClick={() => {setPage(3); getOneProduct(el._id);}}>{el.name}</div>
                <div className="row">{el.shortDescription}</div>
            </div>
            <div className="col">
                <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
                <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
                <p style={{color: el.quantity > 5 ? normQuantity : lowQuantity}}>
                    Qty: {el.quantity}
                </p>
            </div>
            <div className="col">
                ${el.price} <span className="close">&#10005;</span>{howManyofThis(el)}
            </div>
        </div>
    </div>
    ));

  function howManyofThis(el) {
    // if (cart.includes(el)) {
    //     return el.cartQty;
    // } else {
    //     return 0;
    // }
    for (let arr of cart) {
        if (arr._id == el._id) {
            return arr.cartQty;
        }
    }
    return 0;
  }

  useEffect(() => {
    total();
    }, [cart]);

  const total = () => {
    let totalVal = 0.00;
    for (let i = 0; i < cart.length; i++) {
        totalVal += Number(cart[i].price) * cart[i].cartQty;
    }
    setCartTotal(totalVal.toFixed(2));
  };

  const addToCart = (el) => {
    let hardCopy = [...cart];
    // if (!hardCopy.includes(el) || el.cartQty < el.quantity) {
    //     if (hardCopy.includes(el)) {
    //         el.cartQty += 1;
    //     } else {
    //         el["cartQty"] = 1;
    //         hardCopy.push(el);
    //     }
    //     setCart(hardCopy);
    // } else {
        // let p = document.getElementById('quan' + el.quantity);
        // p
        // Was gonna make the quantity text flash ^
    // }
    for (let arr of hardCopy) {
        if (arr._id == el._id) {
            // Found a match in array
            arr.cartQty++;
            setCart(hardCopy);
            return;
        }
    }
    // Else
    // Did not find a match
    el["cartQty"] = 1;
    hardCopy.push(el);
    setCart(hardCopy);
  };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    // if (hardCopy.includes(el)) {
    //     el.cartQty -= 1;
    //     if (el.cartQty == 0) {
    //         hardCopy.splice(hardCopy.indexOf(el), 1);
    //     }
    // }
    for (let arr of hardCopy) {
        if (arr._id == el._id) {
            arr.cartQty--;
            if (arr.cartQty == 0) {
                hardCopy.splice(hardCopy.indexOf(arr), 1);
                break;
            }
        }
    }
    setCart(hardCopy);
  };

  function totalProducts() {
    let total = 0;
    for (let i of cart) {
        total += i.cartQty;
    }
    return total;
  }

  const showOneItem = oneProduct.map((el) => (
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className="mb-auto">
            <img className="img-fluid" src={el.imageName}></img>
        </header>
        <main className="px-3">
            <h1><b>{el.name}</b></h1>
                    <p>{el.longDescription}</p>
                    <p color="green">{el.price}</p>
        </main>

        <footer>
            <div><p>How many should we add to cart?</p></div>
            <div className="row g-0 text-center">
                <div className="col-sm-4 col-md-4">
                    <button type="button" variant="light" onClick={() => removeFromCart(el)}> - </button>
                </div>
                <div className="col-sm-4 col-md-4">
                    {howManyofThis(el)}
                </div>
                <div className="col-4 col-md-4">
                    <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
                </div>
            </div>
        </footer>
    </div>
  ));

  function getOneProduct(id) {
    console.log(id);
    if (id >= 1 && id <= 20) {
      fetch("http://localhost:4000/" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log("Show one product :", id);
        console.log(data);
        const dataArr = [];
        dataArr.push(data);
        setOneProduct(dataArr);
      });
    } else {
      console.log("Wrong number of Product id.");
      console.log('We sent %d', id);
      setOneProduct([]);
    }
  }

  const cartItems = cart.map((el) => (
    <div className="row border-top border-bottom" key={el._id}>
        <div className="row main align-items-center">
            <div className="col-2">
                <img className="img-fluid" src={el.imageName} />
            </div>
            <div className="col">
                <div className="row text-muted">{el.name}</div>
            </div>
            <div className="col">
                <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
            </div>
            <div className="col">
                ${el.price} <span className="close">&#10005;</span> {el.cartQty} = {(el.price * el.cartQty).toFixed(2)}
            </div>
        </div>
    </div>
));

const checkoutedItems = cart.map((el) => (
  <div className="row border-top border-bottom" key={el._id}>
      <div className="row main align-items-center">
          <div className="col-2">
              <img className="img-fluid" src={el.imageName} />
          </div>
          <div className="col">
              <div className="row text-muted">{el.name}</div>
          </div>
          <div className="col">
              ${el.price} <span className="close">&#10005;</span> {el.cartQty} = {(el.price * el.cartQty).toFixed(2)}
          </div>
      </div>
  </div>
));

function buyItems(cart) {
    cart.forEach(el => {
        let newQuantity = el.quantity - el.cartQty;
        if (newQuantity > 0) {
            // Update the quantity of the product
            console.log("Updating id : " + el._id + " to have quantity : " + newQuantity);
            fetch("http://localhost:4000/" + el._id + "/" + newQuantity, {
                method: "PUT"
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Updated quantity :");
                console.log(data);
                // if (product != data) {
                    // setProduct(data);
                // }
            });
        } else {
            // Delete the product
            fetch("http://localhost:4000/delete/", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: el._id }),
            })
            // fetch("http://localhost:4000/" + el._id + "/" + newQuantity)
            .then((response) => response.json())
            .then((data) => {
                console.log("Deleted prooduct : " + el._id);
                console.log(data);
                // if (product != data) {
                    // setProduct(data);
                // }
            });
        }
    });
}

const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
const form = document.getElementById('checkout-form');
const summaryCard = document.querySelector('.card');
const summaryList = document.querySelector('.card > ul');


let validate = function(){
  let val = true;
  let email = document.getElementById('inputEmail')
  let name = document.getElementById('inputName')
  let card = document.getElementById('inputCard')
  

  if (name.value.length == 0)
  {
  name.setAttribute("class","form-control is-invalid")
  val = false;
  }
  else{
  name.setAttribute("class", "form-control is-valid");
  userInfo.name = name.value;
  }
  if (!isNaN(card.value) || card.value.length < 16)
  {
  card.setAttribute("class","form-control is-invalid");
  val = false;
  }
  else{
  card.setAttribute("class", "form-control is-valid");
  userInfo.card = card.value;
  }
  if (!email.value.includes("@")){
    email.setAttribute("class", "form-control is-invalid");
    val = false;
  }
  else{
    email.setAttribute("class", "form-control is-valid");
    userInfo.email = email.value;
  }
  if (val){
      userInfo.updateUser(name.value, card.value, email.value);
  }
  if(val){
        buyItems(cart); 
      setPage(2);
  }
  else{
      setPage(1);
  }
}

const alert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      ` <div>${message}</div>`,
      ' <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
      ].join('')
  
      alertPlaceholder.append(wrapper);
}

function handleChange(evt) {
    const value = evt.target.value;
    document.getElementById("correctIt").hidden = true;
    document.getElementById("setIt").hidden = true;
    if (evt.target.name === "_id") {
        setAddNewProduct({ ...addNewProduct, _id: value});
        if (!editedList.includes("_id")) {
            editedList.push("_id");
        }
        if (value < 1) {
            document.getElementById("_id").setAttribute("class", "form-control is-invalid");
            return;
        }
        for (let prod of product) {
            if (prod._id == value) {
                document.getElementById("_id").setAttribute("class", "form-control is-invalid");
                return;
            }
        }
        document.getElementById("_id").setAttribute("class", "form-control is-valid");
        return;
    } else if (evt.target.name === "name") {
        setAddNewProduct({ ...addNewProduct, name: value});
        if (!editedList.includes("name")) {
            editedList.push("name");
        }
        if (value.length < 1) {
            document.getElementById("name").setAttribute("class", "form-control is-invalid");
            return;
        }
        document.getElementById("name").setAttribute("class", "form-control is-valid");
        return;
    } else if (evt.target.name === "price") {
        setAddNewProduct({ ...addNewProduct, price: value});
        if (!editedList.includes("price")) {
            editedList.push("price");
        }
        if (value < 0 || value.length == 0) {
            document.getElementById("price").setAttribute("class", "form-control is-invalid");
            return;
        }
        document.getElementById("price").setAttribute("class", "form-control is-valid");
        return;
    } else if (evt.target.name === "category") {
        setAddNewProduct({ ...addNewProduct, category: value});
        if (!editedList.includes("category")) {
            editedList.push("category");
        }
        if (value.length < 1) {
            document.getElementById("category").setAttribute("class", "form-control is-invalid");
            return;
        }
        document.getElementById("category").setAttribute("class", "form-control is-valid");
        return;
    } else if (evt.target.name === "shortDescription") {
        setAddNewProduct({ ...addNewProduct, shortdescription: value});
        if (!editedList.includes("shortDesc")) {
            editedList.push("shortDesc");
        }
        if (value.length < 1) {
            document.getElementById("shortDescription").setAttribute("class", "form-control is-invalid");
            return;
        }
        document.getElementById("shortDescription").setAttribute("class", "form-control is-valid");
        return;
    } else if (evt.target.name === "imageName") {
        setAddNewProduct({ ...addNewProduct, imagename: value});
        if (!editedList.includes("imageName")) {
            editedList.push("imageName");
        }
        document.getElementById("imageName").setAttribute("class", "form-control is-valid");
        return;
            // let image = new Image();
            // image.src = value;
            // if (image.complete) {
            //     document.getElementById("imageName").setAttribute("class", "form-control is-valid");
            //     return;
            // } else {
            //     image.onload = () => {
            //         document.getElementById("imageName").setAttribute("class", "form-control is-valid");
            //         return;
            //     }
            //     document.getElementById("imageName").setAttribute("class", "form-control is-invalid");
            //     return;
            // }
    } else if (evt.target.name === "longDescription") {
        setAddNewProduct({ ...addNewProduct, longdescription: value});
        if (!editedList.includes("longDesc")) {
            editedList.push("longDesc");
        }
        if (value.length < 1) {
            document.getElementById("longDescription").setAttribute("class", "form-control is-invalid");
            return;
        }
        document.getElementById("longDescription").setAttribute("class", "form-control is-valid");
        return;
    } else if (evt.target.name === "alt") {
        setAddNewProduct({ ...addNewProduct, alt: value});
        if (!editedList.includes("alt")) {
            editedList.push("alt");
        }
        if (value.length < 1) {
            document.getElementById("alt").setAttribute("class", "form-control is-invalid");
            return;
        }
        document.getElementById("alt").setAttribute("class", "form-control is-valid");
        return;
    } else if (evt.target.name === "screenSize") {
        setAddNewProduct({ ...addNewProduct, screensize: value});
        if (!editedList.includes("screenSize")) {
            editedList.push("screenSize");
        }
        if (value < -1 || value.length == 0) {
            document.getElementById("screenSize").setAttribute("class", "form-control is-invalid");
            return;
        }
        document.getElementById("screenSize").setAttribute("class", "form-control is-valid");
        return;
    } else if (evt.target.name === "quantity") {
        setAddNewProduct({ ...addNewProduct, quantity: value});
        if (!editedList.includes("quantity")) {
            editedList.push("quantity");
        }
        if (value < 1 || value.length == 0) {
            document.getElementById("quantity").setAttribute("class", "form-control is-invalid");
            return;
        }
        document.getElementById("quantity").setAttribute("class", "form-control is-valid");
        return;
    }
}

function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    if (editedList.length != numAvailable) {
        console.log("Enter more");
        document.getElementById("setIt").hidden = false;
        return;
    }
    let list = ["_id", "name", "price", "category", "shortDescription", "longDescription", "imageName", "alt", "screenSize", "quantity"];
    let correct = true;
    list.forEach(id => {
        let element = document.getElementById(id);
        if (!element.classList.contains("is-valid")) {
            console.log("correct more");
            document.getElementById("correctIt").hidden = false;
            correct = false;
            return;
        }
    });
    if (correct) {
    fetch("http://localhost:4000/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addNewProduct),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Post a new product completed");
        console.log(data);
        if (data) {
            getAllProducts();
            editedList = [];
            setAddNewProduct({
                _id: 0,
                name: "",
                price: 0.0,
                category: "",
                shortdescription: "",
                longdescription: "",
                imagename: "http://127.0.0.1:4000/images/",
                alt: "",
                screensize: 0.0,
                quantity: 0,
              });
            document.getElementById("createForm").reset();
            setPage(0);
        }
    });
}
}


if (page == 0) {
    if(product.length < 1){
        getAllProducts();
    }
  return (
  <div>
    <div className="row">
        <div className="col"><b>Computer Store Inventory</b></div>
        <div className="col"></div>
        <div className="col">
            <b onClick={() => setPage(5)}>About us!</b>
        </div>
    </div>
      <div className="card">
          <div className="row">
          {/* HERE, IT IS THE SHOPING CART */}
              <div className="col-md-8 cart">
                  <div className="title">
                      <div className="row">
                          <div className="col">
                              <input onChange={(e) => {
                                  setSearchString(e.target.value);
                                  }} placeholder="Search">
                              </input>
                          </div>
                          <div className="col align-self-center text-right text-muted">
                              Products selected {totalProducts()}
                          </div>
                            <button type="button" variant="light" onClick={() => setPage(4)}>Create New Product</button>
                      </div>
                  </div>
                  <div>{listItems}</div>
              </div>
              <div className ="float-end">
                  <p className ="mb-0 me-5 d-flex align-items-center">
                      <span className ="small text-muted me-2">Order total:</span>
                      <span className ="lead fw-normal">${cartTotal}</span>
                      <button type="button" variant="light" onClick={() => setPage(1)}> View Cart </button>
                  </p>
              </div>
          </div>
      </div>
  </div>
  );
}else if (page == 1) {
  return (
      <div>
          <p>
              Cart Page
          </p>
          <div>{cartItems}</div>
          <hr></hr>
          <div id="liveAlertPlaceholder"></div>
          <form className="row g-3" id="checkout-form">
              <div className="col-md-6">
                  <label htmlFor="inputName" className="form-label">Full Name*</label>
                  <input type="text" className="form-control" id="inputName"></input>
                  <div className="valid-feedback">
                      Looks good!
                  </div>
                  <div className="invalid-feedback">
                      Must be like, "John Doe"
                  </div>
              </div>

              <div className="col-md-6">
                  <label htmlFor="inputEmail" className="form-label">Email*</label>
                  <input type="email" className="form-control" id="inputEmail"></input>
                  <div className="valid-feedback">
                      Looks good!
                  </div>
                  <div className="invalid-feedback">
                      Must be like, "abc@xyz.efg"
                  </div>
              </div>

              <div className="col-12">
                  <label htmlFor="inputCard" className="form-label">Card*</label>
                  <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1"><i className="bi-credit-card-fill"></i></span>
                      <input type="text" id="inputCard" className="form-control" placeholder="XXXX-XXXX-XXXX-XXXX" aria-label="Username" aria-describedby="basic-addon1"></input>
                      <div className="invalid-feedback">
                      Must be like, "7777-7777-7777-7777"
                      </div>
                  </div>
              </div>

              <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label">Address</label>
                  <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"></input>
              </div>
              <div className="col-12">
                  <label htmlFor="inputAddress2" className="form-label">Address 2</label>
                  <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"></input>
              </div>
              <div className="col-md-6">
                  <label htmlFor="inputCity" className="form-label">City</label>
                  <input type="text" className="form-control" id="inputCity"></input>
              </div>
              <div className="col-md-4">
                  <label htmlFor="inputState" className="form-label">State</label>
                  <input type="text" className="form-control" id="inputCity"></input>
              </div>
              <div className="col-md-2">
                  <label htmlFor="inputZip" className="form-label">Zip</label>
                  <input type="text" className="form-control" id="inputZip"></input>
              </div>
          </form>
          <hr></hr>
          <button type="button" variant="light" onClick={() => validate()}> Buy </button>
          <button type="button" variant="light" onClick={() => setPage(0)}> Continue Shopping</button>
      </div>
  );
}else if (page == 2){
  return (
  <div>
      Order Confirmation
      <div className="card">
          <div className="row">
              <div className="col-md-8 cart">
                  <div className="title">
                      {/* <div className="row"> */}
                          <div className="col">
                              Thank you {userInfo.fullName} for your order using the card ending in {userInfo.cardNumber.slice(-4)}!<br />
                              We'll get that shipped to {userInfo.city != '' ? userInfo.city : "you"} right away!
                          </div>
                          <div className="col align-self-center text-right text-muted">
                              Products Ordered: {cart.length}
                          </div>
                      {/* </div> */}
                  </div>
                  <div>{checkoutedItems}</div>
              </div>
              <div className ="float-end">
                  <p className ="mb-0 me-5 d-flex align-items-center">
                      <span className ="small text-muted me-2">Order total:</span>
                      <span className ="lead fw-normal">${cartTotal}</span> 
                      <button type="button" variant="light" onClick={() => {setCart([]); getAllProducts(); setPage(0)}}> Keep Browsing </button>
                  </p>
              </div>
          </div>
      </div>
  </div>
  );
} else if (page == 3) {
    return(
        <div className="d-flex h-200 text-center text-bg-dark">
            <div>{showOneItem}</div>
            <button type="button" variant="light" className="d-flex h-100 text-right" onClick={() => {setPage(0)}}>Keep Browsing</button>
        </div>
    )
} else if (page == 4) {
    return (
        <div>
          <h3>Add a new product :</h3>
          <form id="createForm">
            <div className='form-group row'>
                <label className='col-sm-2 col-form-label createLabel'>ID</label>
                <div className='col-sm-2'>
                    <input type="number" placeholder="id" className='form-control' id="_id" name="_id" value={addNewProduct._id} onChange={handleChange} />
                </div>
            </div>
            <div className='form-group row'>
                <label className='col-sm-2 col-form-label createLabel'>Name</label>
                <div className='col-sm-2'>
                    <input type="text" placeholder="name" className='form-control' id="name" name="name" value={addNewProduct.name} onChange={handleChange} />
                </div>
            </div>
            <div className='form-group row'>
                <label className='col-sm-2 col-form-label createLabel'>Price</label>
                <div className='col-sm-2'>
                    <input type="number" placeholder="price" className='form-control' id="price" name="price" value={addNewProduct.price} onChange={handleChange} />
                </div>
            </div>
            <div className='form-group row'>
                <label className='col-sm-2 col-form-label createLabel'>Category</label>
                <div className='col-sm-2'>
                    <input type="text" placeholder="category" className='form-control' id="category" name="category" value={addNewProduct.category} onChange={handleChange} />
                </div>
            </div>
            <div className='form-group row'>
                <label className='col-sm-2 col-form-label createLabel'>Short Description</label>
                <div className='col-sm-2'>
                    <input type="text" placeholder="Short Description" className='form-control' id="shortDescription" name="shortDescription" value={addNewProduct.shortdescription} onChange={handleChange} />
                </div>
            </div>
            <div className='form-group row'>
                <label className='col-sm-2 col-form-label createLabel'>Long Description</label>
                <div className='col-sm-2'>
                    <input type="text" placeholder="Long description" className='form-control' id="longDescription" name="longDescription" value={addNewProduct.longdescription} onChange={handleChange} />
                </div>
            </div>
            <div className='form-group row'>
                <label className='col-sm-2 col-form-label createLabel'>Image Name (and path)</label>
                <div className='col-sm-2'>
                    <input type="text" placeholder="image name" className='form-control' id="imageName" name="imageName" value={addNewProduct.imagename} onChange={handleChange} />
                </div>
            </div>
            <div className='form-group row'>
                <label className='col-sm-2 col-form-label createLabel'>Alt Text</label>
                <div className='col-sm-2'>
                    <input type="text" placeholder="alt text" className='form-control' id="alt" name="alt" value={addNewProduct.alt} onChange={handleChange} />
                </div>
            </div>
            <div className='form-group row'>
                <label className='col-sm-2 col-form-label createLabel'>Screen Size (-1 for desktop)</label>
                <div className='col-sm-2'>
                    <input type="number" placeholder="screen size" className='form-control' id="screenSize" name="screenSize" value={addNewProduct.screensize} onChange={handleChange} />
                </div>
            </div>
            <div className='form-group row'>
                <label className='col-sm-2 col-form-label createLabel'>quantity</label>
                <div className='col-sm-2'>
                    <input type="number" placeholder="quantity" className='form-control' id="quantity" name="quantity" value={addNewProduct.quantity} onChange={handleChange} />
                </div>
            </div>
            <div>
              <button type="submit" onClick={handleOnSubmit}>
                  Submit
              </button>
              <button onClick={() => {setPage(0); editedList = []}}>
                  Cancel
              </button>
              <p id="correctIt" style={{color: 'red'}} hidden>
                Please correct the required inputs.
              </p>
              <p id="setIt" style={{color: 'red'}} hidden>
                Please set all the inputs.
              </p>
            </div>
          </form>
        </div>
    )
} else{
    return(
        <div className="container text-center">
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <h2>SE/ComS319 Construction of User Interfaces, Spring 2023</h2>
                </div>
                <div className="col">
                    <button type="button" variant="light" onClick={() => {setPage(0)}}>Back to Shopping!</button>
                </div>
            </div>
            <div className="row">
                <p>Date: 5/4/2023</p>
            </div>
            <hr></hr>
            <div className="row"><h3>Authors:</h3></div>
            <div className="row"> 
                <div className="col">
                    <h2><b>Benjamin Niklasen</b></h2>
                </div>
                <div className="col">
                    <h2>bjn1@iastate.edu</h2>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h2><b>Kyle Clements</b></h2>
                </div>
                <div className="col">
                    <h2>kyle0324@iastate.edu</h2>
                </div>
            </div>
            <div className="row"> <hr></hr></div>
            <div className="row">
                <h3>Proffessor: </h3>
            </div>
            <div className="row">
                <div className="col">
                    <h2>Dr. Abraham N. Aldaco Gastelum</h2>
                </div>
                <div className="col">
                    <h2>aaldaco@iastate.edu</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                <p>Thank you for viewing our product!</p>
            </div>
        </div>
    )
}
}

export default App;
