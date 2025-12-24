import { Factory, Award, TrendingUp } from "lucide-react";

const AboutUs = () => {
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

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Akij Flour Mills Ltd., a proud concern of Akij Insaaf, is a leading name in Bangladesh's flour industry. Established in 2014 in Narayanganj, the company began its commercial operations in 2016. Driven by a commitment to premium quality and exceptional service—hallmarks of the AKIJ legacy—Akij Flour Mills has earned the trust and loyalty of millions under its flagship brand, SUNSHINE.
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

          {/* Stats Cards */}
          <div className="space-y-4">
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Factory className="w-6 h-6 text-sunshine-gold" />
                </div>
                <div>
                  <span className="text-2xl font-serif text-foreground font-bold">1,200</span>
                  <p className="text-sm text-muted-foreground">Metric Tons Daily Capacity</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-akij-red/10 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-akij-red" />
                </div>
                <div>
                  <span className="text-2xl font-serif text-foreground font-bold">2014</span>
                  <p className="text-sm text-muted-foreground">Established in Narayanganj</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-sunshine-orange" />
                </div>
                <div>
                  <span className="text-2xl font-serif text-foreground font-bold">BUHLER</span>
                  <p className="text-sm text-muted-foreground">Swiss Technology</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
