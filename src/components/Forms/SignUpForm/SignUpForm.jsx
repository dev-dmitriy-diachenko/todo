import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../../Button';
import { TextField } from '../../TextField';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../../utils/firebase';

import { UserContext } from '../../../contexts/User.context';

import '../Forms.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords do not match');

      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);

      setCurrentUser(user);

      await createUserDocumentFromAuth(user, { displayName });

      resetFormFields();
      navigate('/');
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          alert('cannot create user, email already in use');
          break;

        default:
          console.error(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-form">
      <h2 className="sign-up-form__title">Sign up</h2>

      <form
        className="sign-up-form__form"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Display name"
          type="text"
          name="displayName"
          required
          onChange={handleChange}
          value={displayName}
        />

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

        <TextField
          label="Confirm password"
          type="password"
          name="confirmPassword"
          required
          onChange={handleChange}
          value={confirmPassword}
        />

        <div className="sign-up-form__buttons">
          <Button type="submit">Sign Up</Button>
        </div>

        <div className="sign-up-form__footer">
          Already have an account?
          <Link
            className="sign-up-form__link"
            to="/sign-in"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};
