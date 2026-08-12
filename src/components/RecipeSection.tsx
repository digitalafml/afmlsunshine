import { useState } from "react";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";


const RecipeSection = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const { content } = useSiteContent();
  const section = content.recipes;
  const recipes = section.videos.filter(Boolean);

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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section id="recipes" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header with Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            {section.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {section.title} <span className="text-gradient-sunshine">{section.highlight}</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {section.description}
          </p>
        </motion.div>

        {/* Recipe Video Grid - Portrait/Shorts Style */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {recipes.map((recipe, i) => (
            <motion.div
              key={recipe + i}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-product transition-all duration-300 cursor-pointer"
              onClick={() => setActiveVideo(recipe)}
            >
              {/* Thumbnail - Portrait Aspect Ratio for Shorts */}
              <div className="relative aspect-[9/16] overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${recipe}/maxresdefault.jpg`}
                  alt="Recipe video"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Play className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground ml-0.5" fill="currentColor" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Video Modal - Portrait for Shorts */}
      {activeVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 backdrop-blur-sm p-4"
          onClick={() => setActiveVideo(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-sm aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 md:top-4 md:right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* YouTube Shorts Embed */}
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
              title="Recipe video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default RecipeSection;
