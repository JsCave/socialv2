import { Button } from '@heroui/react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { updateSchema } from '../Schema/updateSchema'
import { changeUserPasswordApi } from '../services/authServices'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Profile() {
  const[isLoading,setIsLoading]=useState(false)
  const[errMsg,setErrMsg]=useState("")
  const navigate=useNavigate()
  const{isLoggedIn,setIsLoggedIn}=useContext(authContext)
  
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
        setIsLoading(false)
     if(data.message=="success"){

      }else{
          setErrMsg(data)
      }
  console.log(data)
  
      }

    return (

<div>
  <h1>Change Password</h1>
<form className="inline-flex flex-col gap-5 items-center" onSubmit={handleSubmit(handleUpdatePassword)}>
<Input isInvalid={Boolean(errors.password?.message)} errorMessage={errors.password?.message} label="Password" placeholder="Password" type="password" variant="bordered"  {...register('password')}/>
<Input isInvalid={Boolean(errors.newPassword?.message)} errorMessage={errors.newPassword?.message} label="New Password" placeholder="New Password" type="password" variant="bordered"  {...register('newPassword')}/>
<Button type='submit' isLoading={isLoading}  color="primary" variant="solid">Change Password</Button>
{errMsg && <p className="bg-red-500 text-red-950">{errMsg}</p>}
</form>


  <h1>Upload Profile Photo</h1>
</div>
  )
}
