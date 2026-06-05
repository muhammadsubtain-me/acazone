import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import { AboutPage, SamplesPage, ContactPage, PortfolioPage, FAQsPage } from './pages/OtherPages';
import { MechanicalPage, ElectricalPage, ChemicalPage, ComputerSciencePage } from './pages/ServicePages';
import ServicesOverview from './pages/ServicesOverview';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesOverview />} />
            <Route path="/services/mechanical" element={<MechanicalPage />} />
            <Route path="/services/electrical" element={<ElectricalPage />} />
            <Route path="/services/chemical" element={<ChemicalPage />} />
            <Route path="/services/computer-science" element={<ComputerSciencePage />} />
            <Route path="/samples" element={<SamplesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
