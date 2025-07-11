'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { House, Package, Menu, Inbox, ShoppingCart, ChevronDown, ChevronUp, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Menuperfil from './menuperfil';
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext"; 
import gsap from 'gsap';

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

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuRef.current) return;

    if (showMenu) {
      gsap.set(menuRef.current, { display: 'block', y: -80, opacity: 0 }); 
      gsap.to(menuRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.3,
      
      });
    } else {
      gsap.to(menuRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.1,
        
        onComplete: () => {
          gsap.set(menuRef.current, { display: 'none' });
        },
      });
    }
  }, [showMenu]);

  return (
    <header className="shadow-md">
      <div className="flex justify-between items-center bg-zinc-300 py-4 px-4 sm:p-3 md:p-4 shadow-lg relative">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <Link href="/" className='flex gap-2 items-center'>
            <Image src="/image.png" alt="Logo da NextBuy" width={1000} height={32} className="sm:w-12 sm:h-12 hidden sm:flex" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-blue-800 tracking-wider">NEXTBUY</h1>
          </Link>
        </div>

        <div onClick={() => setShowMenu(!showMenu)} className='flex 2xl:hidden px-2 sm:px-4 md:px-8 hover:bg-white h-8 rounded-full items-center justify-center cursor-pointer'>
          <Menu size={24} />
          <h1 className='font-semibold text-base'>Menu</h1>
        </div>
        
        <div ref={menuRef} className="absolute top-full mt-4 left-0 w-full bg-zinc-200 rounded-xl shadow-lg 2xl:hidden z-50 py-4" style={{ display: 'none' }}>
          <nav className='flex flex-col items-center'>
            <ul className="flex flex-col gap-2 sm:gap-3 font-semibold w-full">
              <li>
                <Link href="/dashboard" className={`relative flex gap-2 items-center py-3 px-4 rounded-full transition duration-300 shadow-sm mx-2 ${
                  pathname === '/dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-50 hover:bg-blue-100 text-blue-800'
                }`}>
                  <House size={20} className={`${pathname === '/dashboard' ? 'text-white' : 'text-blue-500'} transition-colors duration-300`} />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/pages/perfil" className={`relative flex gap-2 items-center py-3 px-4 rounded-full transition duration-300 shadow-sm mx-2 ${
                  pathname === '/myProducts' ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-50 hover:bg-blue-100 text-blue-800'
                }`}>
                  <Package size={20} className={`${pathname === '/myProducts' ? 'text-white' : 'text-blue-500'} transition-colors duration-300`} />
                  Meus Pedidos
                </Link>
              </li>
              <li>
                <Link href="/contato" className={`relative flex gap-2 items-center py-3 px-4 rounded-full transition duration-300 shadow-sm mx-2 ${
                  pathname === '/contato' ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-50 hover:bg-blue-100 text-blue-800'
                }`}>
                  <Inbox size={20} className={`${pathname === '/contato' ? 'text-white' : 'text-blue-500'} transition-colors duration-300`} />
                  Contato
                </Link>
              </li>
              
              <li className="w-full px-2 mt-2">
                <Link href="/carrinho" className={`relative flex gap-2 items-center py-3 px-4 rounded-full transition duration-300 shadow-sm ${
                  pathname === '/carrinho' ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-50 hover:bg-blue-100 text-blue-800'
                }`}>
                  <ShoppingCart color={`${pathname === '/carrinho' ? '#FFFFFF' : '#3B82F6'}`} strokeWidth={2.5} />
                  <span className={`${pathname === '/carrinho' ? 'text-white' : 'text-blue-700'} font-bold text-base`}>
                    Carrinho ({getTotalItems()})
                  </span>
                </Link>
              </li>
              <li className="w-full px-2 mt-2">
                <div className='relative cursor-pointer'>
                  <div onClick={handleMenuPerfil} className={`relative flex gap-2 items-center py-3 px-4 rounded-full transition duration-300 shadow-sm ${
                    pathname === '/perfil' ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-50 hover:bg-blue-100 text-blue-800'
                  }`}>
                    <h1 className={`${pathname === '/perfil' ? 'text-white' : 'text-blue-800'} text-base font-bold`}>
                      {user?.nome} {user?.sobrenome}
                    </h1>
                    <div className={`rounded-full h-8 w-8 flex items-center justify-center font-bold text-xs ${pathname === '/perfil' ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>
                      {user?.nome ? user.nome.charAt(0) : ''}{user?.sobrenome ? user.sobrenome.charAt(0) : ''}
                    </div>
                    {menuPerfil ? (
                      <ChevronUp size={18} className={`${pathname === '/perfil' ? 'text-white' : 'text-blue-600'}`} />
                    ) : (
                      <ChevronDown size={18} className={`${pathname === '/perfil' ? 'text-white' : 'text-blue-600'}`} />
                    )}
                  </div>
                  {menuPerfil && (
                    <div className="absolute top-full right-0 mt-2 z-10 w-full sm:w-auto">
                      <Menuperfil isOpen={true} />
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </nav>
        </div>

        <nav className='hidden 2xl:flex '>
          <ul className="flex gap-4 sm:gap-6 font-semibold">
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
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="items-center gap-4 hidden 2xl:flex">
          <Link href="/carrinho" className={`relative flex gap-2 items-center py-4 px-5 rounded-full transition duration-300 shadow-sm ${
            pathname === '/carrinho' ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-50 hover:bg-blue-100 text-blue-800'
          }`}>
            <ShoppingCart color={`${pathname === '/carrinho' ? '#FFFFFF' : '#3B82F6'}`} strokeWidth={2.5} />
            <span className={`${pathname === '/carrinho' ? 'text-white' : 'text-blue-700'} font-bold text-lg`}>
              {getTotalItems()} 
              {getTotalItems() > 1 ? " produtos" : " produto"}
            </span>
          </Link>

          <div className='relative cursor-pointer'>
            <div onClick={handleMenuPerfil} className={`relative flex gap-2 items-center py-3 px-5 rounded-full transition duration-300 shadow-sm ${
              pathname === '/perfil' ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-50 hover:bg-blue-100 text-blue-800'
            }`}>
              <h1 className={`${pathname === '/perfil' ? 'text-white' : 'text-blue-800'} text-lg font-bold`}>{user?.nome}</h1>
              <div className={`rounded-full h-10 w-10 flex items-center justify-center font-bold text-sm ${pathname === '/perfil' ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>
                  {user?.nome ? user.nome.charAt(0) : ''}
              </div>

              {menuPerfil ? (
                <ChevronUp size={20} className={`${pathname === '/perfil' ? 'text-white' : 'text-blue-600'}`} />
              ) : (
                <ChevronDown size={20} className={`${pathname === '/perfil' ? 'text-white' : 'text-blue-600'}`} />
              )}
            </div>
            {menuPerfil && (
              <div className="absolute top-full mt-2 z-10">
                <Menuperfil isOpen={true} />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;