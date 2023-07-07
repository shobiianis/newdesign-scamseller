import React, { useState } from 'react'
import { UserAuth } from '../context/AuthControler'
import { database } from '../config/firebase'
import { ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../config/firebase';
import { ref as ref2 , uploadBytes, getDownloadURL } from 'firebase/storage'
// import { uid } from 'uid';
// import {v4} from 'uuid'


const Complain = () => {
    
    const {user}=UserAuth()
    
    const [product,setProduct]=useState('')
    const [shopurl,setShopUrl]=useState('')
    const [shopName,setShopName]=useState('')
    const [desc,setDesc]=useState('')
    const [fromBuy,setFromBuy]=useState('')

    const options=["faceBook","Instagram","Daraz","Telemart","indivisual","service","online-website","offline-shop"]
   
    let [imageUpload,setUploadImage]=useState('')
    let [imgUrl,setImgUrl ]=useState('')

    // const postToDb=async()=>{
    
    //     try{
    //       const  dbRef=ref(database,`users/${user.uid}/posts/${uuidv4()}`)
         
    //       await set(dbRef,{post:definition})
        
    //     }catch(err){
    //       console.log(err)
    //     }
    //    }
    
    let sendImage= (event)=>{
      let imgName=imageUpload.name + uuidv4()
      const imageRef=ref2(storage,  `images/${imgName}`)

      uploadBytes(imageRef,imageUpload).then((res)=>{
          
        alert("Your post has been submitted Thankyou.");
        

        getDownloadURL(ref2(storage,`images/${imgName}`)).then((URL)=>{
        
          const  dbRef=ref(database,`users/${user.uid}/posts/${uuidv4()}`)
           set(dbRef,{
          
            
            shopurl,
           product,
           shopName,
           fromBuy,
           desc,
           imgUrl:URL,
          
           
        
          })
          setProduct('')
          setShopUrl('')
          setShopName('')  
          setFromBuy("")
          setDesc("")
          setImgUrl('')
          setUploadImage(event.target.files)
          
   
        }).catch((err)=>{
              console.log(err)
          })

  }).catch((err)=>{console.log(err)})  
      


  }


    return (
    <div>

      <input placeholder={"Name of product"} value={product} onChange={(e)=>setProduct(e.target.value)}/>
      <input placeholder={'Url'}  value={shopurl} onChange={(e)=>setShopUrl(e.target.value)}/>
      <input placeholder={'shopname'}  value={shopName}  onChange={(e)=>setShopName(e.target.value)}/>   
      <input placeholder='Describe what happened' value={desc}  onChange={(e)=>setDesc(e.target.value)} />
      <select onChange={(e)=>{
          setFromBuy(e.target.value)}}>
              <option  >From Where you buy</option>
              {
              options.map((item,i)=>{
              return<option key={i}>{item}</option>})  
              }
       </select>
           
       <input className="picture" type="file" onChange={(event)=>{
         setUploadImage(event.target.files[0])}} />



       <button onClick={sendImage}>submit</button>
    </div>
  )
}

export default Complain