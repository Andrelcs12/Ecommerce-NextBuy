// app/(auth)/login/page.jsx
"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext'; // Ajuste o caminho conforme sua estrutura
import { useToast } from '../context/ToastContext'; 
import { Mail, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const { showToast } = useToast(); 
    
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(email, password);
        if (success) {
            showToast('Login realizado com sucesso!', 'success'); 
            router.push("/dashboard");
        } else {
            showToast('Email ou senha incorretos. Por favor, tente novamente.', 'error'); 
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div className='flex flex-col lg:flex-row w-full min-h-screen font-sans'>
    
            <div className='hidden lg:flex lg:w-1/2 bg-blue-600 justify-center items-center p-8'>
                <div className='text-white text-center flex flex-col items-center justify-center'>
                    <Image
                        src="/login.png"
                        alt='Ilustração de login'
                        height={400}
                        width={400}
                        className='mb-8 object-contain max-w-full h-auto'
                    />
                    <h2 className='text-3xl lg:text-5xl font-extrabold mb-4 leading-tight'>Bem-vindo à NextBuy</h2>
                    <p className='text-lg lg:text-2xl opacity-95'>Acesso rápido, compras inteligentes. Conecte-se à NextBuy</p>
                </div>
            </div>

            <div className='w-full lg:w-1/2 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8'>
                <div className='w-full sm:w-4/5 2xl:w-2/3 rounded-2xl p-6 sm:p-8 lg:p-12 shadow-lg bg-white'>
                    <div className='flex items-center justify-center mb-8 gap-3 sm:gap-4'>
                        <Image src="/image.png" alt='Logo da NextBuy' height={70} width={35} className='w-auto h-auto max-w-[45px]' />
                        <h1 className='text-3xl md:text-5xl font-extrabold text-gray-800 tracking-wider'>NEXTBUY</h1>
                    </div>

                    <h2 className='text-xl md:text-3xl font-bold text-gray-700 mb-8 text-center'>Faça Login para começar</h2>

                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div className='relative'>
                            <Mail className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
                            <label htmlFor="email" className='sr-only'>Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                placeholder='Email'
                                className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-sm md:text-lg bg-white'
                                required
                            />
                        </div>
                        <div className='relative'>
                            <Lock className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
                            <label htmlFor="password" className='sr-only'>Digite sua senha</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                placeholder='Digite sua senha'
                                className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200  text-sm md:text-lg bg-white'
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className='w-full cursor-pointer bg-blue-600 text-white md:py-3.5 py-3 rounded-lg font-semibold md:text-lg text-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 shadow-md hover:shadow-lg'
                        >
                            Entrar
                        </button>

                        <div className='text-center text-base md:mt-5'>
                            <a href="#" className='text-blue-600 hover:underline font-medium'>Esqueceu sua senha?</a>
                        </div>

                        <div className='text-center text-base text-gray-600 md:mt-8'>
                            Não tem uma conta?{' '}
                            <a href="/cadastro" className='text-blue-600 hover:underline font-medium'>Crie sua conta</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;