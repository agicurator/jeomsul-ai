
import { GoogleGenAI, Type } from "@google/genai";

// API Key는 환경에서 자동으로 주입됩니다.
// 가이드라인에 따라 호출 직전에 인스턴스를 생성하는 팩토리 함수를 사용합니다.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * API 연결 상태를 테스트합니다.
 */
export const testConnection = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const ai = getAI();
    // 가장 가벼운 모델로 응답 가능 여부만 체크합니다.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'hi',
      config: { maxOutputTokens: 5 }
    });
    
    if (response.text) {
      return { success: true, message: "연결 성공! API 키가 활성화되어 있으며 정상적으로 통신 중입니다." };
    }
    return { success: false, message: "연결 실패: 응답 형식이 올바르지 않습니다." };
  } catch (error: any) {
    if (error.message?.includes("Requested entity was not found")) {
      return { success: false, message: "유효한 API 키를 찾을 수 없습니다. 키 선택 창에서 유료 프로젝트의 키를 선택했는지 확인해주세요." };
    }
    return { success: false, message: `연결 오류: ${error.message || '알 수 없는 오류가 발생했습니다.'}` };
  }
};

/**
 * 프로필 소개글 및 태그를 생성합니다.
 */
export const generateProfileBio = async (name: string, specialty: string, tone: string): Promise<{ bio: string; tags: string[] }> => {
  const ai = getAI();
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `이름: ${name}, 전문분야: ${specialty}, 원하는 분위기: ${tone}. 
      이 역술인의 프로필에 들어갈 매력적인 소개글(3~4문장)과 해시태그 3개를 작성해줘. 
      사용자가 신뢰를 느낄 수 있도록 전문적인 용어를 섞어서 격조 있게 작성해줘.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bio: { type: Type.STRING },
            tags: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["bio", "tags"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (e) {
    console.error("Gemini API Error:", e);
    // 폴백 응답
    return {
      bio: `안녕하세요, ${specialty} 전문가 ${name}입니다. ${tone} 있는 상담으로 당신의 고민을 해결해 드립니다.`,
      tags: ["#전문성", "#상담", `#${tone}`]
    };
  }
};
