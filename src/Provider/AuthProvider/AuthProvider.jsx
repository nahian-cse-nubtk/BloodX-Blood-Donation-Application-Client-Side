import React, { useEffect, useState } from 'react';
import AuthContext from '../AuthContext/AuthContext';
import { auth } from './../../firebase/firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import GoogleProvider from '../GoogleProvider/GoogleProvider';

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [user,setUser]=useState(null)
    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signInUser = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const updateUser = (profile)=>{
        setLoading(true)
        return updateProfile(auth.currentUser,profile)
    }
    const signOutUser =()=>{
        return signOut(auth)
    }
    const signInWithGoogle =()=>{
        return signInWithPopup(auth,GoogleProvider)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
          setUser(currentUser);
          setLoading(false)
        })
        return ()=>{
            unsubscribe()
        }
    },)
    const authInfo ={
        createUser,
        signInUser,
        updateUser,
        signOutUser,
        user,
        loading,
     signInWithGoogle

    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;