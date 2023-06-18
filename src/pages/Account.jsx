import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthControler';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const Account = () => {
  const [complainButtonVisible, setComplainButtonVisible] = useState(true);
  const [searchBtnVisible,setSearchBtnVisible]=useState(true)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the current path contains '/complain'
    const isComplainPage = location.pathname.includes('/complain');
    setComplainButtonVisible(!isComplainPage);
    const isSearchPage=location.pathname.includes('/search')
    setSearchBtnVisible(!isSearchPage)
  }, [location]);

  const gotoComplain = () => {
    navigate('/account/complain');
    setComplainButtonVisible(false);
    setSearchBtnVisible(false) // Hide the button when clicked
  };

  const gotoSearch=()=>{
    navigate('/account/search')
    setSearchBtnVisible(false)
    setComplainButtonVisible(false)
  }

  const { user, logOut } = UserAuth();
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Outlet />

      {complainButtonVisible && (
        <button onClick={gotoComplain}>Complain</button>
      )}
  
        {searchBtnVisible && (
        <button onClick={gotoSearch}>search</button>
      )}

      <p>
        Hello {user.displayName}{' '}
        <button onClick={handleSignOut}>Logout</button>{' '}
      </p>
    </div>
  );
};

export default Account;
