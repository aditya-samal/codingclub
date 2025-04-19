import { useState } from "react";

export default function SignupPage({ onSignupSuccess }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [attemptCount, setAttemptCount] = useState(0);
  const [revealedRequirements, setRevealedRequirements] = useState([]);

  const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const endsWithPrime = (password) => {
    const match = password.match(/(\d+)$/);
    if (match) {
      const number = parseInt(match[0], 10);
      return isPrime(number);
    }
    return false;
  };

  const getFirstFailingRequirement = (password) => {
    const validations = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      password.includes("cc"),
      endsWithPrime(password),
    ];

    for (let i = 0; i < validations.length; i++) {
      if (!validations[i]) {
        return i + 1;
      }
    }
    return 0;
  };

  const allRevealedRequirementsMet = (password) => {
    const validations = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      password.includes("cc"),
      endsWithPrime(password),
    ];

    for (let i = 0; i < revealedRequirements.length; i++) {
      const reqIndex = revealedRequirements[i] - 1;
      if (!validations[reqIndex]) {
        return false;
      }
    }

    return true;
  };

  const revealRequirement = (reqIndex) => {
    if (!revealedRequirements.includes(reqIndex)) {
      setRevealedRequirements((prev) => [...prev, reqIndex]);
      return true;
    }
    return false;
  };

  const handleSignup = () => {
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setAttemptCount((prev) => prev + 1);

    if (!allRevealedRequirementsMet(password)) {
      setErrorMessage("Your password doesn't meet the requirements.");
      return;
    }

    const failingReq = getFirstFailingRequirement(password);

    if (failingReq === 0) {
      onSignupSuccess(username, attemptCount);
      return;
    }

    const newReq = revealRequirement(failingReq);

    if (newReq) {
      setErrorMessage(
        "Oops! Your password needs to meet an additional requirement."
      );
    } else {
      setErrorMessage("Your password still doesn't meet all requirements.");
    }
  };

  const getRequirementStatus = (reqIndex) => {
    const validations = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      password.includes("cc"),
      endsWithPrime(password),
    ];

    const reqIdx = reqIndex - 1;
    return validations[reqIdx] ? "text-green-600" : "text-red-500";
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white/90 backdrop-blur-sm shadow-md rounded-lg border border-gray-200">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Sign Up for <span className="text-amber-700">Coding Club</span>
      </h1>

      <div className="mb-4">
        <label className="block font-medium mb-1">Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <span
            className="absolute right-3 top-2.5 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
      </div>

      {/* Confirm Password Field */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Confirm Password</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <span
            className="absolute right-3 top-2.5 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </span>
        </div>
      </div>

      {revealedRequirements.length > 0 && (
        <div className="mb-4">
          <p className="font-medium">Password must:</p>
          <ul className="list-disc list-inside">
            {[1, 2, 3, 4, 5, 6, 7].map(
              (reqIndex) =>
                revealedRequirements.includes(reqIndex) && (
                  <li key={reqIndex} className={getRequirementStatus(reqIndex)}>
                    {reqIndex === 1 && "Be at least 8 characters long"}
                    {reqIndex === 2 && "Contain at least one uppercase letter"}
                    {reqIndex === 3 && "Contain at least one lowercase letter"}
                    {reqIndex === 4 && "Contain at least one number"}
                    {reqIndex === 5 && "Contain at least one special character"}
                    {reqIndex === 6 && 'Contain the text "cc" (Coding Club)'}
                    {reqIndex === 7 && "End with a prime number"}
                  </li>
                )
            )}
          </ul>
        </div>
      )}

      <button
        onClick={handleSignup}
        className="w-full bg-amber-700 text-white py-2 rounded-md hover:bg-amber-800 transition"
      >
        Sign Up
      </button>

      {errorMessage && (
        <div className="mt-3 text-sm text-red-600 text-center">
          {errorMessage}
        </div>
      )}

      {attemptCount >= 3 && (
        <div className="mt-3 text-center text-gray-600 text-sm">
          Attempts: {attemptCount} (
          {Math.min(100, Math.round((attemptCount / 15) * 100))}% frustrated)
        </div>
      )}
    </div>
  );
}
