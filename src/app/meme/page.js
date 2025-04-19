"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function ComicPage() {
  const audioRef = useRef(null);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const comicData = [
    {
      src: "/image1.jpg",
      position: "md:col-span-4",
    },
    {
      src: "/image2.jpg",
      position: "md:col-span-2",
    },
    {
      src: "/image3.jpeg",
      position: "md:col-span-3",
    },
  ];

  useEffect(() => {
    // Initialize audio after component mounts (for browser compatibility)
    if (audioRef.current) {
      audioRef.current.volume = 1; // Set to 50% volume

      // Play audio after a short delay to ensure it's loaded
      const playPromise = audioRef.current.play();

      // Handle play promise to avoid errors in browsers that don't support autoplay
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            // Autoplay was prevented, show play button instead
            console.log("Autoplay prevented:", error);
          });
      }
    }

    setAudioLoaded(true);
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className="comic-container p-4 max-w-screen-xl mx-auto"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundRepeat: "repeat",
        backgroundColor: "#efede4",
      }}
    >
      {/* Audio element */}
      <audio ref={audioRef} src="/background-music.mp3" loop />

      {/* Audio control button */}
      {audioLoaded && (
        <button
          onClick={toggleAudio}
          className="fixed top-4 right-4 z-10 bg-amber-700 text-white p-2 rounded-full shadow-md hover:bg-amber-800 transition-colors"
          aria-label={isPlaying ? "Mute music" : "Play music"}
        >
          {isPlaying ? (
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
            </span>
          ) : (
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            </span>
          )}
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6">
        {comicData.map((panel, index) => (
          <div
            key={index}
            className={`${panel.position} transform hover:scale-105 transition-transform duration-300`}
          >
            <ComicPanel src={panel.src} index={index} />
          </div>
        ))}
      </div>

      <div className="text-center my-8">
        <div className="bg-yellow-100 border-2 border-black p-4 mx-auto max-w-3xl shadow-md">
          <h1 className="text-2xl md:text-3xl font-bold text-black py-2 leading-tight">
            You won&apos;t get anything for free in Coding Club.{" "}
            <span className="text-amber-600">Earn it</span>. See You In Coding
            Week.
          </h1>
        </div>
      </div>
    </div>
  );
}

function ComicPanel({ src, index }) {
  const [imgError, setImgError] = useState(false);
  const [panelStyle, setPanelStyle] = useState({
    rotation: "rotate-0",
    shadow: "shadow-md",
    border: "border-4 border-black",
  });

  useEffect(() => {
    const rotations = [
      "rotate-0",
      "rotate-1",
      "-rotate-1",
      "rotate-2",
      "-rotate-2",
    ];
    const shadows = ["shadow-md", "shadow-lg", "shadow-xl"];
    const borders = [
      "border-4 border-black",
      "border-[5px] border-black",
      "border-[3px] border-black",
    ];

    const rotationIndex = index % rotations.length;
    const shadowIndex = (index + 1) % shadows.length;
    const borderIndex = (index + 2) % borders.length;

    setPanelStyle({
      rotation: rotations[rotationIndex],
      shadow: shadows[shadowIndex],
      border: borders[borderIndex],
    });
  }, [index]);

  return (
    <div className={`comic-panel mb-4 ${panelStyle.rotation}`}>
      <div
        className={`relative ${panelStyle.border} ${panelStyle.shadow} bg-white overflow-hidden`}
      >
        {!imgError ? (
          <Image
            src={src}
            alt="Comic panel"
            width={1200} // or the image's real width
            height={800} // use real height or maintain aspect ratio
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            className="object-cover w-full h-auto"
            priority={index < 2}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-72 flex items-center justify-center text-black bg-gray-100">
            <span className="font-bold">Image not found</span>
          </div>
        )}
      </div>
    </div>
  );
}
