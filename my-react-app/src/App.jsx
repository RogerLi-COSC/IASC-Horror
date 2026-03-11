import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TransitionProvider from "./components/TransitionProvider";
import BloodDrips from "./components/BloodDrips";
import BackgroundAudio from "./components/BackgroundAudio";
import PageTransition from "./components/PageTransition";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import SecretTwo from "./pages/Secret-2";

import { SecretUnlockProvider } from "./components/SecretUnlockContext";

import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Tutorial from "./pages/Tutorial";
import Contact from "./pages/Contact";
import Secret from "./pages/Secret";
import Faq from "./pages/Faq";
import Download from "./pages/Download";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter basename="/~rl20wa/IASC">
      <TransitionProvider>
        <ScrollToTop />

        <BackgroundAudio />
        <BloodDrips enabled intervalMs={2200} />

        <SecretUnlockProvider>
          <Navbar />

          <div className="app-shell">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/tutorial" element={<Tutorial />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/secret" element={<Secret />} />
                <Route path="/secret-2" element={<SecretTwo />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/download" element={<Download />} />
              </Routes>
            </PageTransition>

            <Footer />
          </div>
        </SecretUnlockProvider>
      </TransitionProvider>
    </BrowserRouter>
  );
}