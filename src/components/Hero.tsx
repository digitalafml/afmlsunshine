import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-xl">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6 animate-slideUp">
            Made with{" "}
            <span className="text-akij-red">Love</span>{" "}
            <br className="hidden sm:block" />
            Served with{" "}
            <span className="text-sunshine-gold">Care</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-slideUp" style={{ animationDelay: "0.1s" }}>
            From our family to yours — quality staple foods that bring 
            warmth to every Bangladeshi kitchen.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-slideUp" style={{ animationDelay: "0.2s" }}>
            <a
              href="#products"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-sunshine-gold transition-colors shadow-product"
            >
              Explore Products
            </a>
            <a
              href="#why-sunshine"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-akij-red text-akij-red font-semibold rounded-full hover:bg-akij-red hover:text-secondary-foreground transition-colors"
            >
              Why Sunshine
            </a>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 50L48 45.7C96 41.3 192 32.7 288 35.8C384 39 480 54 576 57.2C672 60.3 768 51.7 864 48.5C960 45.3 1056 47.7 1152 50.8C1248 54 1344 58 1392 60L1440 62V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
