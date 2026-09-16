import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollManager from './components/ScrollManager';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import GalleryPage from './pages/GalleryPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <>
      <ScrollManager />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
