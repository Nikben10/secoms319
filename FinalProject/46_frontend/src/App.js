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

function App() {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [page, setPage] = useState(0);            // 0 : Browse, 1 : Cart, 2 : Confirmation, 3: itemView , 5: credits
  const [oneProduct, setOneProduct] = useState([]);

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

  let itemsCopy = product; //need to fix items

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
                <div className="row text-muted" onClick={() => {setPage(4); getOneProduct(el._id);}}>{el.name}</div>
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
    if (cart.includes(el)) {
        return el.cartQty;
    } else {
        return 0;
    }
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
    if (!hardCopy.includes(el) || el.cartQty < el.quantity) {
        if (hardCopy.includes(el)) {
            el.cartQty += 1;
        } else {
            el["cartQty"] = 1;
            hardCopy.push(el);
        }
        setCart(hardCopy);
    } else {
        // let p = document.getElementById('quan' + el.quantity);
        // p
        // Was gonna make the quantity text flash ^
    }
  };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    if (hardCopy.includes(el)) {
        el.cartQty -= 1;
        if (el.cartQty == 0) {
            hardCopy.splice(hardCopy.indexOf(el), 1);
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

        <footer className="mt-auto text-white-50">
            <div className="bs-light-text-emphasis">How many should we add to cart?</div>
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
  let email = document.getElementById('inputEmail4')
  let name = document.getElementById('inputName')
  let card = document.getElementById('inputCard')
  

  email.setAttribute("class", "form-control is-valid");
  userInfo.email = email.value;
  if (name.value.length == 0)
  {
  name.setAttribute("class","form-control is-invalid")
  val = false;
  }
  else{
  name.setAttribute("class", "form-control is-valid");
  userInfo.name = name.value;
  }
  if (!isNaN(card.value))
  {
  card.setAttribute("class","form-control is-invalid");
  val = false;
  }
  else{
  card.setAttribute("class", "form-control is-valid");
  userInfo.card = card.value;
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




if (page == 0) {
    if(product.length < 1){
        getAllProducts();
    }
  return (
  <div>
    <div className="mb-0 me-5 d-flex align-items-center">
        <b>Computer Store Inventory</b>
        <div className="mb-0 me-5 d-flex align-items-center">
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
                  <label htmlFor="inputName" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="inputName"></input>
                  <div className="valid-feedback">
                      Looks good!
                  </div>
                  <div className="invalid-feedback">
                      Must be like, "John Doe"
                  </div>
              </div>

              <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">Email</label>
                  <input type="email" className="form-control" id="inputEmail4"></input>
                  <div className="invalid-feedback">
                      Must be like, "abc@xyz.efg"
                  </div>
              </div>

              <div className="col-12">
                  <label htmlFor="inputCard" className="form-label">Card</label>
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
                              We'll get that shipped to {userInfo.city} right away!
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
                      <button type="button" variant="light" onClick={() => {getAllProducts(); setCart([]); setPage(0)}}> Keep Browsing </button>
                  </p>
              </div>
          </div>
      </div>
  </div>
  );
} else if(page == 3){
    return(
        <div className="d-flex h-200 text-center text-bg-dark">
            <div>{showOneItem}</div>
            <button type="button" variant="light" className="d-flex h-100 text-right" onClick={() => {setPage(0)}}>Keep Browsing</button>
        </div>
    )
} 






else{
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
