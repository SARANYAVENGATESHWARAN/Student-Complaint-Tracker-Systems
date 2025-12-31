import React, { createContext, useContext, useReducer, useEffect } from 'react';
import usersData from '../data/users.json';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      localStorage.removeItem('currentUser');
      return { ...state, user: null, isAuthenticated: false };
    case 'UPDATE_PROFILE':
      const updatedUser = { ...state.user, ...action.payload };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      return { ...state, user: updatedUser };
    case 'INITIALIZE':
      return { ...state, user: action.payload, isAuthenticated: !!action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      dispatch({ type: 'INITIALIZE', payload: JSON.parse(savedUser) });
    }
  }, []);

  const login = (email, password) => {
    const user = usersData.find(u => u.email === email && u.password === password);
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
      return { success: true, user };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const register = (userData) => {
    const existingUser = usersData.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, message: 'Email already exists' };
    }
    
    const newUser = {
      id: Math.max(...usersData.map(u => u.id)) + 1,
      ...userData,
      profilePicture: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    };
    
    usersData.push(newUser);
    dispatch({ type: 'LOGIN', payload: newUser });
    return { success: true, user: newUser };
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = (profileData) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: profileData });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};