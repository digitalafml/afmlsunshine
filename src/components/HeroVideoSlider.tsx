import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const heroVideoIds = ["tpX3wqzPdcA", "sFBlxEwbGTM", "eTpodxrJRzs"];

const SLIDE_DURATION = 14000;

const HeroVideoSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % heroVideoIds.length),
      SLIDE_DURATION
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-foreground/5">
      <AnimatePresence mode="sync">
        <motion.div
          key={heroVideoIds[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          {/* 16:9 cover sizing so the video fills the hero without letterboxing */}
          <iframe
            title="Sunshine brand video"
            src={`https://www.youtube.com/embed/${heroVideoIds[index]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${heroVideoIds[index]}&modestbranding=1&playsinline=1&rel=0&showinfo=0&disablekb=1&fs=0`}
            allow="autoplay; encrypted-media; picture-in-picture"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
          />
        </motion.div>
      </AnimatePresence>

      {/* Slide indicators */}
      <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroVideoIds.map((id, i) => (
          <button
            key={id}
            onClick={() => setIndex(i)}
            aria-label={`Show video ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-primary" : "w-2 bg-foreground/30 hover:bg-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroVideoSlider;
