import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Parcours from "./components/Parcours";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import LoadingScreen from "./components/LoadingScreen";
import InstallPrompt from "./components/InstallPrompt";
import ChatWidget from "./components/ChatWidget";
import LanguageSwitch from "./components/LanguageSwitch";
import { LanguageProvider } from "./context/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <LoadingScreen />
      <LanguageSwitch />
      <div className="min-h-screen bg-bg text-white transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Parcours />
          <Services />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
        <InstallPrompt />
        <ChatWidget />
      </div>
    </LanguageProvider>
  );
}
