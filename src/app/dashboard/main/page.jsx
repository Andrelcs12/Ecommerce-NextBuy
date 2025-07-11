'use client';

import React, { useState, useEffect } from 'react';
import { FilterIcon, Search, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext'; 
import {useToast} from "../../context/ToastContext"
import Footer from "../../components/footer"
const Page = () => {
  const { showToast } = useToast();
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortOrder, setSortOrder] = useState('none');
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const { addItemToCart } = useCart(); 

  const categoryMap = {
    Todos: 'Todos',
    'smartphones': 'Smartphones',
    laptops: 'Notebooks',
    'tablets': "Tablets",
    'mobile-accessories': "Acessórios de Celular",
    fragrances: 'Fragrâncias',
    groceries: 'Mercearia',
    'home-decoration': 'Decoração para Casa',
    furniture: 'Móveis',
    'mens-shirts': 'Camisas Masculinas',
    'mens-shoes': 'Sapatos Masculinos',
    'mens-watches': 'Relógios Masculinos',
    motorcycle: 'Motocicletas',
    'womens-dresses': 'Vestidos Femininos',
    'womens-shoes': 'Sapatos Femininos',
    'womens-watches': 'Relógios Femininos',
    'womens-bags': 'Bolsas Femininas',
    'womens-jewellery': 'Joias Femininas',
    sunglasses: 'Óculos de Sol',
  };

  const categoriesForDisplay = ['Todos', ...Object.keys(categoryMap).filter(key => key !== 'Todos')];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://dummyjson.com/products?limit=0'); 
        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
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
    showToast(`"${product.title}" adicionado ao carrinho!`); 
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
    <div className="w-full min-h-screen font-sans  2xl:mt-32 mt-16">
      <main className=" py-6">
        <div className='relative  px-4 md:px-8 pt-16 pb-12 md:pb-24  overflow-hidden shadow-xl min-h-[400px] flex items-center justify-center bg-gradient-to-br from-blue-300 to-blue-600'>
          <div className="absolute inset-0 bg-blue-500 opacity-20"></div>

          <div className="relative  z-10 flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-20 lg:px-40">
            <h1 className='text-2xl md:text-7xl font-extrabold max-w-xl text-center md:text-left leading-tight text-blue-900 drop-shadow-md'>
              Busque seus sonhos e sua <span className="text-white">NextBuy</span>
            </h1>

            <div className='relative mt-8 md:mt-0'>
              <img 
                src="/banner.png" 
                alt='Banner promocional de produtos' 
                className="md:h-[400px] md:w-[400px] w-[200px] object-contain" 
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x400/D1E9FF/1C3AA9?text=NextBuy`; }}
              />
            </div>
          </div>
        </div>

        <div className=' p-4 mt-0  md:mt-8 rounded-3xl shadow-lg'>
          <section className='mb-8' aria-label="Filtros e busca de produtos">
            <div className='flex gap-4 items-center mb-6'>
              
              <div className='relative flex-grow w-full md:w-auto'>
                <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={20} aria-hidden="true" />
                <label htmlFor="product-search" className="sr-only">Pesquisar produtos</label>
                <input
                  id="product-search"
                  type="text"
                  placeholder="Pesquisar produtos..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className='w-full pl-12 pr-4 md:py-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 md:text-lg text-md bg-white shadow-sm'
                  aria-label="Campo de pesquisa de produtos"
                />
              </div>

              

              <div id="filter-sort-options" className={`flex flex-col md:flex-row gap-4 w-full md:w-auto ${showFilterOptions ? 'flex' : ' md:flex'}`}>
                <div className='relative w-full md:w-auto'>
                  <label htmlFor="sort-order" className="sr-only">Ordenar produtos por</label>
                  <select
                    id="sort-order"
                    value={sortOrder}
                    onChange={handleSortChange}
                    className='appearance-none w-full bg-blue-50 md:py-3 py-2 px-5 pr-10 rounded-md shadow-sm cursor-pointer border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 md:text-lg text-md text-blue-800 font-semibold'
                    aria-label="Selecionar ordem de exibição dos produtos"
                  >
                    <option value="none">Ordenar por...</option>
                    <option value="priceAsc">Preço: Menor para Maior</option>
                    <option value="priceDesc">Preço: Maior para Menor</option>
                  </select>
                  <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none' size={20} aria-hidden="true" />
                </div>
              </div>
            </div>

            <h2 className="text-xl md:text-3xl font-bold text-blue-800 mb-6 text-center md:text-left mt-8">
              Categorias Populares
            </h2>
            <div className="flex overflow-x-auto pb-4 scrollbar-hide" role="group" aria-label="Navegação por categoria de produtos">
              <div className="flex gap-3 md:gap-4 px-2">
                {categoriesForDisplay.map((categoryKey) => (
                  <button
                    key={categoryKey}
                    onClick={() => handleCategoryClick(categoryKey)}
                    className={`flex-shrink-0 font-semibold cursor-pointer py-2.5 px-8 rounded-full shadow-md transition duration-300 ease-in-out whitespace-nowrap text-sm md:text-base ${
                      selectedCategory === categoryKey
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    }`}
                    aria-pressed={selectedCategory === categoryKey}
                    aria-label={`Filtrar por categoria: ${categoryMap[categoryKey]}`}
                  >
                    {categoryMap[categoryKey]}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-8 border-t pt-8 border-zinc-200" aria-label="Lista de produtos disponíveis">
            {loading && <p className="text-center text-blue-700 text-lg" aria-live="polite">Carregando produtos...</p>}
            {error && <p className="text-center text-red-600 text-lg" aria-live="assertive">Erro ao carregar produtos: {error}</p>}
            {!loading && !error && sortedAndFilteredProducts.length === 0 && (
              <p className="text-center text-blue-700 text-lg" aria-live="polite">Nenhum produto encontrado com os critérios selecionados.</p>
            )}

            {!loading && !error && sortedAndFilteredProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedAndFilteredProducts.map((produto) => (
                  <div
                    key={produto.id}
                    className="bg-white rounded-xl shadow-lg md:p-6 p-3 flex flex-col justify-between duration-300 hover:bg-blue-50 hover:shadow-xl transform hover:-translate-y-1"
                    role="article" 
                    aria-labelledby={`product-title-${produto.id}`}
                  >
                    <Link href={`/produto/${produto.id}`} className="flex flex-col h-full" aria-label={`Ver detalhes de ${produto.title}`}>
                      <div className='w-full justify-center flex mb-4'>
                        <img
                          loading="lazy"
                          src={produto.thumbnail}
                          alt={produto.title}
                          className="w-full md:h-48 h-36 object-contain rounded-md"
                          onError={(e) => {
                            if (e.target.src !== `https://placehold.co/250x200/D1E9FF/1C3AA9?text=Sem+Imagem`) {
                              e.target.onerror = null;
                              e.target.src = `https://placehold.co/250x200/D1E9FF/1C3AA9?text=Sem+Imagem`;
                            }
                          }}
                        />

                      </div>

                      <div className="flex-grow mb-4">
                        <h3 id={`product-title-${produto.id}`} className="md:text-xl text-sm  font-semibold text-blue-900 mb-1 leading-tight">{produto.title}</h3>
                        <span className="md:text-2xl text-md font-bold text-blue-700">{valorConvertido(produto.price)}</span>
                      </div>
                    </Link>
                    <div className="mt-auto">
                      <button
                        onClick={() => handleAddToCart(produto)}
                        className='bg-blue-600 w-full text-center hover:bg-blue-700 cursor-pointer transition duration-300 md:py-3 py-2 rounded-full text-white font-bold md:text-lg text-sm shadow-md flex items-center justify-center'
                        aria-label={`Adicionar ${produto.title} ao carrinho`}
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
      <Footer />
    </div>
  );
};

export default Page;