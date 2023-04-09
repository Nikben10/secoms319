import React, { useState, useEffect } from "react";
import items from "./data.json";

const Shop = () => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [page, setPage] = useState(0);            // 0 : Browse, 1 : Cart, 2 : Confirmation

    let userInfo = {
        "fullName" : "Bill Fargot",
        "cardNumber" : "1234567890123456",
        "city" : "West Taiwan"
    }
    //need to check tags again

    const [searchString, setSearchString] = useState("");
    let itemsCopy = items;
    if (searchString.length > 0) {
        itemsCopy = items.filter((item) => {
            return item.name.toUpperCase().includes(searchString.toUpperCase()) ||
                    item.shortDescription.toUpperCase().includes(searchString.toUpperCase());
        });
    }
    // console.log(itemsCopy);
    const listItems = itemsCopy.map((el) => (
        <div className="row border-top border-bottom" key={el.id}>
            <div className="row main align-items-center">
                <div className="col-2">
                    <img className="img-fluid" src={require("./images/" + el.imageName)} />
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
        // let hmot = cart.filter((cartItem) => cartItem.id === id);
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
                    <img className="img-fluid" src={require("./images/" + el.imageName)} />
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

    if (page == 0) {
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
    } else if (page == 1) { //work here
        return (
            <div>
                <p>
                    Cart Page
                </p>
                <div>{cartItems}</div>
                <button type="button" variant="light" onClick={() => setPage(2)}> Buy </button>
                <button type="button" variant="light" onClick={() => setPage(0)}> Continue Shopping</button>
            </div>
        );
    } else {
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
                        <div>{cartItems}</div>
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

export default Shop;