
import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      title: "막막한 글쓰기",
      desc: "블로그 포스팅 하나 쓰는 데 2시간이 걸리시나요? 키워드만 입력하면 전문가 수준의 글을 3초 만에 완성해드립니다.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      color: "bg-red-500/10 text-red-500"
    },
    {
      title: "비싼 디자인 비용",
      desc: "썸네일, 상세페이지 외주 맡길 때마다 부담스러우셨죠? AI가 내 분위기에 딱 맞는 이미지를 무제한으로 생성합니다.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: "bg-purple-500/10 text-purple-500"
    },
    {
      title: "어려운 마케팅",
      desc: "어떻게 나를 알릴지 고민하지 마세요. 인스타그램, 블로그 등 채널별 최적화된 홍보 문구를 제안해드립니다.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      color: "bg-green-500/10 text-green-500"
    }
  ];

  return (
    <section id="features" className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black">상담에만 집중하세요.<br />브랜딩은 AI가 합니다.</h2>
          <p className="text-gray-400 text-lg">많은 역술인 분들이 겪고 있는 어려움, 이제 기술로 해결해드립니다.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-brand-surface border border-brand-border p-10 rounded-3xl hover:border-brand-primary/50 transition-all group">
              <div className={`${f.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="text-2xl font-black mb-4">{f.title}</h3>
              <p className="text-gray-400 leading-relaxed font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
