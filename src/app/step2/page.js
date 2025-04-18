// File: app/step2/page.js (Step 2 Login Page with Dark Theme)
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Step2Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  const [step2Requirements, setStep2Requirements] = useState([
    { text: "Include a word that rhymes with 'orange'", fulfilled: false, check: (pass) => {
      const rhymesWithOrange = ['sporange', 'borange', 'lorange', 'porange', 'storange', 'dorange', 'florange'];
      return rhymesWithOrange.some(word => pass.toLowerCase().includes(word.toLowerCase()));
    }},
    { text: "Contain a chemical element symbol", fulfilled: false, check: (pass) => {
      const elements = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Fe', 'Au', 'Ag', 'Cu', 'Hg', 'Pb', 'U'];
      return elements.some(elem => pass.toLowerCase().includes(elem.toLowerCase()));
    }},
    { text: "Exactly 3 consecutive vowels", fulfilled: false, check: (pass) => /[aeiou]{3}/i.test(pass) },
    { text: "Include today's date in MMDD format", fulfilled: false, check: (pass) => {
      const today = new Date();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return pass.includes(`${month}${day}`);
    }},
    { text: "Contains a palindrome of at least 3 characters", fulfilled: false, check: (pass) => {
      for (let i = 0; i < pass.length - 2; i++) {
        for (let j = i + 2; j < pass.length; j++) {
          const substring = pass.substring(i, j + 1);
          const reversed = substring.split('').reverse().join('');
          if (substring === reversed) return true;
        }
      }
      return false;
    }},
  ]);

  // Hints for step 2
  const step2Hints = [
    "For a word that rhymes with 'orange', try: sporange, borange, lorange, porange, storange, dorange, or florange.",
    "Chemical element symbols include: H, He, Li, Be, B, C, N, O, F, Ne, Na, Mg, Al, Si, P, S, Cl, Ar, K, Ca, Fe, Au, Ag, Cu, Hg, Pb, U.",
    "For 3 consecutive vowels, try combinations like 'aei', 'eou', 'iou', etc.",
    "For a palindrome, think of words/patterns that read the same backward as forward, like 'mom', 'dad', 'pop', 'aba'.",
    "Include today's date in MMDD format."
  ];
  
  useEffect(() => {
    // Retrieve username and password from session storage
    const storedUsername = sessionStorage.getItem('username');
    const storedPassword = sessionStorage.getItem('password');
    
    // Check if data exists in session storage (if user came from step 1)
    if (storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
      setLoaded(true);
    } else {
      // Redirect to step 1 if no data is found
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    if (!loaded) return;
  
    setStep2Requirements(prevRequirements =>
      prevRequirements.map(req => ({
        ...req,
        fulfilled: req.check(password)
      }))
    );
  }, [password, loaded]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if all requirements are met
    if (step2Requirements.every(req => req.fulfilled)) {
      // Navigate to pranked page
      router.push('/coding_club');
    }
  };

  const toggleHints = () => {
    setShowHints(!showHints);
  };
  
  // Get today's date for the step 2 tooltip
  const getTodayFormatted = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${month}${day}`;
  };
  
  // Get password status message
  const getPasswordStatusMessage = () => {
    const fulfilled = step2Requirements.filter(req => req.fulfilled).length;
    const total = step2Requirements.length;
    const percentage = Math.floor((fulfilled / total) * 100);
    
    if (percentage < 50) return "Need more absurdity";
    if (percentage < 100) return "Almost there...";
    return "Perfect! Ready to login";
  };
  
  // Get password status color
  const getPasswordStatusColor = () => {
    const fulfilled = step2Requirements.filter(req => req.fulfilled).length;
    const total = step2Requirements.length;
    const percentage = Math.floor((fulfilled / total) * 100);
    
    if (percentage < 50) return "bg-red-500";
    if (percentage < 100) return "bg-yellow-300";
    return "bg-green-500";
  };
  
  // Calculate password strength percentage
  const getPasswordStrengthPercentage = () => {
    const fulfilled = step2Requirements.filter(req => req.fulfilled).length;
    const total = step2Requirements.length;
    return Math.floor((fulfilled / total) * 100);
  };
  
  if (!loaded) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="w-full max-w-md text-center">
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
            <div className="inline-block animate-spin rounded-full border-4 border-blue-500 border-t-transparent h-12 w-12 mb-4"></div>
            <p className="text-gray-300">Verifying your credentials...</p>
          </div>
        </div>
      </main>
    );
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full max-w-md">
        {/* Header with logo and title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-gray-700">
              <Image src="cc-logo.jpg" width={60} height={60} alt="cc-logo" className="rounded-full" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Advanced Security Check</h1>
          <p className="text-gray-300">Final step to access the Coding Club Website</p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
          <div className="text-center mb-6">
            <span className="bg-purple-900 text-purple-100 text-xs font-semibold px-3 py-1 rounded-full">Step 2 of 2</span>
            <h2 className="text-2xl font-bold text-white mt-3">Enhance Your Password</h2>
            <p className="text-sm text-gray-400 mt-1">Meet these special requirements to continue</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="username">
                Student ID
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-not-allowed"
                id="username"
                type="text"
                value={username}
                disabled
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                id="password"
                type="text"
                placeholder="Enhance your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
              {/* Password strength indicator */}
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className={`${getPasswordStrengthPercentage() < 50 ? 'text-red-400' : 
                                  getPasswordStrengthPercentage() < 100 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {getPasswordStatusMessage()}
                  </span>
                  <span className="text-gray-400">{getPasswordStrengthPercentage()}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getPasswordStatusColor()} transition-all duration-300`} 
                    style={{ width: `${getPasswordStrengthPercentage()}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-gray-300">Advanced Requirements</h3>
                <button
                  type="button"
                  onClick={toggleHints}
                  className="text-xs font-medium text-purple-400 hover:text-purple-300 flex items-center"
                >
                  {showHints ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                      Hide hints
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      Show hints
                    </>
                  )}
                </button>
              </div>
              
              {/* Hints Section */}
              {showHints && (
                <div className="bg-gray-700 border border-gray-600 rounded-lg p-3 mb-4">
                  <h4 className="text-xs font-semibold text-purple-400 mb-2 uppercase tracking-wider">Advanced Password Tips</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {step2Hints.map((hint, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="bg-gray-700 border border-green-500 rounded-lg p-3 mb-3 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-green-400">Basic security requirements already met!</span>
              </div>
              
              <ul className="space-y-2 text-sm">
                {step2Requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className={`mt-0.5 mr-2 ${req.fulfilled ? 'text-green-400' : 'text-gray-500'}`}>
                      {req.fulfilled ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </span>
                    <span className={req.fulfilled ? 'text-gray-200' : 'text-gray-500'}>
                      {req.text}
                      {req.text === "Include today's date in MMDD format" && (
                        <span className="text-xs text-gray-400 ml-1">(Today: {getTodayFormatted()})</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              
              {step2Requirements.every(req => req.fulfilled) && (
                <div className="mt-4 p-3 bg-gray-700 border border-green-500 rounded-lg flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-green-400">All requirements met! Ready to access the club.</span>
                </div>
              )}
            </div>
            
            <div className="flex space-x-4">
              <Link
                href="/"
                className="w-1/3 py-3 px-4 rounded-xl font-medium text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all text-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </Link>
              <button
                className={`flex-1 py-3 px-4 rounded-xl font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                  step2Requirements.every(req => req.fulfilled)
                    ? 'bg-purple-600 hover:bg-purple-500 focus:ring-purple-500 shadow-md'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
                type="submit"
                disabled={!step2Requirements.every(req => req.fulfilled)}
              >
                Complete SignIn
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </form>
        </div>
        
        
      </div>
    </main>
  );
}