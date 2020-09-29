import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getProducts, deleteProduct } from "./helper/adminapicall"

const ManageProducts = () => {

    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const preload = () => {
        getProducts()
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setProducts(data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        preload();
    }, []);

    const deleteThisProduct = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                preload()
            }
        })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Base title="Welcome admin" description="Manage products here">
            <div className="container">
                <h4 className="mb-4">All products</h4>
                <div className="row border border-success rounded">
                    <div className="col-12">
                        <h2 className="text-center text-white my-3">Total {products.length} products</h2>
                        {products.map((product, index) => {
                            return (
                                <div key={index} className="row text-center mb-2 ">
                                    <div className="col-4">
                                        <h3 className="text-white text-left">{product.category.name} - {product.name}</h3>
                                    </div>
                                    <div className="col-4">
                                        <Link className="btn btn-success" to={`/admin/product/update/${product._id}`}>Update</Link>
                                    </div>
                                    <div className="col-4">
                                        <button onClick={() => { deleteThisProduct(product._id) }} className="btn btn-danger">Delete</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Link className="btn btn-info mt-4" to={`/admin/dashboard`}>Admin Home</Link>
        </Base>
    )
}

export default ManageProducts;