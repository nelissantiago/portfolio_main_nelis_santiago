import axios from "axios";

export const Axios = axios.create({
    baseURL: "https://www.nelissantiago.com/",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
});
