'use client';

import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react'; // Removed CheckCircle, XCircle as they're not needed
import Image from 'next/image';
import Header from "../components/Header";
import Footer from '../components/footer';

const ContactPage = () => {
  const handleOpenEmail = () => {
    const recipientEmail = 'apglu.26@gmail.com';
    const emailSubject = encodeURIComponent('NextBuy: Contato pelo site'); // Default subject
    const emailBody = encodeURIComponent(
      'Olá, gostaria de entrar em contato sobre...\n\n' +
      'Meu nome: \n' +
      'Meu e-mail: \n' +
      'Minha mensagem: \n'
    );

    const mailtoLink = `mailto:${recipientEmail}?subject=${emailSubject}&body=${emailBody}`;

    // Open the user's email client
    window.location.href = mailtoLink;
  };

  return (
    <div>
      <Header />
      <div className="w-full min-h-screen font-sans bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-5xl w-full bg-white rounded-xl shadow-2xl overflow-hidden md:flex md:min-h-[600px]">
          {/* Left Section: Contact Info */}
          <div className="md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex flex-col justify-between items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <Image src="/image.png" alt="Logo da NextBuy" width={96} height={96} className="mb-6 drop-shadow-lg" />
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                Estamos aqui para você!
              </h2>
              <p className="text-lg lg:text-xl opacity-90 mb-8 max-w-md">
                Seja para tirar dúvidas, dar sugestões ou resolver algum problema, sua voz é muito importante para nós.
              </p>
            </div>

            <div className="relative z-10 space-y-5 text-left w-full max-w-xs md:max-w-sm">
              <div className="flex items-center gap-4">
                <Mail size={28} className="text-blue-200" />
                <a href="mailto:apglu.26@gmail.com" className="hover:text-blue-400 transition-colors text-xl font-semibold">apglu.26@gmail.com</a>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={28} className="text-blue-200" />
                 <a href="tel:+5579996021365" className="hover:text-blue-400 transition-colors text-xl font-semibold">(79) 99602-1365</a>
              </div>
              <div className="flex items-start gap-4">
                <MapPin size={28} className="mt-1 text-blue-200 flex-shrink-0" />
                <p className="text-xl font-semibold">Rua das Flores, 123 - Centro, Aracaju - SE</p>
              </div>
            </div>
          </div>

          {/* Right Section: Contact Button */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8 text-center">
              Fale Conosco Diretamente!
            </h2>
            <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
              Clique no botão abaixo para abrir seu programa de e-mail e nos enviar uma mensagem.
              O endereço de e-mail e um assunto padrão já estarão preenchidos para sua comodidade.
            </p>
            <button
              onClick={handleOpenEmail}
              className="bg-blue-600 cursor-pointer text-white font-bold py-4 px-8 rounded-xl hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-3 text-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <Send size={24} />
              Abrir E-mail
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;