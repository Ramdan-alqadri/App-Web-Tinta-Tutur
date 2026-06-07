export interface Product {
  id: string;
  title: string;
  creator: string;
  story: string;
  imageUrl: string;
  price: number;
  category: string;
}

export interface QuizLevel {
  level: number;
  question: string;
  options: string[];
  correctAnswer: number;
  successMessage: string;
}
