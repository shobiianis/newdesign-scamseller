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
    <h3 className='mt-20 text-lg font-gFont text-center text-gray-700 '>● Easy to login ● Safe ● Reliable</h3>
    </div>

   {/* second portion starts here */}
  
    <div className='bg-black hidden lg:flex lg:w-2/3'>
  <div className='flex flex-col'> {/* Use a container with flex-direction: column */}
    <h1 className='text-rose-50 w-48 font-bold ml-10 mt-10 customBorder rounded p-2 h-12 font-gFont text-2xl'>
      SCAM SELLER
    </h1>
    {/* two rings */}
    <div className='text-white margin mt-20 flex  text-center'>
      <h2 className='custom-circle font-gFont2 text-lg mt-5'>File a <br /> complaint</h2>
      <h2 className='custom-circle mt-5  font-serif text-lg overlapping font-gFont2'>Search shddy <br />sellers</h2>
      </div>
      {/* <h3 className='text-white ml-20 mt-10 text-xl font-gFont'>-How many chances of me being scammed while shopping Online?</h3>
      <h3 className='text-white ml-20 mt-5 text-xl font-gFont'>-Many</h3> */}
      <h3 className='text-white text-xl mt-10 text-center '>there are <span className='circle'>45%</span> chances of you loosing money while shopping online, <br /><br /><br />so we make sure you count yourself in <span className='circle'>55%</span></h3>
  </div>
</div>


  </section>
};

export default SignIn;
