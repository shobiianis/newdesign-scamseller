import React, { useState } from 'react'
import { UserAuth } from '../context/AuthControler'
import { database } from '../config/firebase'
import { ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';


const Complain = () => {
    const [definition,setDefinition]=useState("")
    const {user}=UserAuth()

    const postToDb=async()=>{
    
        try{
          const  dbRef=ref(database,`users/${user.uid}/posts/${uuidv4()}`)
         
          await set(dbRef,{post:definition})
        
        }catch(err){
          console.log(err)
        }
       }
        
    return (
    <div><input type="text" value={definition} onChange={(e)=>{setDefinition(e.target.value)}} />
    <button onClick={postToDb}>submit</button></div>
  )
}

export default Complain