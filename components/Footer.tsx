
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-6 text-center mb-24">
        <h2 className="text-3xl md:text-5xl font-black mb-6">가장 먼저 체험해보세요</h2>
        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          지금 이메일을 등록하시면 <b>'역술인을 위한 브랜딩 가이드북(PDF)'</b>을<br className="hidden sm:block" />
          무료로 보내드리고, 정식 출시 시 50% 할인 쿠폰을 드립니다.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 mb-4" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="이메일 주소를 입력해주세요"
            className="flex-1 bg-brand-surface border border-brand-border rounded-2xl px-6 py-5 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all text-lg"
          />
          <button className="bg-brand-primary text-brand-dark px-10 py-5 rounded-2xl font-black text-lg hover:brightness-110 shadow-xl shadow-brand-primary/20 transition-all">
            무료 혜택 받기
          </button>
        </form>
        <p className="text-gray-600 text-xs">* 스팸 메일은 절대 보내지 않습니다. 언제든 구독을 취소할 수 있습니다.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-brand-border pt-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-brand-primary rounded-md flex items-center justify-center">
                <svg className="w-4 h-4 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">Jeom-sul AI</span>
            </div>
            <p className="text-gray-500 text-sm font-medium">대한민국 1등 역술인 브랜딩 솔루션</p>
          </div>
          
          <div className="flex flex-wrap gap-8 text-sm font-bold text-gray-500">
            <a href="#" className="hover:text-white transition-colors">서비스 이용약관</a>
            <a href="#" className="hover:text-white transition-colors">개인정보 처리방침</a>
            <a href="#" className="hover:text-white transition-colors">고객센터</a>
            <a href="#" className="hover:text-white transition-colors">제휴 문의</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-medium gap-4">
          <div className="text-center md:text-left space-y-1">
            <p>(주)점술브랜딩 | 대표: 홍길동 | 사업자등록번호: 123-45-67890</p>
            <p>서울시 강남구 테헤란로 123</p>
          </div>
          <p>© 2024 Jeom-sul AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
