import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import WhySunshine from "@/components/WhySunshine";
import FeaturedProducts from "@/components/FeaturedProducts";
import QualitySection from "@/components/QualitySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ProductCategories />
        <WhySunshine />
        <FeaturedProducts />
        <QualitySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
