import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthControler';
import GoogleButton from 'react-google-button';
import { useEffect } from 'react';
import { get, ref, set } from 'firebase/database';
import { database } from '../config/firebase';
import logo from '../images/SCAM.svg'
import '../App.css'

const SignIn = () => {
  const navigate = useNavigate();
  const { googleSignIn, user } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const updateUser = async () => {
      if (user && user.uid) {
        const starRef = ref(database, 'users/');
        const items = await get(starRef);
        const data = items.val();
        const isPresent = data && data[user.uid];
        console.log(isPresent);

        if (!isPresent) {
          try {
            await set(ref(database, `users/${user.uid}`), {
              name: user.displayName,
              userId: user.uid
            });
            navigate('/account');
          } catch (error) {
            console.log("error", error);
          }
        } else {
          navigate('/account');
        }
      }
    };

    updateUser();
  }, [user, navigate]);

  return <section className='flex' >
     

   <div className='w-full lg:w-1/3  bg-blue-100 text-4xl pt-2 m-0 h-screen overflow-hidden'> {/*login page */}
    
    <div  className='img-container mt-20'>
    <img src={logo} alt="logo"  />
    </div>
    
    <h1 className='font-gFont ml-7 mt-20'>hey! welcome , </h1>
    <p className='font-thin text-base  ml-7'>Click on the following button to get started</p>

    <GoogleButton
      style={{marginTop:"60px" ,marginLeft:"30px", backgroundColor:"black",color:'white',border:"none", borderRadius:"5px" , padding:"5px",height:"62px", fontFamily:"gFont"}}
      type='light'
      label='Continue with Google'
      onClick={handleGoogleSignIn} />
    <h3 className='mt-20 text-lg font-gFont text-center text-gray-700 '>● Easy to login ● Fast ● Reliable</h3>
    </div>

    <div className='bg-black  hidden lg:flex lg:w-2/3 '>
  h
    </div>

  </section>
};

export default SignIn;
