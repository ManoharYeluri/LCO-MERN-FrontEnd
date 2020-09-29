import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategory, updateCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index"

const UpdateCategory = ({ match }) => {

    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        name: "", loading: false, error: false, updatedCategory: "", getRedirect: false, formData: ""
    });

    const { name, loading, error, updatedCategory, getRedirect, formData } = values;

    useEffect(() => {
        preload(match.params.categoryId);
    }, []);

    const preload = (categoryId) => {
        getCategory(categoryId)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values,
                        name: data.name,
                        formData: new FormData()
                    });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        const toBeUpdatedCategory = { "name": name };
        console.log(toBeUpdatedCategory);

        updateCategory(match.params.categoryId, user._id, token, toBeUpdatedCategory).then(data => {
            if (data.error) {
                console.log("Error Occured: " + data.error);
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, name: "", loading: false })
            }
        }).catch(err => {
            console.log("Error Occured: " + err);
        })
    }


    const handleChange = (event) => {
        const value = event.target.value;
        formData.set(name, value);
        setValues({ ...values, name: value });
    }

    const successMessage = () => {
        return (
            <div className="alert alert-success mt-3" style={{ display: updatedCategory ? "" : "none" }} >
                <h3>{updatedCategory} updated successfully</h3>
            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div className="alert alert-danger mt-3" style={{ display: error ? "" : "none" }} >
                <h3>Something went wrong!</h3>
            </div>
        )
    }

    const updateCategoryForm = () => (
        <form >
            <div className="form-group">
                <input type="text" className="forn-control my-3" onChange={(e) => handleChange(e)} value={name} autoFocus required placeholder="For Ex. Summer" />
            </div>
            <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
                Update Category
          </button>
        </form>
    );

    return (
        <Base title="Update Category" description="Welcome to category update section" className="container bg-info p-4">
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">Admin Home</Link>
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {errorMessage()}
                    {updateCategoryForm()}
                </div>
            </div>
        </Base>
    )
}

export default UpdateCategory;