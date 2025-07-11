// components/MenuPerfil.jsx
'use client'
import React, { useEffect, useRef } from 'react'
import { CircleUserRound, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import gsap from 'gsap'
import { useAuth } from '../context/AuthContext'

const MenuPerfil = ({ isOpen }) => {
    const { logout } = useAuth();
    const menuRef = useRef(null)

    useEffect(() => {
        gsap.to(menuRef.current, {
            y: isOpen ? 2 : -20,
            opacity: isOpen ? 1 : 0,
            duration: 0.5,
            display: isOpen ? 'block' : 'none',
            ease: 'power2.out'
        })
    }, [isOpen])

    return (
        <div
            ref={menuRef}
            className="top-4 w-full p-4 rounded-2xl bg-blue-50 shadow-xl opacity-0 hidden"
        >
            <ul className="flex flex-col gap-4">
                <li>
                    <Link href="/pages/perfil" className="flex gap-2 cursor-pointer hover:bg-blue-100 rounded-xl p-4 items-center font-semibold">
                        <CircleUserRound />
                        <h1>Ver Perfil</h1>
                    </Link>
                </li>
                <li>
                    
                    <Link href="/pages/configuracoes" className="flex w-full gap-2 cursor-pointer hover:bg-blue-100 rounded-xl p-4 items-center font-semibold">
                        <Settings />
                        <h1>Configurações</h1>
                    </Link>
                </li>
                <li>
                    <button onClick={logout} className="flex w-full gap-2 cursor-pointer hover:bg-blue-100 rounded-xl p-4 items-center font-semibold">
                        <LogOut />
                        <h1>Sair</h1>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default MenuPerfil