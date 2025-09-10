import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductCatalog } from './components/ProductCatalog';
import { TryOnModal } from './components/TryOnModal';
import { HistorySection } from './components/HistorySection';
import { PRODUCTS } from './constants';
import * as historyService from './services/historyService';
import type { Product, HistoryItem } from './types';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(historyService.getHistory());
  }, []);

  const handleTryOn = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };
  
  const handleHistoryUpdate = () => {
    setHistory(historyService.getHistory());
  };

  const handleClearHistory = () => {
    historyService.clearHistory();
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Koleksi Kaos Polos</h1>
          <p className="text-xl text-gray-700 mt-4 font-medium">Cari tone warna baju sesuai warna kulitmu.</p>
          <p className="text-lg text-gray-600 mt-2">Pilih warna di bawah, gunakan AI kami untuk melihat tampilannya pada Anda, dan pesan langsung!</p>
        </div>
        <ProductCatalog products={PRODUCTS} onTryOn={handleTryOn} />
      </main>
      
      <HistorySection history={history} onClearHistory={handleClearHistory} />

      {isModalOpen && selectedProduct && (
        <TryOnModal 
          product={selectedProduct} 
          onClose={handleCloseModal} 
          onHistoryUpdate={handleHistoryUpdate}
        />
      )}

      <footer className="text-center py-6 mt-12 bg-white border-t">
        <p className="text-gray-500">&copy; 2024 Elegant T-shirt. Hak cipta dilindungi.</p>
      </footer>
    </div>
  );
};

export default App;