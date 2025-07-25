'use client';

import React from 'react';
import Header from "../components/Header";
import Footer from "../components/footer";
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { descontoAplicado } from '../utils/descontoAplicado';

export default function CartPage() {
  const { cartItems, updateItemQuantity, removeItemFromCart, getSubtotalPrice, clearCart, loadingCart } = useCart();

  if (loadingCart) {
    return <p className="text-center py-10 text-xl text-blue-600">Carregando carrinho...</p>;
  }

  const subtotal = getSubtotalPrice();
  const subtotalFormatted = (subtotal * 6).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 pt-8 md:pt-12">

        
        <div className='sm:hidden'>
  <div className="lg:w-1/3 bg-white rounded-lg shadow-md p-6 ">
    <h2 className="text-xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-3">Resumo do Pedido</h2>
    <div className="flex justify-between items-center text-lg font-semibold text-gray-800 mb-4">
      <span>Subtotal ({cartItems.length} itens):</span>
      <span>{subtotalFormatted}</span>
    </div>
    <p className="text-sm text-gray-500 mb-6">O frete e impostos serão calculados no checkout.</p>
    <Link href="/checkout" className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold text-md hover:bg-blue-800 transition duration-300 shadow-lg text-center block">
      Finalizar Compra
    </Link>
    <Link href="/" className="block text-center underline text-blue-600 hover:underline mt-4 ">
      Continuar Comprando
    </Link>
  </div>

  {cartItems.length === 0 ? (
    <div className="text-center py-10 sm:hidden flex flex-col items-center"> 
      <p className="text-lg text-gray-600 mb-6">Seu carrinho está vazio.</p>
      <Link href="/" className="bg-blue-600 underline text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 text-md">
        Continuar Comprando
      </Link>
    </div>
  ) : (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-2/3">
        <h1 className="md:text-4xl mt-8 sm:mt-0 text-xl font-extrabold text-gray-900 mb-8 text-center border-b-2 border-blue-200 pb-4">
          Seu Carrinho de Compras
        </h1>
        {cartItems.map((item) => (
          <div key={item.id} className="flex  sm:flex-row gap-8 items-center bg-white rounded-lg shadow-md p-4 mb-6"> 

          <div className='flex flex-col'>
            <div className='flex justify-center  '>
              <Link href={`/produto/${item.id}`} className="flex-shrink-0">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="object-contain rounded-md w-[80px] md:w-[120px]"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/120x120/E0E0E0/333333?text=No+Image`; }}
                />
              </Link>
            </div>
            <div className="flex flex-col items-center sm:flex-row sm:items-center sm:ml-auto w-full sm:w-auto"> {/* Changed to flex-col for small screens and added items-center */}
              <div className="flex items-center gap-3 mt-4 sm:mt-0">
                <button
                  onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                  className="h-9 w-9 border border-zinc-200 rounded-full flex items-center justify-center hover:bg-zinc-200 cursor-pointer transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="text-lg font-medium text-gray-800">{item.quantity}</span>
                <button
                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                  className="h-9 w-9 border border-zinc-200 rounded-full flex items-center justify-center hover:bg-zinc-200 cursor-pointer transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              <button
                onClick={() => removeItemFromCart(item.id)}
                className="ml-0 mt-4 sm:ml-4 sm:mt-0 cursor-pointer text-red-600 hover:scale-105 hover:transition-all duration-300 hover:text-red-800 transition-colors"
                aria-label="Remover item"
              >
                <Trash2 size={24} />
              </button>
            </div>
          </div>
            


            <div className="flex flex-col gap-8 sm:text-left w-full  "> 
              <Link href={`/produto/${item.id}`}>
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 hover:text-blue-700 transition-colors">{item.title}</h2>
                <p className="text-gray-600 mb-2">{item.brand}</p>
              </Link>
              
              <div className="flex flex-col  gap-4 mt-2">
                <div className='flex justify-between'>
                  <span className="text-blue-700 font-bold text-md">
                  {descontoAplicado(item.price, item.discountPercentage)}
                </span>
                {item.discountPercentage > 0 && (
                  <span className="text-gray-500 line-through text-md">
                    {(item.price * 6).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </span>
                )}
                </div>
                
                {item.discountPercentage > 0 && (
                  <span className="text-green-600 font-semibold text-sm">
                    ({item.discountPercentage}% OFF)
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-end mt-6">
          <button
            onClick={clearCart}
            className="bg-red-500 cursor-pointer hover:bg-red-400 text-white px-5 py-2 rounded-lg font-semibold transition duration-300 flex items-center"
          >
            <Trash2 size={18} className="mr-2" />
            Limpar Carrinho
          </button>
        </div>
      </div>
    </div>
  )}
</div>
       
        <h1 className="md:text-4xl md:flex hidden mt-8 sm:mt-0 text-xl font-extrabold text-gray-900 mb-8 text-center border-b-2 border-blue-200 pb-4">
          Seu Carrinho de Compras
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center sm:flex mt-20 hidden gap-4 items-center flex-col  ">
            <p className="text-xl text-gray-600">Seu carrinho está vazio.</p>
            <Link href="/" className="bg-blue-600 underline text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
              Continuar Comprando
            </Link>
          </div>
        ) : (
          <div className=" flex-col lg:flex-row gap-8 sm:flex hidden">
            <div className="lg:w-2/3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-md p-4 mb-6">
                  <Link href={`/produto/${item.id}`} className="flex-shrink-0 mb-4 sm:mb-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="object-contain rounded-md mr-0 sm:mr-4 w-[80px] md:w-[120px]"
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/120x120/E0E0E0/333333?text=No+Image`; }}
                    />
                  </Link>
                  <div className="flex-grow text-center sm:text-left mt-0 sm:mt-0">
                    <Link href={`/produto/${item.id}`}>
                      <h2 className="text-lg md:text-xl font-semibold text-gray-800 hover:text-blue-700 transition-colors">{item.title}</h2>
                    </Link>
                    <p className="text-gray-600 mb-2">{item.brand}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-4 mt-2">
                      <span className="text-blue-700 font-bold text-md">
                        {descontoAplicado(item.price, item.discountPercentage)}
                      </span>
                      {item.discountPercentage > 0 && (
                        <span className="text-gray-500 line-through text-md">
                            {(item.price * 6).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </span>
                      )}
                      {item.discountPercentage > 0 && (
                        <span className="text-green-600 font-semibold text-sm">
                          ({item.discountPercentage}% OFF)
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4 sm:mt-0 sm:ml-auto">
                    <button
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                      className="h-9 w-9 border border-zinc-200 rounded-full flex items-center justify-center hover:bg-zinc-200 cursor-pointer transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="text-lg font-medium text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                      className="h-9 w-9 border border-zinc-200 rounded-full flex items-center justify-center hover:bg-zinc-200 cursor-pointer transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                    <button
                      onClick={() => removeItemFromCart(item.id)}
                      className="ml-4 cursor-pointer text-red-600 hover:scale-105 hover:transition-all duration-300 hover:text-red-800 transition-colors"
                      aria-label="Remover item"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-end mt-6">
                <button
                  onClick={clearCart}
                  className="bg-red-500 cursor-pointer hover:bg-red-400 text-white px-5 py-2 rounded-lg font-semibold transition duration-300 flex items-center"
                >
                  <Trash2 size={18} className="mr-2" />
                  Limpar Carrinho
                </button>
              </div>
            </div>

            <div className="lg:w-1/3 bg-white rounded-lg shadow-md p-6 h-fit sticky top-28 sm:flex sm:flex-col hidden">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-3">Resumo do Pedido</h2>
              <div className="flex justify-between items-center text-xl font-semibold text-gray-800 mb-4">
                <span>Subtotal ({cartItems.length} itens):</span>
                <span>{subtotalFormatted}</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">O frete e impostos serão calculados no checkout.</p>
              <Link href="/checkout" className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-800 transition duration-300 shadow-lg text-center block">
                Finalizar Compra
              </Link>
              <Link href="/" className="block text-center underline text-blue-600 hover:underline mt-4">
                Continuar Comprando
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}