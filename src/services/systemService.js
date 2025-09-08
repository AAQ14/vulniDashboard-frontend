import axios from "axios"

const baseURI = import.meta.baseURI

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
        const url = `${baseURI}/systems/details`
        const res = await axios.get(url, userId)
        return res.data
    } catch (err) {
        return err
    }
}

export {
    create,
    details
}