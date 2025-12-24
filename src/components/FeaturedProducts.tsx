import atta from "@/assets/products/atta.png";
import brownAtta from "@/assets/products/brown-atta.png";
import maida from "@/assets/products/maida.png";
import rice from "@/assets/products/rice.png";
import mustardOil from "@/assets/products/mustard-oil.png";
import riceBranOil from "@/assets/products/rice-bran-oil.png";
import soybeanOil from "@/assets/products/soybean-oil.png";
import suji from "@/assets/products/suji.png";

const products = [
  {
    name: "Premium Atta",
    namebn: "আটা",
    weight: "2 kg",
    image: atta,
    category: "Flour",
  },
  {
    name: "Brown Atta",
    namebn: "ব্রাউন আটা",
    weight: "1 kg",
    image: brownAtta,
    category: "Flour",
  },
  {
    name: "Maida",
    namebn: "ময়দা",
    weight: "1 kg",
    image: maida,
    category: "Flour",
  },
  {
    name: "Chinigura Rice",
    namebn: "চিনিগুঁড়া চাল",
    weight: "1 kg",
    image: rice,
    category: "Rice",
  },
  {
    name: "Mustard Oil",
    namebn: "সরিষার তেল",
    weight: "1 L",
    image: mustardOil,
    category: "Oil",
  },
  {
    name: "Rice Bran Oil",
    namebn: "রাইস ব্রান অয়েল",
    weight: "5 L",
    image: riceBranOil,
    category: "Oil",
  },
  {
    name: "Soybean Oil",
    namebn: "সয়াবিন তেল",
    weight: "5 L",
    image: soybeanOil,
    category: "Oil",
  },
  {
    name: "Suji",
    namebn: "সুজি",
    weight: "500 gm",
    image: suji,
    category: "Semolina",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-primary/10 text-sunshine-gold font-medium rounded-full text-sm mb-4">
            Featured Products
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Our Bestsellers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the products that Bangladeshi families love and trust every day.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <div
              key={product.name}
              className="group bg-card rounded-xl p-4 shadow-card hover:shadow-product transition-all duration-300"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Category Badge */}
              <span className="inline-block px-2 py-0.5 bg-muted text-muted-foreground text-xs font-medium rounded-full mb-3">
                {product.category}
              </span>

              {/* Product Image */}
              <div className="relative h-36 md:h-44 mb-4 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div>
                <h3 className="font-semibold text-foreground text-sm md:text-base mb-0.5">
                  {product.name}
                </h3>
                <span className="text-primary text-xs md:text-sm">
                  {product.namebn}
                </span>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-muted-foreground text-xs">
                    {product.weight}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
