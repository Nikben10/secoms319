import React, { useState, useEffect } from "react";




const Shop = () => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    //need to check tags
    const listItems = items.map((el) => (
        <div key={el.id}>
            <img class=
            "img-fluid" src={el.image} />
            {el.title}
            {el.category}
            {el.price}
            <button type="button" onClick={() => removeFromCart(el)}>-</button>{" "}
            <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
        </div>
        ));
    
    useEffect(() => {
        total();
        }, [cart]);
    
    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++) {
        totalVal += cart[i].price;
        }
        setCartTotal(totalVal);
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
            <img class=
            "img-fluid" src={el.image} width={30} />
            {el.title}
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