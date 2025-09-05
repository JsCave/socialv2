import { Button, Input } from '@heroui/react'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { updateSchema } from '../Schema/updateSchema'
import { changeUserPasswordApi, changeUserPhotoApi } from '../services/authServices'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authContext } from './../contexts/authContext';


export default function Profile() {
  const{isLoggedIn,setIsLoggedIn,setUserData}=useContext(authContext)
  const[isLoading,setIsLoading]=useState(false)
  const[errMsg,setErrMsg]=useState("")
  const[successMsg,setSuccessMsg]=useState("")
  const[imageFile,setImageFile] =useState(null)
const[isSubmitting,setIsSubmitting]=useState(false)

  const{handleSubmit,register,formState:{errors}}=useForm({
      defaultValues:{
          password:"",
          newPassword:"",
      },
      resolver: zodResolver(updateSchema),
      mode:"onBlur"
  })
  
     async function handleUpdatePassword(formData){
      setIsLoading(true)
        const data=await  changeUserPasswordApi(formData)
        .then((res)=>{
          console.log(res)
          setErrMsg('')
          setSuccessMsg('You Changed Your Password Successfully')
          localStorage.removeItem('token')
          setIsLoggedIn(false)
         navigate('/login')
        })
        .catch((e)=>{
          setSuccessMsg('')
          setErrMsg(e.response.data.error)
        })
        .finally(()=>{setIsLoading(false)})
        
  
      }

const fileInput=useRef()
async function handleSubmitPhoto(e){
e.preventDefault()
if(imageFile == null){
    return;
}
const formData=new FormData()
if(imageFile){formData.append('photo',imageFile)}
setIsSubmitting(true)
const response=await changeUserPhotoApi(formData)
.then((res)=>{console.log(res)})
.catch((e)=>{console.log(e)})
.finally(()=>{setIsSubmitting(false)})


}


function handleFileChange(e){
    if(e.target.files[0]){
        setImageFile(e.target.files[0])
    }

}


    return (

<div>
  <h1>Change Password</h1>
  {successMsg && <p className="bg-green-300 text-green-950">{successMsg}</p>}
<form className="inline-flex flex-col gap-5 items-center" onSubmit={handleSubmit(handleUpdatePassword)}>
<Input isInvalid={Boolean(errors.password?.message)} errorMessage={errors.password?.message} label="Password" placeholder="Password" type="password" variant="bordered"  {...register('password')}/>
<Input isInvalid={Boolean(errors.newPassword?.message)} errorMessage={errors.newPassword?.message} label="New Password" placeholder="New Password" type="password" variant="bordered"  {...register('newPassword')}/>
<Button type='submit' isLoading={isLoading}  color="primary" variant="solid">Change Password</Button>
{errMsg && <p className="bg-red-300 text-red-950">{errMsg}</p>}
</form>


  <h1>Upload Profile Photo</h1>
  <form onSubmit={handleSubmitPhoto} className="space-y-4">
  <label className="cursor-pointer text-gray-600 hover:text-blue-600 transition duration-200">
                <input
                    // onChange={(e) => handleFileChange(e)}
                    onChange={handleFileChange}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInput}
                />
                <div className="flex items-center space-x-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">Photo</span>
                </div>
            </label>

            <button
                disabled={isSubmitting || (imageFile == null)}
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
                {isSubmitting ? (
                    <span className="flex items-center space-x-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Posting...</span>
                    </span>
                ) : (
                    'Post'
                )}
            </button>
            </form>
</div>
  )
}
