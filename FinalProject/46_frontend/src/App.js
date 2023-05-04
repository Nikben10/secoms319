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

function App() {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [page, setPage] = useState(0);            // 0 : Browse, 1 : Cart, 2 : Confirmation

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
        return product.name.toUpperCase().includes(searchString.toUpperCase()) ||
                product.shortDescription.toUpperCase().includes(searchString.toUpperCase());
    });
  }

  const listItems = itemsCopy.map((el) => (
    <div className="row border-top border-bottom" key={el.id}>
        <div className="row main align-items-center">
            <div className="col-2">
                <img className="img-fluid" src={el.imageName} alt={el.alt}/>
            </div>
            <div className="col">
                <div className="row text-muted">{el.name}</div>
                <div className="row">{el.shortDescription}</div>
            </div>
            <div className="col">
                <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
                <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
            </div>
            <div className="col">
                ${el.price} <span className="close">&#10005;</span>{howManyofThis(el)}
            </div>
        </div>
    </div>
    ));

  function howManyofThis(el) {
    if (cart.includes(el)) {
        return el.quantity;
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
        totalVal += Number(cart[i].price) * cart[i].quantity;
    }
    setCartTotal(totalVal.toFixed(2));
  };

  const addToCart = (el) => {
    let hardCopy = [...cart];
    if (hardCopy.includes(el)) {
        el.quantity += 1;
    } else {
        el["quantity"] = 1;
        hardCopy.push(el);
    }
    setCart(hardCopy);
  };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    if (hardCopy.includes(el)) {
        el.quantity -= 1;
        if (el.quantity == 0) {
            hardCopy.splice(hardCopy.indexOf(el), 1);
        }
    }
    setCart(hardCopy);
  };

  function totalProducts() {
    let total = 0;
    for (let i of cart) {
        total += i.quantity;
    }
    return total;
  }

  const cartItems = cart.map((el) => (
    <div className="row border-top border-bottom" key={el.id}>
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
                ${el.price} <span className="close">&#10005;</span> {el.quantity} = {(el.price * el.quantity).toFixed(2)}
            </div>
        </div>
    </div>
));

const checkoutedItems = cart.map((el) => (
  <div className="row border-top border-bottom" key={el.id}>
      <div className="row main align-items-center">
          <div className="col-2">
              <img className="img-fluid" src={el.imageName} />
          </div>
          <div className="col">
              <div className="row text-muted">{el.name}</div>
          </div>
          <div className="col">
              ${el.price} <span className="close">&#10005;</span> {el.quantity} = {(el.price * el.quantity).toFixed(2)}
          </div>
      </div>
  </div>
));

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
  getAllProducts();
  return (
  <div>
      Computer Store Inventory
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
          <form class="row g-3" id="checkout-form">
              <div class="col-md-6">
                  <label for="inputName" class="form-label">Full Name</label>
                  <input type="text" class="form-control" id="inputName"></input>
                  <div class="valid-feedback">
                      Looks good!
                  </div>
                  <div class="invalid-feedback">
                      Must be like, "John Doe"
                  </div>
              </div>

              <div class="col-md-6">
                  <label for="inputEmail4" class="form-label">Email</label>
                  <input type="email" class="form-control" id="inputEmail4"></input>
                  <div class="invalid-feedback">
                      Must be like, "abc@xyz.efg"
                  </div>
              </div>

              <div class="col-12">
                  <label for="inputCard" class="form-label">Card</label>
                  <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1"><i class="bi-credit-card-fill"></i></span>
                      <input type="text" id="inputCard" class="form-control" placeholder="XXXX-XXXX-XXXX-XXXX" aria-label="Username" aria-describedby="basic-addon1"></input>
                      <div class="invalid-feedback">
                      Must be like, "7777-7777-7777-7777"
                      </div>
                  </div>
              </div>

              <div class="col-12">
                  <label for="inputAddress" class="form-label">Address</label>
                  <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"></input>
              </div>
              <div class="col-12">
                  <label for="inputAddress2" class="form-label">Address 2</label>
                  <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"></input>
              </div>
              <div class="col-md-6">
                  <label for="inputCity" class="form-label">City</label>
                  <input type="text" class="form-control" id="inputCity"></input>
              </div>
              <div class="col-md-4">
                  <label for="inputState" class="form-label">State</label>
                  <input type="text" class="form-control" id="inputCity"></input>
              </div>
              <div class="col-md-2">
                  <label for="inputZip" class="form-label">Zip</label>
                  <input type="text" class="form-control" id="inputZip"></input>
              </div>
          </form>
          <hr></hr>
          <button type="button" variant="light" onClick={() => validate()}> Buy </button>
          <button type="button" variant="light" onClick={() => setPage(0)}> Continue Shopping</button>
      </div>
  );
}else {
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
                      <button type="button" variant="light" onClick={() => {setCart([]); setPage(0)}}> Keep Browsing </button>
                  </p>
              </div>
          </div>
      </div>
  </div>
  );
}
}

export default App;
