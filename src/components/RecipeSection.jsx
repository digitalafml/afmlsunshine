import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

const recipes = [
  {
    id: "dJJB2RjGop4",
    thumbnail: `https://img.youtube.com/vi/dJJB2RjGop4/maxresdefault.jpg`,
  },
  {
    id: "DGWgGYii6qs",
    thumbnail: `https://img.youtube.com/vi/DGWgGYii6qs/maxresdefault.jpg`,
  },
  {
    id: "sqcWOq3eKUM",
    thumbnail: `https://img.youtube.com/vi/sqcWOq3eKUM/maxresdefault.jpg`,
  },
  {
    id: "HWY5pt8piuA",
    thumbnail: `https://img.youtube.com/vi/HWY5pt8piuA/maxresdefault.jpg`,
  },
];

const RecipeSection = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="recipes" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Try Recipes Made with{" "}
            <span className="text-primary">Sunshine Products</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover delicious recipes crafted with our premium quality products
          </p>
        </motion.div>

        {/* Recipe Videos Grid - Vertical format for Shorts */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto"
        >
          {recipes.map((recipe) => (
            <motion.div
              key={recipe.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-product transition-shadow duration-300"
            >
              <button
                onClick={() => setActiveVideo(recipe.id)}
                className="relative aspect-[9/16] overflow-hidden w-full"
                aria-label="Play recipe video"
              >
                <img
                  src={recipe.thumbnail}
                  alt="Recipe video"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/40 transition-all duration-300" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary flex items-center justify-center shadow-lg"
                  >
                    <Play className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground ml-1" fill="currentColor" />
                  </motion.div>
                </div>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-sm p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm aspect-[9/16]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
                aria-label="Close video"
              >
                <X className="w-8 h-8" />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="Recipe Video"
                className="w-full h-full rounded-2xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RecipeSection;
