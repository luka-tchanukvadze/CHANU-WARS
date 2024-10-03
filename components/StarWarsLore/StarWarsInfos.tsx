"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const titles = [
  {
    id: 1,
    title: "Light vs Dark",
    description:
      "At the heart of Star Wars lies the Force, a mystical energy field that connects every living being in the galaxy. It flows through all life and offers incredible powers to those who can tap into it. The Force is divided into two opposing sides: the Light Side, symbolizing peace, compassion, and harmony, and the Dark Side, representing anger, fear, and the thirst for power. Jedi Knights dedicate their lives to mastering the Light Side, maintaining balance and protecting the galaxy, while the Sith seek to dominate through the Dark Side's raw power. The struggle between these two sides shapes the destiny of the galaxy.",
    why_watch:
      "Embark on a journey to understand the Force, where ancient philosophies collide with personal struggles. See how the smallest decisions can ripple into galactic consequences as heroes and villains alike grapple with their place in this epic battle for balance.",
  },
  {
    id: 2,
    title: "Rise of an Empire",
    description:
      "The galaxy once thrived under the peaceful rule of the Galactic Republic, where democracy and diplomacy reigned. But in the shadows, the Sith Lord Darth Sidious manipulated events to create the Clone Wars, a conflict that tore the Republic apart from within. Under the guise of security, Palpatine transformed the Republic into the Galactic Empire, a regime of fear and oppression. This shift from democracy to tyranny sets the stage for the central conflict of Star Wars: the Rebel Alliance's courageous fight to restore freedom to the galaxy.",
    why_watch:
      "Witness the dramatic rise of a totalitarian empire and the fall of a once-great democracy. Star Wars offers a reflection of real-world themes like freedom, oppression, and the cost of power, delivered through an epic space adventure.",
  },
  {
    id: 3,
    title: "Jedi vs Sith: Destiny",
    description:
      "The Jedi Order and the Sith are more than just warriors wielding lightsabers—they represent two vastly different philosophies. The Jedi believe in self-discipline, humility, and protecting the weak, using the Force for knowledge and defense. The Sith, however, are driven by their desire for power, using the Dark Side of the Force to dominate and control. For millennia, these two orders have fought over the fate of the galaxy, their battles shaping history itself. Jedi like Obi-Wan Kenobi and Yoda stand as symbols of hope, while Sith Lords like Darth Vader and Emperor Palpatine represent the darkness threatening to consume everything.",
    why_watch:
      "Explore the deep philosophical conflict between good and evil, hope and despair, as the Jedi and Sith fight not just with weapons, but with ideologies that could change the fate of the universe. Every battle, every choice holds profound meaning.",
  },
  {
    id: 4,
    title: "Battle Among the Stars",
    description:
      "Star Wars isn't just about lightsaber duels—it's also home to some of the most epic space battles ever imagined. From the sleek X-Wings of the Rebel Alliance to the intimidating Star Destroyers of the Galactic Empire, starship combat plays a pivotal role in deciding the fate of the galaxy. Advanced technologies like hyperdrives, droids, and energy shields give this galaxy a unique identity, mixing high-tech innovation with the mysticism of the Force. These battles are not just visually stunning—they're moments where the stakes couldn't be higher for our heroes.",
    why_watch:
      "If you love action-packed, visually breathtaking scenes, Star Wars delivers intense space battles that push the limits of imagination. Feel the tension as every laser shot and maneuver could spell victory or doom for the galaxy's heroes.",
  },
  {
    id: 5,
    title: "Rebellion's Flame",
    description:
      "When the Galactic Empire's tyranny spread across the stars, a small group of freedom fighters known as the Rebel Alliance took up arms to resist. Led by iconic heroes like Princess Leia, Han Solo, and Luke Skywalker, the Rebels fought against overwhelming odds to bring down a seemingly unstoppable force. Their story is one of hope, resilience, and the belief that even the smallest spark can ignite the fires of rebellion. Meanwhile, the Empire, with its massive fleet and legions of stormtroopers, represents the crushing weight of authoritarian rule.",
    why_watch:
      "Join a rebellion that shows how ordinary people, through courage and unity, can stand against overwhelming evil. The battle between the Rebels and the Empire is one of the most gripping stories of heroism in the galaxy.",
  },
  {
    id: 6,
    title: "Legends of the Galaxy",
    description:
      "The Star Wars universe is filled with unforgettable characters, each with their own motivations, flaws, and journeys. From the farm boy turned hero, Luke Skywalker, to the conflicted and tragic villain Darth Vader, every character plays a crucial role in the larger story. Han Solo, the rogue smuggler with a heart of gold, Princess Leia, the fierce and determined leader, and Yoda, the wise Jedi Master—all contribute to the rich tapestry of Star Wars. Even characters like Boba Fett and Darth Maul, with their own complex pasts, leave lasting impressions on the galaxy.",
    why_watch:
      "Dive into the personal stories of these iconic characters, whose relationships, sacrifices, and growth make Star Wars much more than just a series of battles. Their journeys are emotional, relatable, and timeless, making Star Wars a true epic.",
  },
];

const Chevron = ({ isExpanded }: { isExpanded: boolean }) => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    initial={false}
    animate={{ rotate: isExpanded ? 180 : 0 }}
    transition={{ duration: 0.3 }}
    className="inline-block ml-2"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </motion.svg>
);

export default function StarWarsInfos() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="flex justify-center items-center min-h-[80vh] w-full perspective px-4 sm:px-6 lg:px-8"
    >
      <div className="text-center space-y-8 w-full max-w-4xl">
        <AnimatePresence>
          {titles.map((title) => (
            <motion.div
              key={title.id}
              initial={{ opacity: 1, height: "auto" }}
              animate={{
                opacity: expandedId === null || expandedId === title.id ? 1 : 0,
                height:
                  expandedId === null || expandedId === title.id ? "auto" : 0,
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <button
                className="w-full text-center text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black"
                onClick={() => toggleExpand(title.id)}
              >
                {title.title}
                <Chevron isExpanded={expandedId === title.id} />
              </button>
              <AnimatePresence>
                {expandedId === title.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-yellow-300 text-base sm:text-lg"
                  >
                    <p>{title.description}</p>
                    <br />
                    <p className=" text-center text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black">
                      Why You Can't Miss This
                    </p>
                    <br />
                    <p>{title.why_watch}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
