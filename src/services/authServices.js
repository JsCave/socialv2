import axios from "axios";
const baseUrl="https://linked-posts.routemisr.com/"
export async function registerApi(formData){
    try{
        
        const {data}=await axios.post(baseUrl + "users/signup",formData)
        return data
    }catch(e){
return e.response.data
    }

}


export async function loginApi(formData){
    try{
        
        const {data}=await axios.post(baseUrl + "users/signin",formData)
        return data
    }catch(e){
return e.response ? e.response.data.error : e.message
    }

}

export async function getLoggedInUserApi(){
    try{
        
        const {data}=await axios.get(baseUrl + "users/profile-data",{
            headers:{
                token:localStorage.getItem('token')
            }
        })
        return data
    }catch(e){
return e.response ? e.response.data.error : e.message
    }

}


export async function changeUserPasswordApi(formData){
    try{
        
        const {data}=await axios.patch(baseUrl + "users/change-password",formData,{
            headers:{
                token:localStorage.getItem('token')
            }
        })
        return data
    }catch(e){
throw e
    }

}


export async function changeUserPhotoApi(formData){
    try{
        
        const {data}=await axios.put(baseUrl + "users/change-password",formData,{
            headers:{
                token:localStorage.getItem('token')
            }
        })
        return data
    }catch(e){
throw e
    }

}