"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ComicPage() {
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

  return (
    <div className="comic-container p-4 max-w-screen-xl mx-auto bg-gradient-to-b from-amber-50 to-amber-100">
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
            <span>Earn it</span>. See You In Coding Week.
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
