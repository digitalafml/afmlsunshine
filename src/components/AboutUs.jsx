import { motion } from "framer-motion";
import facility1 from "@/assets/about/facility-1.png";
import facility2 from "@/assets/about/facility-2.png";
import facility3 from "@/assets/about/facility-3.png";
import facility4 from "@/assets/about/facility-4.png";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const AboutUs = () => {
  const images = [facility1, facility2, facility3, facility4];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 bg-primary/10 text-sunshine-gold font-medium rounded-full text-sm mb-4">
            About Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            About Akij Flour Mills Ltd.
          </h2>
        </motion.div>

        {/* Content */}
        <motion.div 
          className="max-w-4xl mx-auto space-y-6 mb-12"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.p 
            className="text-muted-foreground leading-relaxed"
            variants={fadeInUp}
          >
            Akij Flour Mills Ltd., a proud concern of Akij Insaf, is a leading name in Bangladesh's flour industry. Established in 2014 in Narayanganj, the company began its commercial operations in 2016. Driven by a commitment to premium quality and exceptional service—hallmarks of the AKIJ legacy—Akij Flour Mills has earned the trust and loyalty of millions under its flagship brand, SUNSHINE.
          </motion.p>
          <motion.p 
            className="text-muted-foreground leading-relaxed"
            variants={fadeInUp}
          >
            Equipped with state-of-the-art BUHLER machinery from Switzerland, our facility boasts a daily production capacity of 1,200 metric tons. This advanced technology ensures consistency, purity, and reliability across every product we deliver.
          </motion.p>
          <motion.p 
            className="text-muted-foreground leading-relaxed"
            variants={fadeInUp}
          >
            Our flour is a preferred choice among leading snack and bakery brands seeking uncompromising quality. Through a robust multichannel sales strategy, Akij Flour Mills has established a strong presence in both retail consumer packs and the bulk market, where we are widely recognized as a service-first, dependable partner.
          </motion.p>
          <motion.p 
            className="text-muted-foreground leading-relaxed"
            variants={fadeInUp}
          >
            Building on this success, we have diversified into other essential food categories, including rice, pulses, and edible oil. With an unwavering focus on quality and safety, Akij Flour Mills continues to grow as a trusted name in nutritious food products—nourishing homes across Bangladesh.
          </motion.p>
        </motion.div>

        {/* Image Collage */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="aspect-[4/3] overflow-hidden rounded-lg shadow-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={image}
                alt={`Akij Flour Mills facility ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
