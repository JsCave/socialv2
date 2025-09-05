import { Button, Input } from '@heroui/react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { updateSchema } from '../Schema/updateSchema'
import { changeUserPasswordApi } from '../services/authServices'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


export default function Profile() {
  const[isLoading,setIsLoading]=useState(false)
  const[errMsg,setErrMsg]=useState("")
  const[successMsg,setSuccessMsg]=useState("")
  
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
          setSuccessMsg('You Changed Your Password Successfully')
        })
        .catch((e)=>{
          setErrMsg(e.response.data.error)
        })
        .finally(()=>{setIsLoading(false)})
        
  
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
</div>
  )
}
