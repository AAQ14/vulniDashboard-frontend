import axios from "axios";
const baseURI = import.meta.env.VITE_BACKEND_URL

const add = async(data) =>{
    try {
        const url  = `${baseURI}/vulnerabilities/add`
        const res = axios.post(url, data)
        return res
    } catch (err) {
        return err
    }
}

