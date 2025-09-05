import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
//custom hooks lesson (we need always start with use to create custom hook)
export default function useFetch(api) {
const[data,setData]=useState(null)
async function getData(){
const{data}=await axios.get(api)
setData(data.data)
}

useEffect(()=>{
    getData()
},[])

return data;



}
