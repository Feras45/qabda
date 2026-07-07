import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Product from "@/components/Product";
import { Features, Stats, Reviews, Faq, FinalCta, Footer, BuyBar } from "@/components/Sections";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <Product />
      <Features />
      <Stats />
      <Reviews />
      <Faq />
      <FinalCta />
      <Footer />
      <BuyBar />
    </main>
  );
}
