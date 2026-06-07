import { Product, QuizLevel } from './types';

export const products: Product[] = [
  {
    id: "1",
    title: "Teega Crochet Bundle Box",
    creator: "Teega Makassar",
    category: "KERAJINAN",
    story: "Setiap rajutan pada Teega Crochet Bundle dibuat dengan ketelitian dan rasa cinta. Ini bukan sekadar produk, melainkan kehangatan yang bisa dirasakan oleh mereka yang menerimanya.",
    imageUrl: "https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?w=600&q=80",
    price: 250000
  },
  {
    id: "2",
    title: "Gelang Manik Kristal",
    creator: "Hendra",
    category: "FASHION",
    story: "Manik-manik ini dirangkai satu per satu melambangkan kesatuan warna-warni kehidupan. Hendra menyusunnya dengan penuh fokus, membuktikan bahwa keterbatasan bukan penghalang untuk berkarya.",
    imageUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    price: 10000
  },
  {
    id: "3",
    title: "Lukisan Kapal Phinisi",
    creator: "Dian Rahayu",
    category: "SENI",
    story: "Goresan kuas yang tegas menggambarkan ketangguhan pelaut nusantara dalam mengarungi samudra. Dian melukisnya sambil mendengarkan deburan ombak dari rumahnya.",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80",
    price: 200000
  },
  {
    id: "4",
    title: "Lukisan Rumah Adat Tongkonan",
    creator: "Mika",
    category: "AKSESORI",
    story: "Karya ini adalah bentuk kebanggaan terhadap warisan leluhur Tana Toraja yang kekal abadi. Sebuah pengingat akan akar dan tempat kita kembali.",
    imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c026fdb?w=600&q=80",
    price: 220000
  }
];

export const quizLevels: QuizLevel[] = [
  {
    level: 1,
    question: "Bagaimana cara terbaik memulai cerita tentang karya seni Anda?",
    options: [
      "Sebutkan harganya langsung.",
      "Ceritakan inspirasi dan filosofi di baliknya.",
      "Bilang saja ini buatan tangan.",
      "Tidak perlu cerita, biarkan orang melihat sendiri."
    ],
    correctAnswer: 1,
    successMessage: "Tepat sekali! Pembeli suka terhubung secara emosional dengan karya melalui ceritanya."
  },
  {
    level: 2,
    question: "Saat pelanggan bertanya tentang bahan pembuat karya, apa respons terbaik?",
    options: [
      "Ini dari bahan biasa saja.",
      "Menjelaskan jenis bahan, asalnya, dan mengapa material ini istimewa bagi karya tersebut.",
      "Suruh mereka menebak sendiri.",
      "Fokus ke warnanya saja."
    ],
    correctAnswer: 1,
    successMessage: "Luar biasa! Transparansi material menambah nilai (value) keaslian produk."
  },
  {
    level: 3,
    question: "Jika seorang pelanggan ragu karena harga terlalu mahal, apa pendekatan komunikatifmu?",
    options: [
      "Marah dan menyuruhnya pergi.",
      "Menurunkan harga drastis saat itu juga.",
      "Menjelaskan proses pembuatan yang rumit, nilai seni, dan ketahanan produk.",
      "Abaikan saja."
    ],
    correctAnswer: 2,
    successMessage: "Hebat! Edukasi nilai karya seringkali menjustifikasi harga di mata pelanggan."
  }
];
