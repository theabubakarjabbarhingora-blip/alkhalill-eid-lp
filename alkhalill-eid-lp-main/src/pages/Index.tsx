import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import IftarForm from "@/components/IftarForm";
import WhyContribute from "@/components/WhyContribute";
import AboutSection from "@/components/AboutSection";
import HowToDonate from "@/components/HowToDonate";
import ServicesSection from "@/components/ServicesSection";
import ReviewsSlider from "@/components/ReviewsSlider";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <HeroSection />
      <IftarForm />
      <WhyContribute />
      <AboutSection />
      <ServicesSection />
      <HowToDonate />
      <ReviewsSlider />
      <Footer />
    </div>
  );
};

export default Index;
