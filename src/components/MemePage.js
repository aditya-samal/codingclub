import React from "react";

export default function MemePage({ onLogout }) {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 w-96 text-center">
      <h1 className="text-gray-800 mb-5 text-xl font-bold">
        Welcome to the{" "}
        <span className="text-purple-700 font-bold">Coding Club</span>!
      </h1>

      <div className="text-center">
        <h2 className="text-lg mb-4">
          Unfortunately here you don't get anything for free...
        </h2>
        <div className="my-5">
          <img
            src="/meme.gif"
            alt="Meme: When you finally figure out the password requirements"
            className="max-w-full rounded-lg"
          />
        </div>
        <h2 className="text-lg mb-4">See u in the coding week.</h2>
      </div>

      <button
        onClick={onLogout}
        className="bg-purple-700 text-white border-none py-3 px-5 rounded-md cursor-pointer text-base transition-colors hover:bg-purple-800"
      >
        Logout
      </button>
    </div>
  );
}
