import { API } from "../../backend";

//CATEGORY API CALLS 

// create a category
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });

}

// get all categories 
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err);
        })
}

// get a category
export const getCategory = categoryId => {
    return fetch(`${API}/category/${categoryId}`, {
        method: "GET"
    }).then(response => {
        return response.json()
    })
        .catch(err => {
            console.log(err);
        })
}

// update a category
export const updateCategory = (categoryId, userId, token, category) => {
    if (!Object.prototype.toString.call(category).toLowerCase().includes('object')) {
        console.log("ERROR IN CALLING API!");
        return Promise.reject("ERROR IN CALLING API!");
    } else if (category.name == '') {
        console.log("ERROR IN CALLING API!");
        return Promise.reject("ERROR IN CALLING API!");
    }
    else {
        console.log("To Be Updated Category: " + category.name);
        console.log(JSON.stringify(category));
    }
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: category
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log("Error in API Call: " + err);
        })
}

// delete a category
export const deleteCategory = (categoryId, userId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
}

//PRODUCTS CALLS

//create a product
export const createaProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
}

//get all products
export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: "GET"
    }).then(response => {
        return response.json()
    })
        .catch(err => {
            console.log(err);
        })
}

// get a pproduct
export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    }).then(response => {
        return response.json()
    })
        .catch(err => {
            console.log(err);
        })
}

// update a product
export const updateProduct = (productId, userId, token, product) => {
    console.log(Object.prototype.toString.call(product));
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
}

// delete a product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
}