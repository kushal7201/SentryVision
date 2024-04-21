import PropTypes from 'prop-types';
import React, { useMemo, useCallback } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  const initialLoggedInState = storedToken !== null && storedToken !== '';

  const [isLoggedIn, setIsLoggedIn] = React.useState(initialLoggedInState);

  const loginHandler = useCallback((token) => {
    // localStorage.setItem('token', token);
    setIsLoggedIn(true);
  }, []);

  const logoutHandler = useCallback(() => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }, []);

  const authContext = useMemo(() => ({
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  }), [isLoggedIn, loginHandler, logoutHandler]);

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;



// consider user role student/admin 
// import PropTypes from 'prop-types';
// import React, { useMemo, useCallback, useState } from 'react';

// const AuthContext = React.createContext({
//  isLoggedIn: false,
//  userRole: null, // Add userRole to the context
//  login: () => {},
//  logout: () => {},
// });

// export const AuthProvider = ({ children }) => {
//  const storedToken = localStorage.getItem('token');
//  const initialLoggedInState = storedToken !== null && storedToken !== '';
//  const initialUserRole = localStorage.getItem('userRole'); // Retrieve user role from local storage

//  const [isLoggedIn, setIsLoggedIn] = React.useState(initialLoggedInState);
//  const [userRole, setUserRole] = useState(initialUserRole); // State for user role

//  const loginHandler = useCallback((token, role) => { // Update to accept role
//     localStorage.setItem('token', token);
//     localStorage.setItem('userRole', role); // Store user role in local storage
//     setIsLoggedIn(true);
//     setUserRole(role); // Update user role state
//  }, []);

//  const logoutHandler = useCallback(() => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userRole'); // Remove user role from local storage
//     setIsLoggedIn(false);
//     setUserRole(null); // Reset user role state
//  }, []);

//  const authContext = useMemo(() => ({
//     isLoggedIn,
//     userRole, // Include userRole in the context value
//     login: loginHandler,
//     logout: logoutHandler,
//  }), [isLoggedIn, userRole, loginHandler, logoutHandler]);

//  return (
//     <AuthContext.Provider value={authContext}>
//       {children}
//     </AuthContext.Provider>
//  );
// };

// AuthProvider.propTypes = {
//  children: PropTypes.node.isRequired,
// };

// export default AuthContext;



// using in other components 
// import React, { useContext } from 'react';
// import AuthContext from './AuthContext'; // Adjust the import path as necessary

// const MyComponent = () => {
//  const { isLoggedIn, userRole } = useContext(AuthContext);

//  if (!isLoggedIn) {
//     return <div>Please log in.</div>;
//  }

//  return (
//     <div>
//       {userRole === 'admin' && <div>Admin Content</div>}
//       {userRole === 'student' && <div>Student Content</div>}
//     </div>
//  );
// };

// export default MyComponent;
