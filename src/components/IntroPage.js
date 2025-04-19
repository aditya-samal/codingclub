import React from "react";

export default function IntroPage({ onGetStarted }) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-8 w-96 text-center border border-gray-200">
      <h1 className="text-gray-800 mb-5 text-xl font-bold">
        Welcome to the{" "}
        <span className="text-amber-700 font-bold">Coding Club</span>
      </h1>
      <p className="mb-6 text-gray-600">
        Join our exclusive community of creative coders!
      </p>
      <button
        onClick={onGetStarted}
        className="bg-amber-700 text-white border-none py-3 px-5 rounded-md cursor-pointer text-base transition-colors hover:bg-amber-800"
      >
        Get Started
      </button>
    </div>
  );
}
