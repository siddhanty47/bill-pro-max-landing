import ScrollProvider from "@/components/scroll/ScrollProvider";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Story from "@/components/Story/Story";
import Inside from "@/components/Inside/Inside";
import AlsoIncluded from "@/components/AlsoIncluded/AlsoIncluded";
import Close from "@/components/Close/Close";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <ScrollProvider>
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Inside />
        <AlsoIncluded />
        <Close />
      </main>
      <Footer />
    </ScrollProvider>
  );
}
