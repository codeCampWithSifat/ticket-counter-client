/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/firebase.init";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPubic = useAxiosPublic();

  const signUpUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserName = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPubic.post("/jwt", userInfo).then((res) => {
          if (res?.data?.token) {
            localStorage.setItem("accessToken", res?.data?.token);
            setLoading(false);
          }
        });
      } else {
        localStorage.removeItem("accessToken");
        setLoading(false);
      }
    });
    return () => {
      return unsubcribe();
    };
  }, [axiosPubic]);
  const userInfo = {
    signUpUser,
    updateUserName,
    signInUser,
    signOutUser,
    user,
    loading,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
