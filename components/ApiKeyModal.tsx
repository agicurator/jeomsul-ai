
import React, { useState, useEffect } from 'react';
import { testConnection } from '../services/geminiService';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [testStatus, setTestStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const checkKeyStatus = async () => {
      if (window.aistudio?.hasSelectedApiKey) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    if (isOpen) {
      checkKeyStatus();
      setTestStatus('idle');
      setMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOpenSelector = async () => {
    try {
      if (window.aistudio?.openSelectKey) {
        await window.aistudio.openSelectKey();
        setHasKey(true);
        setTestStatus('idle');
        setMessage('시스템에서 API 키를 참조 중입니다. 연결 테스트를 통해 최종 확인해주세요.');
      }
    } catch (err) {
      console.error("키 선택기 열기 실패:", err);
    }
  };

  const handleRunTest = async () => {
    setTestStatus('loading');
    setMessage('Gemini 서버와 통신 중입니다...');
    
    const result = await testConnection();
    
    if (result.success) {
      setTestStatus('success');
      setMessage(result.message);
    } else {
      setTestStatus('error');
      setMessage(result.message);
      if (result.message.includes("찾을 수 없습니다")) {
        setHasKey(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      
      {/* Modal Card */}
      <div 
        className="relative glass w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.6)] border border-white/10 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 sm:p-10 space-y-6 sm:space-y-8">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white tracking-tight">API 관리 센터</h3>
              <p className="text-gray-400 text-sm font-medium">안전한 데이터 연동을 위한 설정</p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Status Box */}
          <div className="bg-brand-dark/60 rounded-3xl p-6 border border-brand-border/50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Current Status</span>
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${hasKey ? 'bg-brand-primary animate-pulse shadow-[0_0_8px_rgba(57,224,121,0.6)]' : 'bg-red-500'}`}></div>
                <span className={`text-xs font-black ${hasKey ? 'text-brand-primary' : 'text-red-500'}`}>
                  {hasKey ? '연동 준비 완료' : '키 선택 필요'}
                </span>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
               <div className="flex items-start gap-2">
                 <svg className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                 </svg>
                 <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                   입력하신 키는 사용자의 브라우저 로컬 저장소에 암호화되어 안전하게 보관됩니다.
                 </p>
               </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button 
              onClick={handleOpenSelector}
              className="w-full bg-white text-brand-dark py-4 rounded-2xl font-black text-base hover:bg-gray-200 transition-all flex items-center justify-center gap-3 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              {hasKey ? 'API 키 변경' : 'API 키 연동'}
            </button>

            {testStatus !== 'success' && (
              <button 
                onClick={handleRunTest}
                disabled={!hasKey || testStatus === 'loading'}
                className={`w-full py-4 rounded-2xl font-black text-base transition-all flex items-center justify-center gap-3 border-2 ${
                  hasKey 
                  ? 'bg-brand-surface border-brand-primary/30 text-brand-primary hover:bg-brand-primary/5' 
                  : 'bg-gray-900 border-gray-800 text-gray-600 cursor-not-allowed opacity-50'
                }`}
              >
                {testStatus === 'loading' ? (
                  <div className="w-5 h-5 border-3 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    연결 테스트 실행
                  </>
                )}
              </button>
            )}
          </div>

          {/* Result & Final Action */}
          {message && (
            <div className={`p-5 rounded-2xl text-sm font-bold animate-in slide-in-from-bottom-2 duration-500 border-2 ${
              testStatus === 'success' ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20' : 
              testStatus === 'error' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
              'bg-blue-500/10 text-blue-400 border-blue-500/20'
            }`}>
              <div className="flex gap-3">
                <span className="shrink-0">
                  {testStatus === 'success' ? '✓' : testStatus === 'error' ? '!' : 'i'}
                </span>
                <p className="leading-relaxed">{message}</p>
              </div>
            </div>
          )}

          {/* Successful Termination Button */}
          {testStatus === 'success' ? (
            <button 
              onClick={onClose}
              className="w-full bg-brand-primary text-brand-dark py-5 rounded-2xl font-black text-lg hover:brightness-110 shadow-[0_10px_30px_rgba(57,224,121,0.3)] transition-all animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              설정 완료 및 창 닫기
            </button>
          ) : (
            <button 
              onClick={onClose}
              className="w-full py-3 text-gray-500 font-bold text-sm hover:text-gray-300 transition-colors"
            >
              나중에 설정하기 (닫기)
            </button>
          )}

          <div className="pt-2 text-center">
            <a 
              href="https://ai.google.dev/gemini-api/docs/billing" 
              target="_blank" 
              rel="noreferrer"
              className="text-[10px] text-gray-600 hover:text-gray-400 underline uppercase tracking-[0.2em] font-black"
            >
              Gemini Billing Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
