import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductsHighlight } from "@/components/home/ProductsHighlight";
import { DifferentialsSection } from "@/components/home/DifferentialsSection";
import { SpectrumComparison } from "@/components/home/SpectrumComparison";
import { HowItWorks } from "@/components/home/HowItWorks";
import { AboutBrief } from "@/components/home/AboutBrief";
import { NewsletterSection } from "@/components/home/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ProductsHighlight />
        <DifferentialsSection />
        <SpectrumComparison />
        <HowItWorks />
        <AboutBrief />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

