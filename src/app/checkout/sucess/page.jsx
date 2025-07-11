// app/checkout/success/page.jsx
"use client";

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import Header from '../../components/Header'; // Ajuste o caminho se necessário

const CheckoutSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header /> 

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 sm:p-12 text-center max-w-md w-full">
          <CheckCircle size={80} className="text-green-500 mx-auto mb-6 animate-bounce" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Parabéns!</h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Sua compra foi registrada na NextBuy. Agradecemos a preferência!
          </p>
          <Link href="/">
            <button className="w-full cursor-pointer px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
              Voltar à Home
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default CheckoutSuccessPage;