import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Product from "@/components/Product";
import { Features, Stats, Faq, FinalCta, Footer, BuyBar } from "@/components/Sections";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Product />
      <Features />
      <Stats />
      <Faq />
      <FinalCta />
      <Footer />
      <BuyBar />
    </main>
  );
}
