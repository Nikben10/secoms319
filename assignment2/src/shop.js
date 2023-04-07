import React, { useState, useEffect } from "react";
import items from "./data.json";



const Shop = () => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    //need to check tags again
    const listItems = items.map((el) => (
        // <div key={el.id}>
        //     <img className="img-fluid" src={require("./images/" + el.imageName)} />
        //     {el.name}
        //     {el.shortDescription}
        //     {el.price}
        //     <button type="button" onClick={() => removeFromCart(el)}>-</button>{" "}
        //     <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
        // </div>
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
                    ${el.price} <span className="close">&#10005;</span>{howManyofThis(el.id)}
                </div>
            </div>
        </div>
        ));

    function howManyofThis(id) {
        let hmot = cart.filter((cartItem) => cartItem.id === id);
        return hmot.length;
        }
    
    useEffect(() => {
        total();
        }, [cart]);
    
    const total = () => {
        let totalVal = 0.00;
        for (let i = 0; i < cart.length; i++) {
        totalVal += Number(cart[i].price);
        }
        setCartTotal(totalVal.toFixed(2));
        };

    const addToCart = (el) => {
        setCart([...cart, el]);
        };

    const removeFromCart = (el) => {
        let hardCopy = [...cart];
        let foundFirst = false;
        hardCopy = hardCopy.filter((cartItem) => {
            if (cartItem.id !== el.id || foundFirst) {
                return true;
            } else {
                foundFirst = true;
                return false;
            }
        });
        setCart(hardCopy);
        };

    const cartItems = cart.map((el) => (
        <div key={el.id}>
            <img class="img-fluid" src={require("./images/" + el.imageName)} width={30} />
            {el.name}
            ${el.price}
        </div>
        ));





    return (
    // <div>
    //     <div> {listItems} </div>
    //     <div>items in cart: </div>
    //     <div>{cartItems}</div>
    //     <div>Order total to pay :{cartTotal}</div>
    // </div>
    <div>
        Computer Store
        <div className="card">
            <div className="row">
            {/* HERE, IT IS THE SHOPING CART */}
                <div className="col-md-8 cart">
                    <div className="title">
                        <div className="row">
                            <div className="col">
                                <h4>
                                    <b>Your Shopping Cart</b>
                                </h4>
                            </div>
                            <div className="col align-self-center text-right text-muted">
                                Products selected {cart.length}
                            </div>
                        </div>
                    </div>
                    <div>{listItems}</div>
                </div>
                <div className ="float-end">
                    <p className ="mb-0 me-5 d-flex align-items-center">
                        <span className ="small text-muted me-2">Order total:</span>
                        <span className ="lead fw-normal">${cartTotal}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Shop;