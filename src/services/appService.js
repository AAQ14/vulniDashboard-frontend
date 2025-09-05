import axios from "axios";
const baseURI = import.meta.env.VITE_BACKEND_URL

const addApp = async(data) =>{
    try {
        const url = `${baseURI}/applications/add`
        const res = await axios.post(url, data)
        if(res.status == 201)
            return res
        else
            throw new err
    } catch (err) {
        return err
    }
}

const appIndex = async() =>{
    try {
        const url = `${baseURI}/applications/`
        const res = await axios.get(url)
        return res.data
    } catch (err) {
        return err
    }
}

const appDetails = async (id) =>{
    try {
        const url = `${baseURI}/applications/${id}` 
        const res = await axios.get(url)
        return res.data      
    } catch (err) {
        return err
    }
}

const updateApp = async(id, data) =>{
    try {
        const url = `${baseURI}/applications/update/${id}`
        const res = await axios.put(url, data)
        return res
    } catch (err) {
        return err        
    }
}

const deleteApp = async(id) =>{
    try {
        const url = `${baseURI}/applications/delete/${id}`
        const res = await axios.delete(url)
        return res
    } catch (err) {
        return err
    }
}

