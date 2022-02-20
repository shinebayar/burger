import axios from "axios"

const instance = axios.create({
    baseURL: 'https://burger-82b7e-default-rtdb.asia-southeast1.firebasedatabase.app/'
});

export default instance;