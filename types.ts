
export interface ProfileData {
  name: string;
  specialty: string;
  tone: '신뢰감' | '따뜻함' | '직설적';
  bio: string;
  tags: string[];
}

export interface Review {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}
