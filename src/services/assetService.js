import axios from "axios";
const baseURI = import.meta.env.VITE_BACKEND_URL

const addAsset= async(data) =>{
    try {
        const url = `${baseURI}/assets/add`
        const res = await axios.post(url, data)
        if(res.status == 201)
            return res
        else
            throw new err
    } catch (err) {
        return err
    }
}

const assetIndex = async(userId) =>{
    try {
        const url = `${baseURI}/assets/${userId}`
        const res = await axios.get(url)
        if(res.status == 200){
            return res.data
        }
    } catch (err) {
        return err
    }
}

const assetDetails = async (id) =>{
    try {
        const url = `${baseURI}/assets/details/${id}` 
        const res = await axios.get(url)
        if(res.status == 200){
            return res.data      
        }
    } catch (err) {
        return err
    }
}

const updateAsset = async(id, data) =>{
    try {
        const url = `${baseURI}/assets/update/${id}`
        const res = await axios.put(url, data)
        if(res.status == 200){
            return res
        }
    } catch (err) {
        return err        
    }
}

const deleteAsset = async(id) =>{
    try {
        const url = `${baseURI}/assets/delete/${id}`
        const res = await axios.delete(url)
        if(res.status == 200){
            return res
        }
    } catch (err) {
        return err
    }
}

export{
   addAsset,
   assetDetails,
   assetIndex,
   deleteAsset,
   updateAsset
}