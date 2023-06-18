  import { BrowserRouter, Route, Routes } from "react-router-dom";
  import React from 'react'

  import Account from "../pages/Account";
  import SignIn from "../pages/SignIn";
import Protected from "./Protected";

  const AppRouter = () => {
    return (
      <BrowserRouter>
      <Routes>
 
        <Route path="/" element={<SignIn />} />
        <Route path="/account" element={<Protected>
           <Account />
        </Protected>} />
      </Routes>
      </BrowserRouter>
    )
  }

  export default AppRouter