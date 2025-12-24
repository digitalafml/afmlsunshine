import atta from "@/assets/products/atta.png";
import rice from "@/assets/products/rice.png";
import soybeanOil from "@/assets/products/soybean-oil.png";
import suji from "@/assets/products/suji.png";

const categories = [
  {
    name: "Flour",
    namebn: "আটা",
    description: "Premium quality atta & maida for soft, fluffy rotis",
    image: atta,
  },
  {
    name: "Rice",
    namebn: "চাল",
    description: "Aromatic Chinigura and premium rice varieties",
    image: rice,
  },
  {
    name: "Edible Oil",
    namebn: "তেল",
    description: "Pure, healthy cooking oils for every kitchen",
    image: soybeanOil,
  },
  {
    name: "Semolina",
    namebn: "সুজি",
    description: "Fine suji for delicious halwa & desserts",
    image: suji,
  },
];

const ProductCategories = () => {
  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
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
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-product transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Product Image */}
              <div className="relative h-48 mb-4 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-xl" />
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="font-serif text-xl text-foreground mb-1">
                  {category.name}
                </h3>
                <span className="text-primary font-medium text-sm">
                  {category.namebn}
                </span>
                <p className="text-muted-foreground text-sm mt-2">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
