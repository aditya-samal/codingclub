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
    <div
      className="flex text-gray-800 justify-center items-center w-full min-h-screen"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundRepeat: "repeat",
        backgroundColor: "#efede4",
      }}
    >
      {!showSignup ? (
        <IntroPage onGetStarted={() => setShowSignup(true)} />
      ) : (
        <SignupPage onSignupSuccess={handleSuccessfulSignup} />
      )}
    </div>
  );
}
