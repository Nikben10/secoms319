import React, { useState, useEffect } from "react";
import items from "./data.json";



const Shop = () => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    //need to check tags again
    const listItems = items.map((el) => (
        <div key={el.id}>
            <img className="img-fluid" src={require("./images/" + el.imageName)} />
            {el.name}
            {el.shortDescription}
            {el.price}
            <button type="button" onClick={() => removeFromCart(el)}>-</button>{" "}
            <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
            {el.imageName}
        </div>
        ));
    
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
        hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
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
    <div>
        <div> {listItems} </div>
        <div>items in cart: </div>
        <div>{cartItems}</div>
        <div>Order total to pay :{cartTotal}</div>
    </div>
    );
}

export default Shop;