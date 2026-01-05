import facility1 from "@/assets/about/facility-1.png";
import facility2 from "@/assets/about/facility-2.png";
import facility3 from "@/assets/about/facility-3.png";
import facility4 from "@/assets/about/facility-4.png";

const AboutUs = () => {
  const images = [facility1, facility2, facility3, facility4];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-primary/10 text-sunshine-gold font-medium rounded-full text-sm mb-4">
            About Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            About Akij Flour Mills Ltd.
          </h2>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-6 mb-12">
          <p className="text-muted-foreground leading-relaxed">
            Akij Flour Mills Ltd., a proud concern of Akij Insaf, is a leading name in Bangladesh's flour industry. Established in 2014 in Narayanganj, the company began its commercial operations in 2016. Driven by a commitment to premium quality and exceptional service—hallmarks of the AKIJ legacy—Akij Flour Mills has earned the trust and loyalty of millions under its flagship brand, SUNSHINE.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Equipped with state-of-the-art BUHLER machinery from Switzerland, our facility boasts a daily production capacity of 1,200 metric tons. This advanced technology ensures consistency, purity, and reliability across every product we deliver.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our flour is a preferred choice among leading snack and bakery brands seeking uncompromising quality. Through a robust multichannel sales strategy, Akij Flour Mills has established a strong presence in both retail consumer packs and the bulk market, where we are widely recognized as a service-first, dependable partner.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Building on this success, we have diversified into other essential food categories, including rice, pulses, and edible oil. With an unwavering focus on quality and safety, Akij Flour Mills continues to grow as a trusted name in nutritious food products—nourishing homes across Bangladesh.
          </p>
        </div>

        {/* Image Collage */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-[4/3] overflow-hidden rounded-lg shadow-card"
            >
              <img
                src={image}
                alt={`Akij Flour Mills facility ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
