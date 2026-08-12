import { useState } from "react";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
}

const videos: VideoItem[] = [
  {
    id: "IEEjAiUorac",
    title: "Sunshine TVC - Family Moments",
    thumbnail: `https://img.youtube.com/vi/IEEjAiUorac/maxresdefault.jpg`,
  },
  {
    id: "hZgbNkbdCLs",
    title: "Sunshine TVC - Quality Promise",
    thumbnail: `https://img.youtube.com/vi/hZgbNkbdCLs/maxresdefault.jpg`,
  },
  {
    id: "OkpKgpvY9gE",
    title: "Sunshine TVC - Pure Goodness",
    thumbnail: `https://img.youtube.com/vi/OkpKgpvY9gE/maxresdefault.jpg`,
  },
  {
    id: "tpX3wqzPdcA",
    title: "Sunshine Advert",
    thumbnail: `https://img.youtube.com/vi/tpX3wqzPdcA/maxresdefault.jpg`,
  },
  {
    id: "sFBlxEwbGTM",
    title: "Sunshine Advert",
    thumbnail: `https://img.youtube.com/vi/sFBlxEwbGTM/maxresdefault.jpg`,
  },
  {
    id: "eTpodxrJRzs",
    title: "Sunshine Advert",
    thumbnail: `https://img.youtube.com/vi/eTpodxrJRzs/maxresdefault.jpg`,
  },
];

const MediaSection = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="media" className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Media Gallery
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Watch Our <span className="text-gradient-sunshine">Adverts</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the warmth and quality of Sunshine through our television commercials
          </p>
        </motion.div>

        {/* Video Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {videos.map((video) => (
            <motion.div
              key={video.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-product transition-shadow duration-300 cursor-pointer"
              onClick={() => setActiveVideo(video.id)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt="Advertisement video"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Play className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground ml-1" fill="currentColor" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Video Modal */}
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
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
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
            
            {/* YouTube Embed */}
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
              title="YouTube video player"
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

export default MediaSection;
