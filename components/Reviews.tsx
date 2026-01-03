
import React from 'react';
import { Review } from '../types';

const Reviews: React.FC = () => {
  const reviews: Review[] = [
    {
      id: 1,
      name: "서초동 김선생님",
      role: "사주 전문",
      content: "블로그 글쓰기가 너무 어려워서 포기 상태였는데, 이 툴을 쓰고 나서 매일 포스팅을 하고 있어요. 덕분에 문의가 2배나 늘었습니다.",
      avatar: "https://picsum.photos/seed/review1/100/100",
      rating: 5
    },
    {
      id: 2,
      name: "박도사님",
      role: "타로 마스터",
      content: "제 톤앤매너를 정확히 파악해서 글을 써주는 게 신기해요. 상담에만 집중할 수 있어서 너무 좋습니다.",
      avatar: "https://picsum.photos/seed/review2/100/100",
      rating: 5
    },
    {
      id: 3,
      name: "이명리님",
      role: "풍수지리 전문가",
      content: "디자인 감각이 없어서 프로필이 엉망이었는데, AI가 만들어준 이미지를 쓰고 나서 훨씬 전문적으로 보인다는 말을 듣습니다.",
      avatar: "https://picsum.photos/seed/review3/100/100",
      rating: 5
    }
  ];

  return (
    <section id="reviews" className="py-24 bg-[#080b09]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-black leading-tight">이미 많은 선생님들이<br />변화를 경험하고 있습니다</h2>
            <p className="text-gray-400 text-lg">평균 상담 예약률 150% 증가, 지금 확인해보세요.</p>
          </div>
          <div className="flex gap-3">
            <button className="w-12 h-12 rounded-full border border-brand-border flex items-center justify-center text-white hover:bg-white/5 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="w-12 h-12 rounded-full border border-brand-border flex items-center justify-center text-white hover:bg-white/5 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map(r => (
            <div key={r.id} className="bg-brand-surface border border-brand-border p-8 rounded-3xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(r.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed font-medium">"{r.content}"</p>
              </div>
              <div className="flex items-center gap-4">
                <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full border border-brand-border" />
                <div>
                  <p className="font-bold">{r.name}</p>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
