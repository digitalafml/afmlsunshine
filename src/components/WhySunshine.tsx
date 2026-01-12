import { motion, useInView } from "framer-motion";
import { Heart, Shield, Sparkles, Award } from "lucide-react";
import { useRef } from "react";

const reasons = [
  {
    icon: Heart,
    title: "Made with Love",
    description:
      "Every product is crafted with care, bringing warmth and love to your family's meals.",
    color: "text-akij-red",
    bgColor: "bg-akij-red/10",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(185,55,80,0.3)]",
  },
  {
    icon: Shield,
    title: "Trusted Quality",
    description:
      "Backed by decades of excellence in quality and reliability.",
    color: "text-sunshine-gold",
    bgColor: "bg-primary/10",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(204,163,0,0.3)]",
  },
  {
    icon: Sparkles,
    title: "100% Hygienic",
    description:
      "Produced in state-of-the-art facilities with the highest hygiene standards.",
    color: "text-sunshine-orange",
    bgColor: "bg-accent/10",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(230,138,0,0.3)]",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Only the finest ingredients sourced from trusted farmers across Bangladesh.",
    color: "text-sunshine-gold",
    bgColor: "bg-primary/10",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(204,163,0,0.3)]",
  },
];

const WhySunshine = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { 
      rotate: [0, -10, 10, -10, 0],
      scale: 1.2,
      transition: { duration: 0.5 }
    },
  };

  return (
    <section id="why-sunshine" className="py-20 bg-cream overflow-hidden">
      <div className="container mx-auto px-4" ref={containerRef}>
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span 
            className="inline-block px-4 py-1 bg-akij-red/10 text-akij-red font-medium rounded-full text-sm mb-4"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(185, 55, 80, 0.2)" }}
            transition={{ duration: 0.2 }}
          >
            Why Choose Us
          </motion.span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Why Families Choose{" "}
            <motion.span 
              className="text-gradient-sunshine inline-block"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Sunshine
            </motion.span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're not just a food brand — we're a promise of quality, 
            love, and trust to every Bangladeshi home.
          </p>
        </motion.div>

        {/* Features Grid with Stagger Effect */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              className={`group text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm transition-all duration-500 ${reason.glowColor}`}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              {/* Animated Icon Container */}
              <motion.div
                className={`relative inline-flex items-center justify-center w-20 h-20 rounded-2xl ${reason.bgColor} mb-6 overflow-hidden`}
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
              >
                {/* Rotating Background Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  animate={{
                    background: [
                      "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent)",
                      "conic-gradient(from 360deg, transparent, rgba(255,255,255,0.3), transparent)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <reason.icon className={`w-10 h-10 ${reason.color} relative z-10`} />
              </motion.div>

              {/* Content */}
              <motion.h3 
                className="font-serif text-xl text-foreground mb-3"
                whileHover={{ scale: 1.02 }}
              >
                {reason.title}
              </motion.h3>
              <motion.p 
                className="text-muted-foreground text-sm leading-relaxed"
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 1 }}
              >
                {reason.description}
              </motion.p>

              {/* Bottom Line Animation */}
              <motion.div
                className={`h-1 rounded-full mt-4 mx-auto ${reason.bgColor}`}
                initial={{ width: 0 }}
                whileInView={{ width: "60%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhySunshine;
