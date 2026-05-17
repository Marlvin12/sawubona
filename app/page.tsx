import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Programs } from "@/components/Programs";
import { HowItWorks } from "@/components/HowItWorks";
import { Stats } from "@/components/Stats";
import { Mentors } from "@/components/Mentors";
import { Stories } from "@/components/Stories";
import { FAQ } from "@/components/FAQ";
import { Involve } from "@/components/Involve";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Programs />
        <HowItWorks />
        <Stats />
        <Mentors />
        <Stories />
        <FAQ />
        <Involve />
      </main>
      <Footer />
    </>
  );
}
