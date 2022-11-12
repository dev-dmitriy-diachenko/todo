import PropTypes from 'prop-types';
import { createContext, useState, useMemo } from 'react';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
    }),
    [currentUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.string.isRequired,
};
