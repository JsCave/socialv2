import { Button } from '@heroui/react'
import React, { useEffect, useMemo, useRef, useState } from 'react'

export default function Profile() {
  const[counter1,setCounter1]=useState(0)
  const[counter2,setCounter2]=useState(0)
  //const [numOfChanges,setNumOfChanges]=useState(0)
  const numOfChanges=useRef(0)
  console.log(numOfChanges)
  useEffect(()=>{
   numOfChanges.current++
  })
  
  const isEven=useMemo(()=>{
  return counter2 %2==0
  },[counter2])
  //useMemo can retur value directly unlike useEffect return function , also useMemo return value unlike useEffect is void function, also use memo work before mounting so will show user real value from beginning 
    return (
<div>
<div className="grid gap-3 max-w-3xl mx-auto">
<div className="grid grid-cols-3 text-center">
<div className=''>
    <h1>Counter 1: {counter1}</h1>
    <div className='flex justify-center gap-2 mt-3'>
  <Button color='success' onPress={()=>setCounter1(counter1+1)}>increase</Button>
  <Button color='warning' onPress={()=>setCounter1(counter1-1)}>decrease</Button>
  </div>
  </div>

  <div className=''>
    <h1>Number of changes:</h1>
    <h1>{numOfChanges.current==-1?0:numOfChanges.current}</h1>
  </div>

  <div className=''>
    <h1>Counter 2: {counter2}</h1>
    <div className='flex justify-center gap-2 mt-3'>
  <Button color='success' onPress={()=>setCounter2(counter2+1)}>increase</Button>
  <Button color='warning' onPress={()=>setCounter2(counter2-1)}>decrease</Button>
  </div>
  </div>
</div>
      { 
        /*<div className="grid gap-3 max-w-3xl mx-auto">
        <div className="grid grid-cols-2 text-center">
  <h1>Counter1: {counter1}</h1>
  <Button onPress={()=>setCounter1(counter1+1)}>increase</Button>
        </div>
  
        <div className="grid grid-cols-2 text-center">
  <h1>Counter2: {counter2}</h1>
  <h1>{isEven ? 'Even':'Odd'}</h1>
  <Button onPress={()=>setCounter2(counter2+1)}>increase</Button>
        </div>
        </div>*/
      }
      </div>
    </div>    
  )
}
