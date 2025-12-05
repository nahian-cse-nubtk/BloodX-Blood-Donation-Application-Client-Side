import React, { useEffect, useState } from 'react';
import AuthContext from '../AuthContext/AuthContext';
import { auth } from './../../firebase/firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

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
        loading
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;