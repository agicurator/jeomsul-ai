
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Demo from './components/Demo';
import Features from './components/Features';
import Reviews from './components/Reviews';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-brand-primary/30">
      <Header />
      <main>
        <Hero />
        <Features />
        <Demo />
        <Reviews />
      </main>
      <Footer />

      {/* Floating CTA for Mobile/Desktop */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="hidden md:flex items-center gap-3 bg-brand-primary text-brand-dark px-8 py-4 rounded-full font-black text-lg hover:brightness-110 shadow-2xl shadow-brand-primary/40 transition-all transform hover:-translate-y-1 group">
          <svg className="w-6 h-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          무료로 브랜딩 시작하기
        </button>
      </div>

      <div className="fixed bottom-0 left-0 w-full p-4 md:hidden z-50 bg-brand-dark/80 backdrop-blur-md border-t border-brand-border">
         <button className="w-full bg-brand-primary text-brand-dark py-4 rounded-xl font-black text-lg hover:brightness-110 transition-all">
          지금 무료로 시작하기
        </button>
      </div>
    </div>
  );
};

export default App;
