'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link href="/">MyApp</Link>
      </div>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/adminPanel">Admin Page</Link>
        {!isAuthenticated ? (
        <>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
          <Link href="/registerAdmin">Register Admin</Link>
        </>
        ) : (
          <button onClick={handleLogout} className="hover:text-red-400">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
