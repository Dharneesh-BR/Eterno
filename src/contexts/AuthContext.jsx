import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { auth, handleAuthRedirect } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const didHandleRedirect = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        if (!didHandleRedirect.current) {
          didHandleRedirect.current = true;
          await handleAuthRedirect();
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    init();

    const unsubscribe = auth.onAuthStateChanged((nextUser) => {
      setUser(nextUser);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    setUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
