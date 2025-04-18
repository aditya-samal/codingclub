"use client";

import { useState } from "react";
import IntroPage from "../components/IntroPage";
import SignupPage from "../components/SignupPage";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showSignup, setShowSignup] = useState(false);
  const router = useRouter();

  const handleSuccessfulSignup = () => {
    router.push(`/meme`);
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gradient-to-br from-purple-800 to-blue-500">
      {!showSignup ? (
        <IntroPage onGetStarted={() => setShowSignup(true)} />
      ) : (
        <SignupPage onSignupSuccess={handleSuccessfulSignup} />
      )}
    </div>
  );
}
