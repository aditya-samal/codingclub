import { useState } from "react";

export default function SignupPage({ onSignupSuccess }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    if (!username || !email || !password) {
      setErrorMessage("Please fill in all fields.");
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
    return validations[reqIdx] ? "valid" : "invalid";
  };

  return (
    <div className="content-box">
      <h1>
        Sign Up for <span className="code-text">Coding Club</span>
      </h1>

      <div className="input-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">Password</label>
        <div className="password-toggle">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="toggle-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            👁️
          </span>
        </div>

        {revealedRequirements.length > 0 && (
          <div className="password-requirements">
            <p>Password must:</p>
            <ul id="requirements">
              {[1, 2, 3, 4, 5, 6, 7].map(
                (reqIndex) =>
                  revealedRequirements.includes(reqIndex) && (
                    <li
                      key={reqIndex}
                      className={getRequirementStatus(reqIndex)}
                    >
                      {reqIndex === 1 && "Be at least 8 characters long"}
                      {reqIndex === 2 &&
                        "Contain at least one uppercase letter"}
                      {reqIndex === 3 &&
                        "Contain at least one lowercase letter"}
                      {reqIndex === 4 && "Contain at least one number"}
                      {reqIndex === 5 &&
                        "Contain at least one special character"}
                      {reqIndex === 6 && 'Contain the text "cc" (Coding Club)'}
                      {reqIndex === 7 && "End with a prime number"}
                    </li>
                  )
              )}
            </ul>
          </div>
        )}
      </div>

      <button onClick={handleSignup} className={errorMessage ? "shake" : ""}>
        Sign Up
      </button>

      {errorMessage && <div className="message error">{errorMessage}</div>}

      {attemptCount >= 3 && (
        <div className="attempt-counter">
          Attempts: {attemptCount} (
          {Math.min(100, Math.round((attemptCount / 15) * 100))}% frustrated)
        </div>
      )}
    </div>
  );
}
