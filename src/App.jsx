import { Routes, Route } from 'react-router-dom';
import AmbientBackground from './components/layout/AmbientBackground';
import ScrollProgress from './components/layout/ScrollProgress';
import PageTransition from './components/layout/PageTransition';
import Header from './components/layout/Header';
import ScrollManager from './components/layout/ScrollManager';
import Footer from './components/shared/Footer';
import NewsletterSignupSection from './components/shared/NewsletterSignupSection';
import Home from './pages/Home';
import About from './pages/About';
import Give from './pages/Give';
import Faqs from './pages/Faqs';

export default function App() {
  return (
    <>
      <AmbientBackground />
      <ScrollProgress />
      <a
        href='#main'
        className='sr-only rounded-full bg-neu px-5 py-3 font-semibold text-neu-ink shadow-neu-sm focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:outline focus:outline-[3px] focus:outline-offset-[3px] focus:outline-royal-500'
      >
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id='main' tabIndex={-1} className='focus:outline-none'>
        <PageTransition>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/faqs' element={<Faqs />} />
            <Route path='/give' element={<Give />} />
          </Routes>
        </PageTransition>
      </main>
      <NewsletterSignupSection />
      <Footer />
    </>
  );
}
