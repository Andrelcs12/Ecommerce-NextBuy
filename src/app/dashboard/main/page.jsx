// app/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { FilterIcon, Search, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext'; // Import useCart

const Page = () => {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortOrder, setSortOrder] = useState('none');
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const { addItemToCart } = useCart(); // Use the useCart hook to get addItemToCart

  const categoryMap = {
    Todos: 'Todos',
    'smartphones': 'Smartphones',
    laptops: 'Notebooks',
    'tablets': "tablets",
    'mobile-accessories': "Acessórios de celular",
    fragrances: 'Fragrâncias',
    groceries: 'Mercearia',
    'home-decoration': 'Decoração para Casa',
    furniture: 'Móveis',
    'mens-shirts': 'Camisas Masculinas',
    'mens-shoes': 'Sapatos Masculinos',
    'mens-watches': 'Relógios Masculinos',
    motorcycle: 'Motocicletas',
    skincare: 'Cuidados com a Pele',
    'womens-dresses': 'Vestidos Femininos',
    'womens-shoes': 'Sapatos Femininos',
    'womens-watches': 'Relógios Femininos',
    'womens-bags': 'Bolsas Femininas',
    'womens-jewellery': 'Joias Femininas',
    sunglasses: 'Óculos de Sol',
    automotive: 'Automotivo',
  };

  const categoriesForDisplay = ['Todos', ...Object.keys(categoryMap).filter(key => key !== 'Todos')];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/products?limit=0');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setDados(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const valorConvertido = (price) => {
    const novoValor = parseFloat(price) * 6;
    return novoValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleAddToCart = (product) => {
    addItemToCart(product);
    alert(`"${product.title}" adicionado ao carrinho!`);
  };

  const sortedAndFilteredProducts = dados
    .filter((produto) => {
      const matchesCategory =
        selectedCategory === 'Todos' || produto.category === selectedCategory;

      const matchesSearchTerm =
        produto.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produto.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearchTerm;
    })
    .sort((a, b) => {
      if (sortOrder === 'priceAsc') {
        return a.price - b.price;
      }
      if (sortOrder === 'priceDesc') {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <div className="w-full min-h-screen font-sans bg-gray-50 mt-32">
      <main className="px-4 md:px-12 py-6">
        <div className='relative px-4 md:px-8 pt-16 pb-12 md:pb-24 rounded-[3rem] overflow-hidden shadow-xl min-h-[400px] flex items-center justify-center bg-gradient-to-br from-blue-300 to-blue-600'>
          <div className="absolute inset-0 bg-blue-500 opacity-20"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-20 lg:px-40">
            <h1 className='text-4xl md:text-7xl font-extrabold max-w-xl text-center md:text-left leading-tight text-blue-900 drop-shadow-md'>
              Busque seus sonhos e sua <span className="text-white">NextBuy</span>
            </h1>

            <div className='relative mt-8 md:mt-0'>
              <img src="/banner.png" alt='banner' className="h-[400px] w-[400px] object-contain" />
            </div>
          </div>
        </div>

        <div className='bg-white p-8 mt-8 rounded-3xl shadow-lg'>
          <section className='mb-8'>
            <div className='flex flex-col md:flex-row gap-4 items-center mb-6'>
              <div className='relative flex-grow w-full md:w-auto'>
                <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
                <input
                  type="text"
                  placeholder="Pesquisar produtos..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-lg bg-white shadow-sm'
                />
              </div>

              <button
                onClick={() => setShowFilterOptions(!showFilterOptions)}
                className="flex md:hidden gap-2 items-center bg-blue-50 py-3 px-5 rounded-full hover:bg-blue-100 transition duration-300 shadow-sm cursor-pointer whitespace-nowrap"
              >
                <FilterIcon />
                <span>{showFilterOptions ? 'Esconder Filtros' : 'Mostrar Filtros'}</span>
              </button>

              <div className={`flex flex-col md:flex-row gap-4 w-full md:w-auto ${showFilterOptions ? 'flex' : 'hidden md:flex'}`}>
                <div className='relative w-full md:w-auto'>
                  <select
                    value={sortOrder}
                    onChange={handleSortChange}
                    className='appearance-none w-full bg-blue-50 py-3 px-5 pr-10 rounded-full shadow-sm cursor-pointer border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-lg text-blue-800 font-semibold'
                  >
                    <option value="none">Ordenar por...</option>
                    <option value="priceAsc">Preço: Menor para Maior</option>
                    <option value="priceDesc">Preço: Maior para Menor</option>
                  </select>
                  <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none' size={20} />
                </div>
              </div>
            </div>

            <h2 className="text-xl md:text-3xl font-bold text-blue-800 mb-6 text-center md:text-left mt-8">
              Categorias Populares
            </h2>
            <div className="flex overflow-x-auto pb-4 scrollbar-hide">
              <div className="flex gap-3 md:gap-4 px-2">
                {categoriesForDisplay.map((categoryKey, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategoryClick(categoryKey)}
                    className={`flex-shrink-0 font-semibold cursor-pointer py-2.5 px-5 rounded-full shadow-md transition duration-300 ease-in-out whitespace-nowrap text-sm md:text-base ${
                      selectedCategory === categoryKey
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    }`}
                  >
                    {categoryMap[categoryKey]}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-8 border-t pt-8 border-zinc-200">
            {loading && <p className="text-center text-blue-700 text-lg">Carregando produtos...</p>}
            {error && <p className="text-center text-red-600 text-lg">Erro ao carregar produtos: {error}</p>}
            {!loading && !error && sortedAndFilteredProducts.length === 0 && (
              <p className="text-center text-blue-700 text-lg">Nenhum produto encontrado com os critérios selecionados.</p>
            )}

            {!loading && !error && sortedAndFilteredProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedAndFilteredProducts.map((produto) => (
                  <div
                    key={produto.id}
                    className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between duration-300 hover:bg-blue-50 hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <Link href={`/produto/${produto.id}`} className="flex flex-col h-full">
                      <div className='w-full justify-center flex mb-4'>
                        <img
                          src={produto.thumbnail}
                          alt={produto.title}
                          className="w-full h-48 object-contain rounded-md"
                          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/250x200/D1E9FF/1C3AA9?text=Sem+Imagem`; }}
                        />
                      </div>

                      <div className="flex-grow mb-4">
                        <h3 className="text-xl font-semibold text-blue-900 mb-1 leading-tight">{produto.title}</h3>
                        <span className="text-2xl font-bold text-blue-700">{valorConvertido(produto.price)}</span>
                      </div>
                    </Link>
                    <div className="mt-auto">
                      {/* Changed to a button and uses handleAddToCart */}
                      <button
                        onClick={() => handleAddToCart(produto)}
                        className='bg-blue-600 w-full text-center hover:bg-blue-700 cursor-pointer transition duration-300 py-3 rounded-full text-white font-bold text-lg shadow-md flex items-center justify-center'
                      >
                        Adicionar ao carrinho
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Page;