import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TransitionProvider from "./components/TransitionProvider";
import BloodDrips from "./components/BloodDrips";

import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Tutorial from "./pages/Tutorial";
import Contact from "./pages/Contact";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <TransitionProvider>
        <BloodDrips enabled intervalMs={2200} />
        <Navbar />

        <div className="app-shell">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/download" element={<div className="page-pad">Download (coming soon)</div>} />
          </Routes>
        </div>
      </TransitionProvider>
    </BrowserRouter>
  );
}
