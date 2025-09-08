import axios from "axios"

const baseURI = import.meta.baseURI

const create = async() =>{
    try {
        const url = `${baseURI}/systems/add`
        const res = await axios.post(url)
        return res
    } catch (err) {
        return err
    }
}

const details = async()=>{
    try {
        
    } catch (err) {
        return err
    }
}

export {
    create
}