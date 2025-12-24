import { Heart, Shield, Sparkles, Award } from "lucide-react";

const reasons = [
  {
    icon: Heart,
    title: "Made with Love",
    description:
      "Every product is crafted with care, bringing warmth and love to your family's meals.",
    color: "text-akij-red",
    bgColor: "bg-akij-red/10",
  },
  {
    icon: Shield,
    title: "Trusted Quality",
    description:
      "Backed by decades of excellence in quality and reliability.",
    color: "text-sunshine-gold",
    bgColor: "bg-primary/10",
  },
  {
    icon: Sparkles,
    title: "100% Hygienic",
    description:
      "Produced in state-of-the-art facilities with the highest hygiene standards.",
    color: "text-sunshine-orange",
    bgColor: "bg-accent/10",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Only the finest ingredients sourced from trusted farmers across Bangladesh.",
    color: "text-sunshine-gold",
    bgColor: "bg-primary/10",
  },
];

const WhySunshine = () => {
  return (
    <section id="why-sunshine" className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-akij-red/10 text-akij-red font-medium rounded-full text-sm mb-4">
            Why Choose Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Why Families Choose Sunshine
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're not just a food brand — we're a promise of quality, 
            love, and trust to every Bangladeshi home.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${reason.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <reason.icon className={`w-8 h-8 ${reason.color}`} />
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySunshine;
