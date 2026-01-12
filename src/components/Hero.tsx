import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Text animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        delay: i * 0.03,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.1,
      },
    },
  };

  const title1 = "Made with";
  const title2 = "Love";
  const title3 = "Served with";
  const title4 = "Care";

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{ 
          backgroundImage: `url(${heroBg})`,
          y: backgroundY,
        }}
      />
      
      {/* Animated Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-sunshine-gold/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full bg-akij-red/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      {/* Content with Parallax */}
      <motion.div 
        className="relative container mx-auto px-4 py-20"
        style={{ y: textY, opacity }}
      >
        <div className="max-w-xl">
          {/* Animated Title */}
          <motion.h1 
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="overflow-hidden inline-block">
              {title1.split("").map((char, i) => (
                <motion.span
                  key={`t1-${i}`}
                  variants={letterVariants}
                  custom={i}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>{" "}
            <span className="overflow-hidden inline-block">
              {title2.split("").map((char, i) => (
                <motion.span
                  key={`t2-${i}`}
                  variants={letterVariants}
                  custom={i + title1.length}
                  className="inline-block text-akij-red"
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <br className="hidden sm:block" />
            <span className="overflow-hidden inline-block">
              {title3.split("").map((char, i) => (
                <motion.span
                  key={`t3-${i}`}
                  variants={letterVariants}
                  custom={i + title1.length + title2.length + 5}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>{" "}
            <span className="overflow-hidden inline-block">
              {title4.split("").map((char, i) => (
                <motion.span
                  key={`t4-${i}`}
                  variants={letterVariants}
                  custom={i + title1.length + title2.length + title3.length + 6}
                  className="inline-block text-sunshine-gold"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-muted-foreground mb-8"
          >
            From our family to yours — quality staple foods that bring 
            warmth to every Bangladeshi kitchen.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href="#products"
              className="group relative inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full overflow-hidden shadow-product"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="absolute inset-0 bg-sunshine-gold"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <span className="relative z-10">Explore Products</span>
            </motion.a>
            <motion.a
              href="#why-sunshine"
              className="group relative inline-flex items-center justify-center px-8 py-3 border-2 border-akij-red text-akij-red font-semibold rounded-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="absolute inset-0 bg-akij-red"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <span className="relative z-10 group-hover:text-secondary-foreground transition-colors duration-300">
                Why Sunshine
              </span>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Animated Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <motion.svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.path
            d="M0 50L48 45.7C96 41.3 192 32.7 288 35.8C384 39 480 54 576 57.2C672 60.3 768 51.7 864 48.5C960 45.3 1056 47.7 1152 50.8C1248 54 1344 58 1392 60L1440 62V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z"
            fill="hsl(var(--background))"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
        </motion.svg>
      </div>
    </section>
  );
};

export default Hero;
