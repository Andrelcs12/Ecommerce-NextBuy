
import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Linkedin, Github, Facebook } from 'lucide-react';
import  Image  from "next/image"
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className=" gap-8 md:gap-12">

        
        <div className='xl:flex grid  lg:grid-cols-3 md:grid-cols-2 gap-16 px-20 '>
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link href="/" className="text-2xl font-bold text-white mb-3 hover:text-blue-400 transition-colors">
            <div className="flex items-center gap-4">
                <Image src="/image.png" alt="Logo da NextBuy" width={38} height={38} />
                <h1 className="text-3xl font-extrabold text-whitetracking-wider">NEXTBUY</h1>
            </div>
          </Link>
          <p className="text-md mb-4 w-2/3">
            Sua próxima compra começa aqui. Qualidade e inovação ao seu alcance.
          </p>
          <div className="flex space-x-4">
            
            <a href="https://www.instagram.com/andrelucas___?igsh=bnZpeTh4eGF1MDZq&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 border-1 border-white p-2 rounded-lg hover:bg-zinc-600 hover:text-white transition-colors">
              <Instagram size={24} />
            </a>
            <a href="https://github.com/Andrelcs12" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-400 border-1 border-white p-2 rounded-lg hover:bg-zinc-600 hover:text-white transition-colors">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/andrelucasdev/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 border-1 border-white p-2 rounded-lg hover:bg-zinc-600 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-2xl font-semibold text-white mb-4">Atendimento</h3>
          <ul className="space-y-2 text-md md:text-lg">
            <li><Link href="/" className="hover:text-blue-400 transition-colors">Fale Conosco</Link></li>
            <li><Link href="/" className="hover:text-blue-400 transition-colors">Perguntas Frequentes</Link></li>
            <li><Link href="/" className="hover:text-blue-400 transition-colors">Trocas e Devoluções</Link></li>
            <li><Link href="/" className="hover:text-blue-400 transition-colors">Acompanhar Pedido</Link></li>
          </ul>
        </div>

        
        <div className="col-span-1 md:col-span-1 ">
          <h3 className="text-2xl font-semibold text-white mb-4">Informações</h3>
          <ul className="space-y-2 text-md md:text-lg">
            <li><Link href="/" className="hover:text-blue-400 transition-colors">Sobre Nós</Link></li>
            <li><Link href="/" className="hover:text-blue-400 transition-colors">Política de Privacidade</Link></li>
            <li><Link href="/" className="hover:text-blue-400 transition-colors">Termos de Uso</Link></li>
            <li><Link href="/" className="hover:text-blue-400 transition-colors">Política de Envio</Link></li>
            <li><Link href="/" className="hover:text-blue-400 transition-colors">Política de Garantia</Link></li>
          </ul>
        </div>

       
        <div className="col-span-1 md:col-span-1 flex flex-col ">
          <h3 className="text-xl font-semibold text-white mb-4">Contato</h3>
          <ul className="space-y-2">
            <li className="flex items-center ">
              <Mail size={18} className="mr-2 text-gray-400" />
              <a href="mailto:apglu.26@gmail.com" className="hover:text-blue-400 underline transition-colors text-lg">apglu.26@gmail.com</a>
            </li>
            <li className="flex items-center ">
              <Phone size={18} className="mr-2 text-gray-400" />
              <a href="tel:+5579996021365" className="hover:text-blue-400 underline transition-colors text-lg">(79) 99602-1365</a>
            </li>
            <li className="flex items-center  text-lg ">
              <MapPin size={18} className="mr-2 text-gray-400" />
              <p>Aracaju, Sergipe</p>
            </li>
          </ul>

          
        </div>

        <div className='2xl:w-1/4 w-full'>
             <h3 className="text-xl font-semibold text-white mb-4">Inscreva-se no nosso email newsletter</h3>

             <div className='flex gap-4 flex-col 2xl:flex-row'>
                <input type="text" placeholder='Seu email' className='px-2 w-full font-semibold text-lg py-3 rounded-lg border-1 border-zinc-100' />
                <button className='p-2 cursor-pointer hover:bg-zinc-300 hover:transition-all hover:duration-300 bg-white text-gray-900 rounded-lg w-full font-bold text-xl'>Inscrever</button>
             </div>
          </div>
      </div>

      </div>

      
      <div className="border-t  border-gray-700 mt-10 pt-8 text-center text-gray-500 text-sm">
        <p className='text-xl'>&copy; {currentYear} NextBuy. Todos os direitos reservados.</p>
        <p className="mt-2 text-lg">Desenvolvido completamente por <a href="https://github.com/Andrelcs12" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors border-b-1">André Lucas</a></p>
      </div>
    </footer>
  );
}