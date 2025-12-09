import React, { useEffect, useState } from "react";
import { AuthContext } from "./CreateContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../../../firebase.init";

const provider = new GoogleAuthProvider();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  //auth status update
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        console.log("auth update: no user!");
        setUser(null);
      }
      setAuthLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  //   create user

  const createUser = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res;
  };

  // login user
  const signInUser = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  };

  // login with google

  const googleSignIn = async () => {
    const res = await signInWithPopup(auth, provider);
    return res;
  };

  // logout

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const authInfo = {
    user,
    authLoading,
    createUser,
    signInUser,
    googleSignIn,
    logout,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
