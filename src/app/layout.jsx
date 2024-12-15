'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/shared/Sidebar/Sidebar";
import PageTitle from "@/components/layout/PageTitle/PageTitle";
import { useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import UserProvider from "@/provider/UserProvider";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {

  const pathname = usePathname();
  
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <html lang="en">
      <body className={`${inter.className} text-xs md:text-sm bg-primary-bg text-primary-text dark:bg-secondary-bg dark:text-secondary-text`}>

        <PageTitle title={''} />

        <UserProvider>

          {/* sidebar show/hide btn */}
          <button onClick={() => setShowSidebar(true)} className={`${pathname == '/login' && 'hidden'} fixed top-3 left-4 z-50 text-2xl`}>
            <RiMenu2Fill />
          </button>

          <div className="min-h-screen">

            <div className={`${pathname == '/login' && 'hidden'} sidebar-scollbar w-60 h-screen pb-5 absolute ${showSidebar ? 'top-0 left-0' : 'top-0 -left-96'} lg:fixed lg:left-0 lg:top-0 bg-slate-100 dark:bg-slate-600 overflow-y-scroll z-[60] duration-300`}>
              <Sidebar setShowSidebar={setShowSidebar} />
            </div>

            <div className="lg:pl-60">
              {children}
            </div>

          </div>

        </UserProvider>

      </body>
    </html>
  );
}
