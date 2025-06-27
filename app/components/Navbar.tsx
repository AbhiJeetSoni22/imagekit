"use client";

import { getSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import img from '@/public/imageUser.jpg'
import { LogOut, Home as HomeIcon, User } from "lucide-react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userImage, setUserImage] = useState<string | undefined | null>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const authUser = async () => {
    try {
      const session = await getSession();
      if (session?.user) {
        setUserImage(session.user?.image);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  const logoutUser = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  useEffect(() => {
    authUser();
  }, []);

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center"
          >
            <span className="mr-1">🎬</span> VidBase
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors font-medium rounded-md"
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              Home
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={logoutUser}
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-red-600 transition-colors font-medium rounded-md"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
                <div className="relative group">
                  <Image 
                    src={userImage || img} 
                    alt="user image" 
                    width={40} 
                    height={40} 
                    className="rounded-full cursor-pointer border-2 border-indigo-100 hover:border-indigo-300 transition-all"
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                    <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors rounded-md"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity rounded-md shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isLoggedIn && (
              <Image 
                src={userImage || img} 
                alt="user image" 
                width={40} 
                height={40} 
                className="rounded-full mr-4 border-2 border-indigo-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              Home
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <User className="w-5 h-5 mr-2" />
                  My Profile
                </Link>
                <button
                  onClick={logoutUser}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;