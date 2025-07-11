"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { Mail, Lock, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import {useToast} from "../context/ToastContext"

const RegisterPage = () => {
    const { showToast} = useToast();
    const router = useRouter();
    const { cadastro } = useAuth();
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            showToast('As senhas não coincidem. Por favor, tente novamente.');
            return;
        }
        

        const success = cadastro(nome, sobrenome, email, password);
        if (password.length < 8) {
            showToast("Senha deve ter 8 ou mais caracteres");
        } else if (success) {
            showToast('Cadastro realizado com sucesso!');
            router.push("/dashboard");
        } else {
            showToast('Erro ao cadastrar. Verifique se o email já está em uso.');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
    }

    return (
        <div className='flex flex-col lg:flex-row w-full min-h-screen font-sans'>
           
            <div className='hidden lg:flex lg:w-1/2 bg-blue-600 items-center justify-center p-8'>
                <div className='text-white text-center p-8 flex flex-col items-center '>
                    <Image
                        src="/cadastro.png"
                        alt='Ilustração de cadastro'
                        height={90} 
                        width={500} 
                        className='h-auto max-w-full mb-8 object-contain'
                    />
                    <h2 className='text-3xl lg:text-4xl font-extrabold mb-4'>Sua jornada de compras começa aqui!</h2>
                    <p className='text-lg lg:text-xl opacity-90'>Aproveite ofertas exclusivas, rastreie seus pedidos e salve seus produtos favoritos.</p>
                </div>
            </div>

           
            <div className='w-full lg:w-2/3 xl:w-1/2 min-h-screen flex items-center justify-center '>
                <div className='w-full sm:w-4/5  2xl:w-2/3 rounded-2xl p-6 sm:p-8 lg:p-12 shadow-lg bg-white'>
                    <div className='flex items-center justify-center mb-8 gap-3 sm:gap-4'>
                        <Image src="/image.png" alt='Logo da NextBuy' height={70} width={35} className='w-auto h-auto max-w-[45px]' />
                        <h1 className='text-3xl sm:text-5xl font-extrabold text-gray-800 tracking-wider'>NEXTBUY</h1>
                    </div>

                    <h2 className='text-xl md:text-3xl font-bold text-gray-700 mb-8 text-center'>Crie sua conta NextBuy</h2>

                    <form className='space-y-6' onSubmit={handleSubmit}>
                        
                        <div className='flex flex-col xl:flex-row gap-4'>
                            <div className='relative w-full '>
                                <User className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
                                <input
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    type="text"
                                    id="nome"
                                    placeholder='Nome'
                                    className='w-full bg-white pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 md:text-lg text-sm'
                                />
                            </div>
                            <div className='relative w-full'>
                                <User className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
                                <input
                                    value={sobrenome}
                                    onChange={(e) => setSobrenome(e.target.value)}
                                    type="text"
                                    id="sobrenome"
                                    placeholder='Sobrenome'
                                    className='w-full bg-white pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 md:text-lg text-sm'
                                />
                            </div>
                        </div>

                      
                        <div className='relative'>
                            <Mail className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
                            <label htmlFor="email" className='sr-only'>Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                placeholder='Email'
                                className='w-full bg-white pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 md:text-lg text-sm'
                            />
                        </div>

                    
                        <div className='relative'>
                            <Lock className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
                            <label htmlFor="password" className='sr-only'>Crie sua senha</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                placeholder='Crie sua senha (8+ caracteres)'
                                className='w-full bg-white pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 md:text-lg text-sm'
                            />
                        </div>

                     
                        <div className='relative'>
                            <Lock className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
                            <label htmlFor="confirmPassword" className='sr-only'>Confirme sua senha</label>
                            <input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                id="confirmPassword"
                                placeholder='Confirme sua senha'
                                className='w-full bg-white pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 md:text-lg text-sm'
                            />
                        </div>

                       
                        <button
                            type="submit"
                            className='w-full bg-green-600 text-white md:py-3.5 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 shadow-md hover:shadow-lg cursor-pointer'
                        >
                            Criar Conta
                        </button>

                     
                        <div className='text-center lg:text-lg text-gray-600 mb-8'>
                            Já tem uma conta?{' '}
                            <a href="/login" className='text-blue-600 hover:underline font-medium'>Faça Login</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;