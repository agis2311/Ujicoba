export interface Product {
  id: number;
  name: string;
  colorHex: string;
  colorName: string;
  price: number;
}

export interface HistoryItem {
  id: string;
  userImage: string; // dataUrl
  generatedImage: string; // dataUrl
  product: {
    colorName: string;
    colorHex: string;
  };
  timestamp: number;
}