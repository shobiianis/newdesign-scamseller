import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthControler';
import GoogleButton from 'react-google-button';
import { useEffect } from 'react';
import { get, ref, set } from 'firebase/database';
import { database } from '../config/firebase';

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

  return <div><GoogleButton onClick={handleGoogleSignIn} /></div>;
};

export default SignIn;
