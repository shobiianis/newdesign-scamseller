  import { BrowserRouter, Route, Routes } from "react-router-dom";
  import React from 'react'

  import Account from "../pages/Account";
  import SignIn from "../pages/SignIn";
import Protected from "./Protected";
import Complain from "../pages/Complain";

import Search from "../pages/SearchPage";

  const AppRouter = () => {
    return (
      <BrowserRouter>
      <Routes>
 
        <Route path="/" element={<SignIn />} />
        <Route path="/account/*" element={<Protected>
           <Account />
        </Protected>} >
          <Route path="complain" element={<Complain />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
      </BrowserRouter>
    )
  }

  export default AppRouter