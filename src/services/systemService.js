import axios from "axios"

const baseURI = import.meta.env.VITE_BACKEND_URL

const create = async(userId) =>{
    try {
        const url = `${baseURI}/systems/add`
        const res = await axios.post(url, userId)
        return res
    } catch (err) {
        return err
    }
}

const details = async(userId)=>{
    try {
        const url = `${baseURI}/systems/details/${userId}`
        console.log(url)
        const res = await axios.get(url)
        return res.data
    } catch (err) {
        return err
    }
}


export {
    create,
    details
}