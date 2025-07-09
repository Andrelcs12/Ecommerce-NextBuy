// components/Header.jsx (Updated to show dynamic cart item count)
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { House, Package, Inbox, ShoppingCart, ChevronDown, ChevronUp, Search, FilterIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Menuperfil from './menuperfil';
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext"; 

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const pathname = usePathname();
  const { user } = useAuth();
  const { getTotalItems } = useCart(); 

  const [menuPerfil, setMenuperfil] = useState(false);
  const handleMenuPerfil = () => {
    setMenuperfil(!menuPerfil);
  };

   const handleSearchChange = (event) => { 
    setSearchTerm(event.target.value);
  };

  return (
    <header className="py-4 px-12 bg-gradient-to-r ">
      <div className="flex justify-between items-center bg-zinc-200 rounded-full p-4 shadow-lg">
        <div className="flex items-center gap-4">
          <Image src="/image.png" alt="Logo da NextBuy" width={38} height={38} />
          <h1 className="text-3xl font-extrabold text-blue-800 tracking-wider">NEXTBUY</h1>
        </div>

        <nav>
          <ul className="flex gap-6 font-semibold">
            <li>
              <Link href="/dashboard" className={`relative flex gap-2 items-center py-4 px-5 rounded-full transition duration-300 shadow-sm ${
                pathname === '/dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-50 hover:bg-blue-100 text-blue-800'
              }`}>
                <House size={22} className={`${pathname === '/dashboard' ? 'text-white' : 'text-blue-500'} transition-colors duration-300`} />
                Home
                <span className={`absolute bottom-0 left-0 h-[3px] rounded-full transition-all duration-300 ${pathname === '/' ? 'w-full bg-white' : 'w-0 bg-blue-600 group-hover:w-full'}`}></span>
              </Link>
            </li>
            <li>
              <Link href="/pages/perfil" className={`relative flex gap-2 items-center py-4 px-5 rounded-full transition duration-300 shadow-sm ${
                pathname === '/myProducts' ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-50 hover:bg-blue-100 text-blue-800'
              }`}>
                <Package size={22} className={`${pathname === '/myProducts' ? 'text-white' : 'text-blue-500'} transition-colors duration-300`} />
                Meus Pedidos
                <span className={`absolute bottom-0 left-0 h-[3px] rounded-full transition-all duration-300 ${pathname === '/meus-pedidos' ? 'w-full bg-white' : 'w-0 bg-blue-600 group-hover:w-full'}`}></span>
              </Link>
            </li>
            <li>
              <Link href="/contato" className={`relative flex gap-2 items-center py-4 px-5 rounded-full transition duration-300 shadow-sm ${
                pathname === '/contato' ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-50 hover:bg-blue-100 text-blue-800'
              }`}>
                <Inbox size={22} className={`${pathname === '/contato' ? 'text-white' : 'text-blue-500'} transition-colors duration-300`} />
                Contato
                <span className={`absolute bottom-0 left-0 h-[3px] rounded-full transition-all duration-300 ${pathname === '/contato' ? 'w-full bg-white' : 'w-0 bg-blue-600 group-hover:w-full'}`}></span>
              </Link>
            </li>
          </ul>
        </nav>

        <section className='flex'>
          <div className="flex items-center justify-between bg-blue-50 p-2 md:p-3 rounded-full max-w-md w-full shadow-md focus-within:ring-4 focus-within:ring-blue-300 transition-all duration-300">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="px-4 py-2 text-base md:text-lg bg-transparent outline-none w-full placeholder-blue-400 text-blue-800"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="bg-blue-600 p-2 rounded-full shadow-md hover:bg-blue-400 cursor-pointer transition duration-300 ease-in-out">
              <Search size={22} className="text-white" strokeWidth={2.5} />
            </button>
          </div>
        </section>

        <div className="flex items-center gap-4 ">
          <Link href="/carrinho" className={`relative flex gap-2 items-center py-4 px-5 rounded-full transition duration-300 shadow-sm ${
            pathname === '/carrinho' ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-50 hover:bg-blue-100 text-blue-800'
          }`}>
            <ShoppingCart color={`${pathname === '/carrinho' ? '#FFFFFF' : '#3B82F6'}`} strokeWidth={2.5} />
            {/* Display dynamic cart item count */}
            <span className={`${pathname === '/carrinho' ? 'text-white' : 'text-blue-700'} font-bold text-lg`}>
              {getTotalItems()}
            </span>
          </Link>

          <div className='relative cursor-pointer'>
            <div onClick={handleMenuPerfil} className={`relative flex gap-2 items-center py-3 px-5 rounded-full transition duration-300 shadow-sm ${
              pathname === '/perfil' ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-50 hover:bg-blue-100 text-blue-800'
            }`}>
              <h1 className={`${pathname === '/perfil' ? 'text-white' : 'text-blue-800'} text-lg font-bold`}>{user?.nome} {user?.sobrenome}</h1>
              <div className={`rounded-full h-10 w-10 flex items-center justify-center font-bold text-sm ${pathname === '/perfil' ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>
                 {user?.nome ? user.nome.charAt(0) : ''}{user?.sobrenome ? user.sobrenome.charAt(0) : ''}
              </div>

              {menuPerfil ? (
                <ChevronUp size={20} className={`${pathname === '/perfil' ? 'text-white' : 'text-blue-600'}`} />
              ) : (
                <ChevronDown size={20} className={`${pathname === '/perfil' ? 'text-white' : 'text-blue-600'}`} />
              )}
            </div>
            <div>
              {menuPerfil && (
                <div >
                  <Menuperfil isOpen={true} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;