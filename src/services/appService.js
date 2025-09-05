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


