import { Factory, Leaf, FlaskConical, Truck } from "lucide-react";

const qualityPoints = [
  {
    icon: Leaf,
    title: "Premium Ingredients",
    description: "Sourced from trusted local farmers",
  },
  {
    icon: Factory,
    title: "Modern Facilities",
    description: "State-of-the-art processing plants",
  },
  {
    icon: FlaskConical,
    title: "Quality Tested",
    description: "Rigorous quality control checks",
  },
  {
    icon: Truck,
    title: "Fresh Delivery",
    description: "Timely distribution nationwide",
  },
];

const QualitySection = () => {
  return (
    <section id="quality" className="py-20 bg-akij-red text-secondary-foreground relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-akij-red-dark/30 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-akij-red-dark/20 rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
            Our Commitment to Quality
          </h2>
          <p className="text-secondary-foreground/80 max-w-2xl mx-auto">
            Every Sunshine product goes through a meticulous quality process 
            to ensure only the best reaches your kitchen.
          </p>
        </div>

        {/* Quality Points */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {qualityPoints.map((point, index) => (
            <div
              key={point.title}
              className="text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-secondary-foreground/10 rounded-full mb-4 group-hover:bg-secondary-foreground/20 transition-colors">
                <point.icon className="w-6 h-6 md:w-8 md:h-8 text-secondary-foreground" />
              </div>
              <h3 className="font-semibold text-base md:text-lg mb-1">
                {point.title}
              </h3>
              <p className="text-secondary-foreground/70 text-sm">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-secondary-foreground/10 px-6 py-3 rounded-full">
            <span className="text-2xl">🏆</span>
            <span className="font-medium">
              BSTI Certified • ISO 22000 • HACCP Compliant
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
