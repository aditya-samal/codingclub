"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Step1Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showHints, setShowHints] = useState(false);
  
  const initialRequirements = [
    { text: "Between 10-16 characters", fulfilled: false, check: (pass) => pass.length >= 10 && pass.length <= 16 },
    { text: "At least 2 uppercase letters not at the beginning", fulfilled: false, check: (pass) => {
      const matches = pass.match(/[A-Z]/g) || [];
      return matches.length >= 2 && !/^[A-Z]/.test(pass);
    }},
    { text: "At least 1 number that is not 1, 2, 3, or 0", fulfilled: false, check: (pass) => /[4-9]/.test(pass) },
    { text: "At least 2 special characters from: !@#$%^&*", fulfilled: false, check: (pass) => {
      const specialChars = pass.match(/[!@#$%^&*]/g) || [];
      return specialChars.length >= 2;
    }},
    { text: "No repeating characters (e.g., 'aa', 'bb')", fulfilled: false, check: (pass) => !/(.)\1/.test(pass) },
    { text: "Must include one of: 'secure', 'pass', 'key'", fulfilled: false, check: (pass) => 
      /(secure|pass|key)/i.test(pass)
    },
    { text: "Cannot contain your username", fulfilled: false, check: (pass) => 
      username === '' || !pass.toLowerCase().includes(username.toLowerCase())
    },
  ];

  const [step1Requirements, setStep1Requirements] = useState(initialRequirements);

  const step1Hints = [
    "Try using a combination of uppercase and lowercase letters, but don’t start with uppercase.",
    "Include keywords like ‘secure’, ‘pass’, or ‘key’ in your password.",
    "Use numbers between 4-9 (avoid 0, 1, 2, 3).",
    "Special characters (!@#$%^&*) make your password stronger.",
    "Make sure no character appears twice in a row.",
    "Aim for 10-16 characters total."
  ];

  useEffect(() => {
    const updatedRequirements = step1Requirements.map(req => ({
      ...req,
      fulfilled: req.check(password)
    }));
    setStep1Requirements(updatedRequirements);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step1Requirements.every(req => req.fulfilled)) {
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('password', password);
      router.push('/step2');
    }
  };

  const toggleHints = () => setShowHints(!showHints);

  const getPasswordStatusMessage = () => {
    const percentage = getPasswordStrengthPercentage();
    if (percentage < 30) return "needs improvement";
    if (percentage < 60) return "Weak";
    if (percentage < 100) return "Getting stronger...";
    return "Strong enough for stage 1";
  };

  const getPasswordStatusColor = () => {
    const percentage = getPasswordStrengthPercentage();
    if (percentage < 30) return "bg-red-500";
    if (percentage < 60) return "bg-yellow-500";
    if (percentage < 100) return "bg-yellow-300";
    return "bg-green-500";
  };

  const getPasswordStrengthPercentage = () => {
    const fulfilled = step1Requirements.filter(req => req.fulfilled).length;
    const total = step1Requirements.length;
    return Math.floor((fulfilled / total) * 100);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-gray-700">
              <Image src="/cc-logo.jpg" width={60} height={60} alt="Coding Club Logo" className="rounded-full" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Coding Club Portal</h1>
          <p className="text-gray-300">Let&apos;s complete your profile</p>
        </div>

        <div className="bg-blue-900 p-8 rounded-xl shadow-lg border border-gray-700">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mt-3">Create Your Profile</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="username">
                Student ID
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                id="username"
                type="text"
                placeholder="Enter your student ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                id="password"
                type="text"
                placeholder="Create your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className={
                    getPasswordStrengthPercentage() < 30 ? 'text-red-400' :
                    getPasswordStrengthPercentage() < 60 ? 'text-yellow-400' :
                    getPasswordStrengthPercentage() < 100 ? 'text-blue-400' : 'text-green-400'
                  }>
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
                <h3 className="text-sm font-semibold text-gray-300">Password Requirements</h3>
                <button
                  type="button"
                  onClick={toggleHints}
                  className="text-xs font-medium text-blue-400 hover:text-blue-300 flex items-center"
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

              {showHints && (
                <div className="bg-gray-700 border border-gray-600 rounded-lg p-3 mb-4">
                  <h4 className="text-xs font-semibold text-blue-400 mb-2 uppercase tracking-wider">Password Tips</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {step1Hints.map((hint, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <ul className="space-y-2 text-sm">
                {step1Requirements.map((req, index) => (
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
                    <span className={req.fulfilled ? 'text-gray-200' : 'text-gray-500'}>{req.text}</span>
                  </li>
                ))}
              </ul>

              {step1Requirements.every(req => req.fulfilled) && (
                <div className="mt-4 p-3 bg-gray-700 border border-green-500 rounded-lg flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-green-400">All requirements met! Ready for advanced security.</span>
                </div>
              )}
            </div>

            <div>
              <button
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                  step1Requirements.every(req => req.fulfilled)
                    ? 'bg-blue-600 hover:bg-blue-500 focus:ring-blue-500 shadow-md'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
                type="submit"
                disabled={!step1Requirements.every(req => req.fulfilled)}
              >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
