// File: app/pranked/page.js
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Pranked() {
  const [showPrank, setShowPrank] = useState(false);                   

  useEffect(() => {
    // Clear session storage
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    
    // Show prank after a slight delay for dramatic effect
    const timer = setTimeout(() => {
      setShowPrank(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      {!showPrank ? (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full border-4 border-blue-500 border-t-transparent h-12 w-12 mb-4"></div>
          <p className="text-lg">Loading your account information...</p>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl text-center">
          <h1 className="text-4xl font-bold mb-6">YOU&apos;VE BEEN PRANKED!</h1>
          
          <div className="mb-6">
            <div className="text-6xl mb-4">🎉 😂 🎉</div>
            <p className="text-xl mb-4">
              Congratulations! You&apos;ve passed &quot;the &quot; test but it&apos;s of No Use
            </p>
            <p className="text-lg mb-6">
             Apka kat Gya hai 🤣🤣 Koi Recruitment nhi mil rahi free mein 
            </p>
          </div>
          
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
            <p className="text-yellow-700">
              This was a harmless prank page. No data was collected or stored.
              Try in the coding week again .This time not with the luck but with hardwork
            </p>
          </div>
          
          
        </div>
      )}
    </main>
  );
}
