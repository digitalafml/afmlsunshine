import { motion } from "framer-motion";
import atta from "@/assets/products/atta.png";
import brownAtta from "@/assets/products/brown-atta.png";
import maida from "@/assets/products/maida.png";
import rice from "@/assets/products/rice.png";
import soybeanOil from "@/assets/products/soybean-oil.png";
import mustardOil from "@/assets/products/mustard-oil.png";
import riceBranOil from "@/assets/products/rice-bran-oil.png";
import suji from "@/assets/products/suji.png";

const products = [
  {
    name: "Atta",
    namebn: "আটা",
    description: "Premium quality atta for soft, fluffy rotis",
    image: atta,
  },
  {
    name: "Brown Atta",
    namebn: "ব্রাউন আটা",
    description: "Wholesome brown atta rich in fiber",
    image: brownAtta,
  },
  {
    name: "Maida",
    namebn: "ময়দা",
    description: "Fine maida for bakery and confectionery",
    image: maida,
  },
  {
    name: "Suji",
    namebn: "সুজি",
    description: "Fine suji for delicious halwa & desserts",
    image: suji,
  },
  {
    name: "Rice",
    namebn: "চাল",
    description: "Aromatic Chinigura and premium rice varieties",
    image: rice,
  },
  {
    name: "Soybean Oil",
    namebn: "সয়াবিন তেল",
    description: "Pure, healthy soybean oil for everyday cooking",
    image: soybeanOil,
  },
  {
    name: "Mustard Oil",
    namebn: "সরিষার তেল",
    description: "Traditional mustard oil with rich aroma",
    image: mustardOil,
  },
  {
    name: "Rice Bran Oil",
    namebn: "রাইস ব্রান অয়েল",
    description: "Heart-healthy rice bran oil for your kitchen",
    image: riceBranOil,
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" }
};

const ProductCategories = () => {
  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 bg-primary/10 text-sunshine-gold font-medium rounded-full text-sm mb-4">
            Our Products
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Quality Staples for Your Family
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From breakfast to dinner, Sunshine brings you the finest ingredients 
            to make every meal special.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              className="group bg-card rounded-2xl p-4 md:p-6 shadow-card hover:shadow-product transition-shadow duration-300"
              initial="initial"
              whileInView="whileInView"
              viewport={cardVariants.viewport}
              variants={cardVariants}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Product Image */}
              <div className="relative h-32 md:h-40 mb-4 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-xl" />
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-auto object-contain"
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="font-serif text-lg md:text-xl text-foreground mb-1">
                  {product.name}
                </h3>
                <span className="text-primary font-medium text-xs md:text-sm">
                  {product.namebn}
                </span>
                <p className="text-muted-foreground text-xs md:text-sm mt-2 line-clamp-2">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
