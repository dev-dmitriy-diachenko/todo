import { Outlet, Link } from 'react-router-dom';
import { useContext } from 'react';

import { Icon } from '../Icon';

import { UserContext } from '../../contexts/User.context';

import { signOutUser } from '../../utils/firebase';

import './Navigation.scss';

export const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleSignOut = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  return (
    <>
      <nav className="navigation">
        <div className="navigation__container">
          <div className="navigation__icon-container">
            <Icon
              to="/"
              iconType="logo"
              text="Task manager"
            />
          </div>
          <ul className="navigation__links">
            {currentUser ? (
              <button
                className="navigation__link"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            ) : (
              <li className="navigation__link">
                <Link to="/sign-in">Sign in</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
