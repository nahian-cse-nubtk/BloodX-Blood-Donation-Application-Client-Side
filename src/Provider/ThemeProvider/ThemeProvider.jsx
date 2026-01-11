import React, { useEffect, useState } from 'react';
import ThemeContext from '../ThemeContext/ThemeContext';

const ThemeProvider = ({children}) => {
    const [theme,setTheme]=useState(()=>{
        return localStorage.getItem("theme") || "light";
    })
    useEffect(()=>{
        const html = document.documentElement;
        html.setAttribute("data-theme",theme)
        localStorage.setItem("theme",theme)
    },[theme])

    const toggleTheme =()=>{
        setTheme(prev=>(prev==="light"?"dark":"light"))
    }
    return (
       <ThemeContext value={{theme,toggleTheme}}>
        {children}
       </ThemeContext>
    );
};

export default ThemeProvider;