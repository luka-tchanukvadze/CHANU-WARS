"use client";

import { useState, useEffect } from "react";

const titles = [
  {
    id: 1,
    title: "A New Hope",
    description: "The first film in the original Star Wars trilogy.",
  },
  {
    id: 2,
    title: "The Empire Strikes Back",
    description: "The second installment in the original Star Wars trilogy.",
  },
  {
    id: 3,
    title: "Return of the Jedi",
    description: "The third and final film in the original Star Wars trilogy.",
  },
  {
    id: 4,
    title: "The Phantom Menace",
    description: "The first film in the Star Wars prequel trilogy.",
  },
  {
    id: 5,
    title: "Attack of the Clones",
    description: "The second installment of the Star Wars prequel trilogy.",
  },
  {
    id: 6,
    title: "Revenge of the Sith",
    description:
      "The third and final installment of the Star Wars prequel trilogy.",
  },
  {
    id: 7,
    title: "The Force Awakens",
    description: "The first film in the Star Wars sequel trilogy.",
  },
  {
    id: 8,
    title: "The Last Jedi",
    description: "The second installment of the Star Wars sequel trilogy.",
  },
  {
    id: 9,
    title: "The Rise of Skywalker",
    description:
      "The third and final installment of the Star Wars sequel trilogy.",
  },
  {
    id: 10,
    title: "Rogue One",
    description:
      "A standalone Star Wars film set just before the events of A New Hope.",
  },
];

const StarWarsInfos = () => {
  const [selectedTitle, setSelectedTitle] = useState<any>(null);

  return (
    <div className="flex justify-center items-center relative h-screen w-full overflow-hidden  perspective">
      <div
        className={`flex justify-center items-center
        }`}
      >
        <div className="text-center">
          {titles.map((title) => (
            <button
              key={title.id}
              className="mb-8 block w-full text-center text-4xl font-bold text-yellow-400 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black"
              onClick={() => setSelectedTitle(title)}
            >
              {title.title}
            </button>
          ))}
        </div>
      </div>
      {selectedTitle && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-gray-900 text-yellow-400 p-8 rounded-lg max-w-md w-full relative">
            <h2 className="text-2xl font-bold mb-4">{selectedTitle.title}</h2>
            <p>{selectedTitle.description}</p>
            <button
              className="absolute top-2 right-2 text-yellow-400 hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-full"
              onClick={() => setSelectedTitle(null)}
            >
              X<span className="sr-only">Close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StarWarsInfos;
