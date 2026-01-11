import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import WhySunshine from "@/components/WhySunshine";
import AboutUs from "@/components/AboutUs";
import QualitySection from "@/components/QualitySection";
import MediaSection from "@/components/MediaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ProductCategories />
        <WhySunshine />
        <AboutUs />
        <QualitySection />
        <MediaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
