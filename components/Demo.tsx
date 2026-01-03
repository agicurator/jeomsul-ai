
import React, { useState } from 'react';
import { generateProfileBio } from '../services/geminiService';
import { ProfileData } from '../types';

const Demo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: '청담 도령',
    specialty: '사주 명리학',
    tone: '신뢰감',
    bio: '"불안한 미래, 명쾌한 해답으로 길을 밝혀드립니다. 15년의 명리학 연구를 바탕으로 단순히 운명을 읽는 것을 넘어, 내담자분이 스스로 삶의 주인이 될 수 있도록 돕습니다. 복잡한 인생의 갈림길에서 가장 든든한 조언자가 되어드리겠습니다."',
    tags: ['#신뢰감', '#명쾌한해석', '#인생상담']
  });

  const [formData, setFormData] = useState({
    name: '',
    specialty: '사주 명리학',
    tone: '따뜻함' as ProfileData['tone']
  });

  const toneConfigs = {
    '신뢰감': {
      activeClass: 'bg-blue-500 text-white border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]',
      accentColor: 'text-blue-500',
      btnGradient: 'from-blue-600 to-blue-400'
    },
    '따뜻함': {
      activeClass: 'bg-brand-primary text-brand-dark border-brand-primary shadow-[0_0_20px_rgba(57,224,121,0.5)]',
      accentColor: 'text-brand-primary',
      btnGradient: 'from-brand-primary to-green-500'
    },
    '직설적': {
      activeClass: 'bg-orange-500 text-white border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.5)]',
      accentColor: 'text-orange-500',
      btnGradient: 'from-orange-600 to-red-500'
    }
  };

  const handleGenerate = async () => {
    if (!formData.name) {
      alert("활동명을 입력해주세요!");
      return;
    }
    setLoading(true);
    const result = await generateProfileBio(formData.name, formData.specialty, formData.tone);
    setProfile({
      name: formData.name,
      specialty: formData.specialty,
      tone: formData.tone,
      bio: result.bio,
      tags: result.tags
    });
    setLoading(false);
  };

  const handleShare = async () => {
    const shareData = {
      title: `${profile.name} - ${profile.specialty} 전문가`,
      text: `${profile.bio}\n\n#역술인브랜딩 #JeomsulAI`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
        alert('프로필 내용이 클립보드에 복사되었습니다!');
      }
    } catch (err) {
      console.error('공유 실패:', err);
    }
  };

  return (
    <section id="demo" className="py-24 bg-[#080b09]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className={`font-bold text-xs tracking-widest uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full ${toneConfigs[formData.tone].accentColor}`}>INTERACTIVE DEMO</span>
          <h2 className="text-3xl md:text-5xl font-black mt-4">내 프로필 문구, <span className={toneConfigs[formData.tone].accentColor}>10초 만에 완성하기</span></h2>
          <p className="text-gray-400 mt-4 text-lg">아래 정보를 입력하면 AI가 전문적인 소개글을 즉시 작성해드립니다.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div className="bg-brand-surface border border-brand-border p-8 rounded-3xl space-y-8">
            <div className="flex items-center gap-3">
              <span className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold bg-brand-primary text-brand-dark`}>1</span>
              <h3 className="text-xl font-bold">기본 정보 입력</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400">활동명</label>
                <input 
                  type="text" 
                  className="w-full bg-brand-dark border border-brand-border rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                  placeholder="예: 청담 도령"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400">전문 분야</label>
                <select 
                  className="w-full bg-brand-dark border border-brand-border rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary appearance-none cursor-pointer"
                  value={formData.specialty}
                  onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                >
                  <option>사주 명리학</option>
                  <option>타로 카드</option>
                  <option>신점 / 영점</option>
                  <option>풍수지리</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400">원하는 분위기 (Tone)</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['신뢰감', '따뜻함', '직설적'] as const).map(t => (
                    <button 
                      key={t}
                      onClick={() => setFormData({...formData, tone: t})}
                      className={`py-4 rounded-2xl border font-bold text-sm transition-all duration-300 transform active:scale-95 ${
                        formData.tone === t 
                        ? toneConfigs[t].activeClass + " scale-105 z-10"
                        : 'bg-brand-dark border-brand-border text-gray-500 hover:border-gray-600'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={loading}
              className={`w-full bg-gradient-to-r ${toneConfigs[formData.tone].btnGradient} text-brand-dark py-5 rounded-2xl font-black text-lg hover:brightness-110 shadow-xl transition-all flex items-center justify-center gap-3`}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-brand-dark border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  프로필 생성하기
                </>
              )}
            </button>
          </div>

          {/* Preview */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 justify-end">
              <span className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold bg-brand-primary text-brand-dark`}>2</span>
              <h3 className="text-xl font-bold">실시간 미리보기</h3>
            </div>
            
            <div className="bg-white text-brand-dark rounded-[2.5rem] overflow-hidden shadow-2xl relative transition-all duration-700 transform hover:scale-[1.01]">
              <div className="h-40 bg-slate-200 bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/seed/${profile.name}/800/400')` }}>
                <div className="absolute top-6 right-6">
                  <span className="bg-black/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/20">Mobile Preview</span>
                </div>
              </div>
              
              <div className="px-10 pb-10 -mt-16">
                <div className="flex justify-between items-end mb-6">
                  <div className={`w-32 h-32 rounded-full border-[6px] border-white bg-white overflow-hidden shadow-lg transition-colors duration-500`}>
                    <img src={`https://picsum.photos/seed/${profile.name}/300/300`} alt="Portrait" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex gap-2 mb-4">
                    <button 
                      onClick={handleShare}
                      className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-all active:scale-90"
                      title="공유하기"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                    <button className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-all active:scale-90">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h4 className="text-3xl font-black text-slate-900">{profile.name}</h4>
                    <svg className={`w-6 h-6 ${toneConfigs[profile.tone].accentColor}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.64.304 1.24.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-slate-500 font-bold tracking-tight">{profile.specialty} 전문 • 15년 경력</p>
                  
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 relative italic text-slate-700 leading-relaxed font-medium">
                    <svg className={`absolute top-4 left-4 w-6 h-6 opacity-20 ${toneConfigs[profile.tone].accentColor}`} fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L14.017 2H16.017L21.017 2V3L21.017 15C21.017 18.3137 18.3307 21 15.017 21H14.017ZM3.0166 21L3.0166 18C3.0166 16.8954 3.91203 16 5.0166 16H8.0166C8.56888 16 9.0166 15.5523 9.0166 15V9C9.0166 8.44772 8.56888 8 8.0166 8H5.0166C3.91203 8 3.0166 7.10457 3.0166 6V3L3.0166 2H5.0166L10.0166 2V3L10.0166 15C10.0166 18.3137 7.3303 21 4.0166 21H3.0166Z" /></svg>
                    <p className="pl-6 relative z-10">{profile.bio}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {profile.tags.map(tag => (
                      <span key={tag} className={`bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${toneConfigs[profile.tone].accentColor}`}>{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Powered by Jeom-sul AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
