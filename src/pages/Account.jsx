import React, { useState } from 'react'
import { UserAuth } from '../context/AuthControler'
import { database } from '../config/firebase'
import { ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';


const Account = () => {
  const [definition,setDefinition]=useState("")
  const {user,logOut}=UserAuth()
  const handleSignOut=async()=>{
    try{
      await logOut()
    }
    catch(err){
      console.log(err)
    }
   }

   const postToDb=async()=>{
    
    try{
      const  dbRef=ref(database,`users/${user.uid}/posts/${uuidv4()}`)
     
      await set(dbRef,{post:definition})
    
    }catch(err){
      console.log(err)
    }
   }
    

   
      return <div>

        <p>hello {user.displayName} <button onClick={handleSignOut}>logout</button> </p>
        <input type="text" value={definition} onChange={(e)=>{setDefinition(e.target.value)}} />
        <button onClick={postToDb}>submit</button>
      </div> 
  
  
}
export default Account