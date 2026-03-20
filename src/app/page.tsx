import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Features from "@/components/Features/Features";
import TerminalDemo from "@/components/TerminalDemo/TerminalDemo";
import CTA from "@/components/CTA/CTA";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <TerminalDemo />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
