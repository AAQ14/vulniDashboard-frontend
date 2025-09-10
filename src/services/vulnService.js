import axios from "axios";
const baseURI = import.meta.env.VITE_BACKEND_URL

const add = async(data) =>{
    try {
        const url  = `${baseURI}/vulnerabilities/add`
        const res = await axios.post(url, data)
        return res
    } catch (err) {
        return err
    }
}

const index = async(userId) =>{
    try {
        const url = `${baseURI}/vulnerabilities/${userId}`
        console.log(url)
        const res = await axios.get(url)
        return res.data
    } catch (err) {
        return err
    }
}

const update = async(id, data) =>{
    try {
        const url = `${baseURI}/vulnerabilities/update/${id}`
        const res = await axios.put(url, data)
        return res
    } catch (err) {
        return err
    }
}

const details = async(id) =>{
    try {
        const url = `${baseURI}/vulnerabilities/${id}`
        console.log(url)
        const res = await axios.get(url)
        return res.data
    } catch (err) {
        return err
    }
}

const deleteVuln = async(id) =>{
    try {
        const url = `${baseURI}/vulnerabilities/delete/${id}`
        const res = await axios.delete(url)
        return res
    } catch (err) {
        return err
    }
}

export{
    add,
    index,
    update,
    details,
    deleteVuln
}