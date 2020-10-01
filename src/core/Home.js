import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import IWRITECODE from "../assets/images/iwritecode.jpg";
import Card from "./Card";

import { getProducts } from "./helper/coreapicalls"

export default function Home() {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProducts = () => {
        getProducts()
            .then(data => {
                if (data.error) {
                    setError(data.error)
                }
                else {
                    setProducts(data)
                }
            })
            .catch()
    }

    useEffect(() => {
        loadAllProducts();
    }, [])

    return (
        <Base title="Home Page" description="Welcome to the T-shirt store">
            <div className="row text-center">
                <h1 className="text-white">All of tshirts</h1>
                <div className="row">
                    {
                        products.map((product, index) => {
                            return (
                                <div key={index} className="col-4 mb-4">
                                    <Card product={product} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="hero-image">
                <img src={IWRITECODE} alt="I Write Code" />
            </div>
        </Base>
    )
}