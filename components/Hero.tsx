
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-green-900/20 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 text-center md:text-left">
          <div className="inline-block">
            <span className="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border border-brand-primary/20">
              BETA V1.0 런칭
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
            운명은 읽어도,<br />
            <span className="text-brand-primary">브랜딩</span>은 어렵다면?
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl mx-auto md:mx-0">
            역술인을 위한 AI 브랜딩 파트너. <br />
            복잡한 글쓰기와 디자인, 10초 만에 끝내는 법을 경험하세요.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <a href="#demo" className="w-full sm:w-auto bg-brand-primary text-brand-dark px-8 py-4 rounded-xl font-black text-lg hover:brightness-110 shadow-2xl shadow-brand-primary/20 transition-all text-center">
              무료로 체험하기
            </a>
            <button className="w-full sm:w-auto bg-brand-surface border border-brand-border text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/5 transition-all">
              서비스 소개서 보기
            </button>
          </div>
        </div>

        <div className="hidden md:block relative">
          <div className="glass rounded-3xl p-6 glow relative z-10 overflow-hidden">
            <div className="h-6 flex items-center gap-2 mb-6">
               <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
               <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <div className="space-y-6 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-white/20 rounded w-1/3"></div>
                  <div className="h-3 bg-white/10 rounded w-1/2"></div>
                </div>
              </div>
              <div className="bg-brand-dark/50 border border-brand-border p-5 rounded-2xl space-y-3">
                 <div className="flex items-center gap-2 text-brand-primary text-xs font-bold">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    AI Generated Result
                 </div>
                 <div className="h-3 bg-white/10 rounded w-full"></div>
                 <div className="h-3 bg-white/10 rounded w-5/6"></div>
                 <div className="h-3 bg-white/10 rounded w-4/6"></div>
              </div>
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 border-2 border-brand-primary/20 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
