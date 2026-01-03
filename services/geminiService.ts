
import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY;

export const generateProfileBio = async (name: string, specialty: string, tone: string): Promise<{ bio: string; tags: string[] }> => {
  if (!apiKey) {
    // Fallback if no API key is provided
    return {
      bio: `안녕하세요, ${specialty} 전문가 ${name}입니다. ${tone} 있는 상담으로 당신의 고민을 해결해 드립니다.`,
      tags: ["#전문성", "#상담", `#${tone}`]
    };
  }

  const ai = new GoogleGenAI({ apiKey });
  
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

  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    return {
      bio: response.text || "소개글을 생성하지 못했습니다.",
      tags: ["#역학", "#브랜딩", "#AI"]
    };
  }
};
