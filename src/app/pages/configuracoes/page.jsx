
'use client';

import Header from "../../components/Header";
import { ArrowLeft, User } from "lucide-react"; 
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const SettingsPage = () => {
  const { user } = useAuth();
 
  const [activeMenu, setActiveMenu] = useState("configuracoes_gerais"); 

  
  const GeneralSettingsContent = () => (
    <div>
      <h2 className="md:text-2xl text-xl font-bold text-gray-800 mb-4">Página de Configuração</h2>
      <p className="text-gray-600 mb-6">
        Esta é a área para gerenciar suas preferências e configurações gerais da conta.
      </p>
      <div className="bg-blue-50 p-6 rounded-lg text-blue-800 border border-blue-200">
        <p>As funcionalidades de configuração estarão disponíveis aqui futuramente.</p>
        <p className="mt-2">**Funcionalidades em desenvolvimento.**</p>
      </div>
    </div>
  );

 
  const renderContent = () => {
    return <GeneralSettingsContent />;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 p-3 border border-zinc-300 rounded-lg w-fit text-gray-700 hover:text-blue-600 transition-colors duration-300 mb-6">
          <ArrowLeft size={20} />
          <span className="font-bold">Voltar para Home</span>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className={`rounded-full h-28 w-28 sm:h-32 sm:w-32 flex items-center justify-center font-bold text-5xl sm:text-6xl bg-blue-600 text-white`}>
            {user?.nome ? user.nome.charAt(0) : <User size={48} />}
          </div>
          <div className="flex flex-col text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Configurações de {user?.nome || 'Usuário'}</h1>
            <p className="text-gray-600 text-lg">{user?.email || 'email@example.com'}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
      
          <aside className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-6">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveMenu('configuracoes_gerais')}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer text-md md:text-lg font-semibold w-full text-left transition-all duration-300 
                    ${activeMenu === 'configuracoes_gerais'
                      ? 'text-blue-700 bg-blue-50 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-l-4 hover:border-blue-300'
                    }`}
                >
                  <User size={20} /> 
                  Configurações Gerais
                </button>
              </li>
              
            </ul>
          </aside>

          <main className="w-full md:w-3/4 bg-white rounded-lg shadow-md p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;