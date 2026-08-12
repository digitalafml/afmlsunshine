import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";


const ProductCategories = () => {
  const { content } = useSiteContent();
  const section = content.products;
  const products = section.items;
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9,
      rotateX: 15,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" as const }
    },
  };

  return (
    <section id="products" className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4" ref={containerRef}>
        {/* Section Header with Blur Animation */}
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span 
            className="inline-block px-4 py-1 bg-primary/10 text-sunshine-gold font-medium rounded-full text-sm mb-4"
            whileHover={{ scale: 1.05 }}
          >
            {section.badge}
          </motion.span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            {section.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {section.subtitle}
          </p>
        </motion.div>

        {/* Products Grid with 3D Card Effect */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ perspective: "1000px" }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.name + index}
              className="group relative bg-card rounded-2xl p-4 md:p-6 shadow-card cursor-pointer"
              variants={itemVariants}
              whileHover={{ 
                y: -12,
                rotateY: 5,
                rotateX: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Gradient Border Effect on Hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(135deg, hsl(45 100% 50% / 0.3), hsl(350 75% 45% / 0.3))",
                  padding: "2px",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              {/* Product Image with Float Animation */}
              <div className="relative h-32 md:h-40 mb-4 flex items-center justify-center">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-auto object-contain relative z-10"
                  whileHover={{ 
                    scale: 1.15,
                    rotate: [0, -3, 3, 0],
                    transition: { 
                      scale: { duration: 0.3 },
                      rotate: { duration: 0.4, ease: "easeInOut" }
                    }
                  }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }
                  }}
                />
              </div>

              {/* Content with Slide-up on Hover */}
              <div className="text-center relative">
                <motion.h3 
                  className="font-serif text-lg md:text-xl text-foreground mb-1"
                  whileHover={{ scale: 1.02 }}
                >
                  {product.name}
                </motion.h3>
                <motion.span 
                  className="text-primary font-medium text-xs md:text-sm inline-block"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ scale: 1.1, opacity: 1 }}
                >
                  {product.namebn}
                </motion.span>
                <motion.p 
                  className="text-muted-foreground text-xs md:text-sm mt-2 line-clamp-2"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                >
                  {product.description}
                </motion.p>
              </div>

              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.div
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ translateX: ["−100%", "200%"] }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCategories;
