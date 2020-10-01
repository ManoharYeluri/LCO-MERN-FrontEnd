import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {
    return fetch(`${API}/order/create/:${userId}`, {
        method: "POSt",
        headers: {
            Accepts: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            order: orderData
        })
            .then(response => {
                return response.JSON()
            })
            .catch(err => {
                console.log(err)
            })
    })
}