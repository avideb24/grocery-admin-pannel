'use client';

import { useEffect, useState } from "react";
import { IoMdSunny, IoMdMoon  } from "react-icons/io";


const ThemeToggle = () => {

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme == 'light') {
            setDarkMode(false)
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark')
        }
        else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light')
        }
    }, [darkMode]);


    return (
        <div onClick={() => setDarkMode(!darkMode)} className="w-10 h-5 bg-transparent border border-slate-500 rounded-full cursor-pointer relative">
            <p className={`${darkMode ? 'text-white' : 'text-black'} absolute ${darkMode ? 'top-[2px] left-1 ' : 'top-[2px] right-1'} duration-500 text-sm`}>
                { darkMode ? <IoMdMoon /> : <IoMdSunny /> }
            </p>
        </div>
    );
};

export default ThemeToggle;