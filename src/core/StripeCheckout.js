import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper/index";
import { cartEmpty, loadCart } from "./helper/carthelper";
import { Link } from "react-router-dom"

const StripeCheckout = ({ products, setReload = r => r, reload = undefined }) => {

    const [data, setData] = useState({
        loadin: false,
        success: false,
        error: "",
        address: ""
    });

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;

    const getFinalPrice = () => {
        let amount = 0;
        products.map((p) => {
            amount = amount + p.price;
        }, 0)
        return amount;
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <button className="btn btn-success">Pay with Stripe</button>
        ) : (
                <Link to="/signin">
                    <button className="btn btn-warning">
                        Signin
                    </button>
                </Link>
            );
    }

    return (
        <div>
            <h3 className="text-white text-center">Stripe Checkout {getFinalPrice()}</h3>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout;