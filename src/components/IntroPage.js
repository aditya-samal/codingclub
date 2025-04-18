import React from "react";

export default function IntroPage({ onGetStarted }) {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 w-96 text-center">
      <h1 className="text-gray-800 mb-5 text-xl font-bold">
        Welcome to the{" "}
        <span className="text-purple-700 font-bold">Coding Club</span>
      </h1>
      <p className="mb-6">Join our exclusive community of creative coders!</p>
      <button
        onClick={onGetStarted}
        className="bg-purple-700 text-white border-none py-3 px-5 rounded-md cursor-pointer text-base transition-colors hover:bg-purple-800"
      >
        Get Started
      </button>
    </div>
  );
}
