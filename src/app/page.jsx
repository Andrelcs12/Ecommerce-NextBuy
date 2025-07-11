"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "./context/AuthContext"

export default function Home() {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading) {
            if (user) {
                router.push('/dashboard');
            } else {
                router.push('/cadastro');
            }
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <p>Carregando...</p>
            </div>
        );
    }

    return null;
}