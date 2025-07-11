'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Main from "./main/page" 
const Dashboard = () => {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading]);

  if (loading) return <p>Carregando...</p>;

  const handleApagar = () => {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('users');
    router.push('/cadastro');
  };

  return (
    <div className='relative'>
      <div className='fixed top-0 left-0 w-full z-50'>
        <Header />
      </div>

      <div>
        <Main />
      </div>


      <h1 className='text-center font-bold text-5xl text-red-600'>OIIIIIIIII {user?.nome}</h1>
      <button onClick={handleApagar}>Limpar dados</button>
      <button onClick={logout}>Sair</button>
    </div>
  );
};

export default Dashboard;
