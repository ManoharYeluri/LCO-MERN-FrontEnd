import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/carthelper"

const Cart = () => {

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart())
    }, [reload])

    const loadAllProducts = () => {
        const isCartEmpty = (
            Object.prototype.toString.call(products).toLowerCase().includes('array') && products.length > 0
        ) ? false : true;
        return (
            <div>
                {
                    (!isCartEmpty) &&
                    products.map((product, index) => (
                        <Card key={index} product={product} addtoCart={false} removeFromcart={true} setReload={setReload} reload={reload} />
                    ))
                }
                {(isCartEmpty) &&
                    <h2>No items are your cart as of now! Add some...</h2>
                }
            </div>
        )
    }

    const loadCheckout = () => {
        return (
            <div>
                <h2>This section is for checkout</h2>
            </div>
        )
    }

    return (
        <Base title="Cart Page" description="Ready to checkout">
            <div className="row text-center">
                <div className="col-6">{loadAllProducts()}</div>
                <div className="col-6">{loadCheckout()}</div>
            </div>
        </Base>
    )
}

export default Cart;