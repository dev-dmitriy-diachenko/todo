import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRedirectResult } from 'firebase/auth';

import { Button } from '../../Button';
import { TextField } from '../../TextField';
import { UserContext } from '../../../contexts/User.context';

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from '../../../utils/firebase';

import { getDeviceType } from '../../../utils/getDeviceType';

import '../Forms.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

export const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    const getUserCredentials = async () => {
      const response = await getRedirectResult(auth);

      if (response) {
        setCurrentUser(response.user);
        await createUserDocumentFromAuth(response.user);
      }
    };

    getUserCredentials();
  }, [setCurrentUser]);

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();

    setCurrentUser(user);

    await createUserDocumentFromAuth(user);
    navigate('/');
  };

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(email, password);

      resetFormFields();
      setCurrentUser(user);
      navigate('/');
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;

        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;

        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-form">
      <h2 className="sign-in-form__title">Sign in</h2>

      <form
        className="sign-in-form__form"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Email"
          type="email"
          name="email"
          required
          onChange={handleChange}
          value={email}
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          required
          onChange={handleChange}
          value={password}
        />

        <div className="sign-in-form__buttons">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType="google"
            onClick={getDeviceType() === 'mobile' ? signInWithGoogleRedirect : signInWithGoogle}
          >
            Log in with google
          </Button>
        </div>

        <div className="sign-in-form__footer">
          Don&apos;t have an account?
          <Link
            className="sign-in-form__link"
            to="/sign-up"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};
