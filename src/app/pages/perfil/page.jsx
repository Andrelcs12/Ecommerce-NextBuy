"use client";

import Header from "../../components/Header";
import { ArrowLeft, User, MapPin, ShoppingCart, CreditCard } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";
import { useToast } from '../../context/ToastContext';

const ProfilePage = () => {
  const pathname = usePathname();
  const { user, updatePassword, updateProfile } = useAuth();
  const { showToast } = useToast();
  const [activeMenu, setActiveMenu] = useState("conta");

  const AccountDetails = () => {
    const [firstName, setFirstName] = useState(user?.nome || '');
    const [lastName, setLastName] = useState(user?.sobrenome || '');
    const [email, setEmail] = useState(user?.email || '');

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleUpdateProfile = (e) => {
  e.preventDefault();

  if (!user || !user.email) {
    showToast('Usuário não autenticado.', 'error');
    return;
  }

  const result = updateProfile(user.email, {
        nome: firstName,
        sobrenome: lastName,
        email: email,
      });

      if (result.success) {
        showToast(result.message, 'success');
      } else {
        showToast(result.message, 'error');
      }
    };


    const handleChangePassword = async (e) => {
      e.preventDefault();

      if (!user?.email) {
        showToast("Erro: Email do usuário não disponível para atualização de senha.");
        return;
      }

      if (newPassword !== confirmNewPassword) {
        showToast('A nova senha e a confirmação não coincidem.');
        return;
      }

      if (newPassword.length < 8) {
        showToast('A nova senha deve ter no mínimo 8 caracteres.');
        return;
      }

      const result = updatePassword(user.email, currentPassword, newPassword);

      if (result.success) {
        showToast(result.message);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        showToast(`Erro ao alterar senha: ${result.message}`);
      }
    };

    useEffect(() => {
      if (user) {
        setFirstName(user.nome || '');
        setLastName(user.sobrenome || '');
        setEmail(user.email || '');
      }
    }, [user]);



    return (
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Informações da Minha Conta</h2>
        <p className="text-base md:text-base text-gray-600 mb-6">
          Gerencie seus dados pessoais e de segurança.
        </p>

        <form onSubmit={handleUpdateProfile} className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-sm mb-6 md:mb-8 border border-gray-200">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">Detalhes do Perfil</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-base font-medium text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                placeholder="Seu nome"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-base font-medium text-gray-700 mb-1">Sobrenome</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                placeholder="Seu sobrenome"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
              placeholder="seu.email@example.com"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-6 px-4 py-2 text-base bg-blue-600 cursor-pointer text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-md"
          >
            Salvar Alterações
          </button>
        </form>

        <form onSubmit={handleChangePassword} className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 cursor-pointer">Alterar Senha</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-base font-medium text-gray-700 mb-1">Senha Atual</label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                placeholder="Sua senha atual"
                required
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-base font-medium text-gray-700 mb-1">Nova Senha</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                placeholder="Mínimo 8 caracteres"
                required
                minLength={8}
              />
            </div>
            <div>
              <label htmlFor="confirmNewPassword" className="block text-base font-medium text-gray-700 mb-1">Confirmar Nova Senha</label>
              <input
                type="password"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                placeholder="Confirme sua nova senha"
                required
                minLength={8}
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 px-4 py-2 text-base cursor-pointer bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-md"
          >
            Alterar Senha
          </button>
        </form>
      </div>
    );
  };

  const AddressDetails = () => {
    const [addresses, setAddresses] = useState([]);
    const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [complement, setComplement] = useState('');

    const handleAddAddress = (e) => {
      e.preventDefault();
      const newAddress = { street, number, neighborhood, city, state, zipCode, complement };
      setAddresses([...addresses, newAddress]);
      setStreet('');
      setNumber('');
      setNeighborhood('');
      setCity('');
      setZipCode('');
      setState('');
      setComplement('');
      setIsAddingNewAddress(false);
      showToast('Endereço adicionado com sucesso!');
    };

    return (
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Meus Endereços Cadastrados</h2>
        <p className="text-base md:text-base text-gray-600 mb-6">
          Visualize, edite ou adicione endereços para suas entregas.
        </p>

        {addresses.length === 0 && !isAddingNewAddress && (
          <p className="text-gray-500 mb-4 text-base">Nenhum endereço cadastrado.</p>
        )}

        <div className="space-y-4 mb-6">
          {addresses.map((addr, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <p className="font-semibold text-gray-800 text-base">{addr.street}, {addr.number}</p>
              <p className="text-base text-gray-600">{addr.neighborhood}, {addr.city} - {addr.state}</p>
              <p className="text-base text-gray-600">CEP: {addr.zipCode}</p>
              {addr.complement && <p className="text-base text-gray-600">Complemento: {addr.complement}</p>}
            </div>
          ))}
        </div>

        {!isAddingNewAddress ? (
          <button
            onClick={() => setIsAddingNewAddress(true)}
            className="px-4 py-2 text-base bg-green-600 text-white cursor-pointer rounded-md hover:bg-green-700 transition-colors duration-300"
          >
            Adicionar Novo Endereço
          </button>
        ) : (
          <form onSubmit={handleAddAddress} className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 mt-6">
            <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 cursor-pointer">Adicionar Novo Endereço</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="street" className="block text-base font-medium text-gray-700 mb-1">Rua</label>
                <input
                  type="text"
                  id="street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base"
                  required
                />
              </div>
              <div>
                <label htmlFor="number" className="block text-base font-medium text-gray-700 mb-1">Número</label>
                <input
                  type="text"
                  id="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base"
                  required
                />
              </div>
              <div>
                <label htmlFor="neighborhood" className="block text-base font-medium text-gray-700 mb-1">Bairro</label>
                <input
                  type="text"
                  id="neighborhood"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base"
                  required
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-base font-medium text-gray-700 mb-1">Cidade</label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base"
                  required
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-base font-medium text-gray-700 mb-1">Estado</label>
                <input
                  type="text"
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base"
                  required
                />
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-base font-medium text-gray-700 mb-1">CEP</label>
                <input
                  type="text"
                  id="zipCode"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="complement" className="block text-base font-medium text-gray-700 mb-1">Complemento (Opcional)</label>
              <input
                type="text"
                id="complement"
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsAddingNewAddress(false)}
                className="px-4 py-2 text-base bg-gray-300 text-gray-800 cursor-pointer font-medium rounded-md hover:bg-gray-400 transition-colors duration-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-base bg-blue-600 cursor-pointer text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-md"
              >
                Salvar Endereço
              </button>
            </div>
          </form>
        )}
      </div>
    );
  };

  const OrderHistory = () => (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Histórico de Pedidos</h2>
      <p className="text-base md:text-base text-gray-600 mb-6">
        Acompanhe seus pedidos recentes e visualize os detalhes completos.
      </p>
      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <p className="font-semibold text-gray-800 text-base">Pedido #20250703-001</p>
            <p className="text-base text-gray-600">Data: 03/07/2025</p>
            <p className="text-base text-green-600 font-medium">Status: Entregue</p>
          </div>
          <Link href="/pedidos/20250703-001" className="text-blue-600 hover:underline transition-colors duration-300 mt-2 sm:mt-0 text-base">Ver Detalhes</Link>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <p className="font-semibold text-gray-800 text-base">Pedido #20250620-005</p>
            <p className="text-base text-gray-600">Data: 20/06/2025</p>
            <p className="text-base text-yellow-600 font-medium">Status: Em Processamento</p>
          </div>
          <Link href="/pedidos/20250620-005" className="text-blue-600 hover:underline transition-colors duration-300 mt-2 sm:mt-0 text-base">Ver Detalhes</Link>
        </div>
      </div>
    </div>
  );

  const PaymentOptions = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [isAddingNewCard, setIsAddingNewCard] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleAddCard = (e) => {
      e.preventDefault();
      const newCard = { cardNumber, cardHolderName, expiryDate, cvv };
      setPaymentMethods([...paymentMethods, newCard]);
      setCardNumber('');
      setCardHolderName('');
      setExpiryDate('');
      setCvv('');
      setIsAddingNewCard(false);
      showToast('Cartão adicionado com sucesso!');
    };

    return (
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Minhas Opções de Pagamento</h2>
        <p className="text-base md:text-base text-gray-600 mb-6">
          Gerencie seus cartões salvos para um checkout mais rápido e seguro.
        </p>

        {paymentMethods.length === 0 && !isAddingNewCard && (
          <p className="text-gray-500 mb-4 text-base">Nenhum cartão adicionado.</p>
        )}

        <div className="space-y-4 mb-6">
          {paymentMethods.map((card, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <p className="font-semibold text-gray-800 text-base">Cartão Final: {card.cardNumber.slice(-4)}</p>
              <p className="text-base text-gray-600">Nome: {card.cardHolderName}</p>
              <p className="text-base text-gray-600">Validade: {card.expiryDate}</p>
            </div>
          ))}
        </div>

        {!isAddingNewCard ? (
          <button
            onClick={() => setIsAddingNewCard(true)}
            className="px-4 py-2 text-base bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700 transition-colors duration-300"
          >
            Adicionar Novo Cartão
          </button>
        ) : (
          <form onSubmit={handleAddCard} className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 mt-6">
            <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 cursor-pointer">Adicionar Novo Cartão</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cardNumber" className="block text-base font-medium text-gray-700 mb-1">Número do Cartão</label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base"
                  placeholder="xxxx xxxx xxxx xxxx"
                  maxLength="19"
                  required
                />
              </div>
              <div>
                <label htmlFor="cardHolderName" className="block text-base font-medium text-gray-700 mb-1">Nome no Cartão</label>
                <input
                  type="text"
                  id="cardHolderName"
                  value={cardHolderName}
                  onChange={(e) => setCardHolderName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base"
                  required
                />
              </div>
              <div>
                <label htmlFor="expiryDate" className="block text-base font-medium text-gray-700 mb-1">Data de Validade (MM/AA)</label>
                <input
                  type="text"
                  id="expiryDate"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base"
                  placeholder="MM/AA"
                  maxLength="5"
                  required
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-base font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base"
                  placeholder="XXX"
                  maxLength="4"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsAddingNewCard(false)}
                className="px-4 py-2 text-base bg-gray-300 cursor-pointer text-gray-800 font-medium rounded-md hover:bg-gray-400 transition-colors duration-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-base cursor-pointer bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-md"
              >
                Salvar Cartão
              </button>
            </div>
          </form>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'conta':
        return <AccountDetails />;
      case 'endereco':
        return <AddressDetails />;
      case 'comprar_novamente':
        return <OrderHistory />;
      case 'pagamento':
        return <PaymentOptions />;
      default:
        return <AccountDetails />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 p-2 border border-zinc-300 rounded-lg w-fit text-gray-700 hover:text-blue-600 transition-colors duration-300 mb-6 text-base">
          <ArrowLeft size={16} className="sm:size-4" />
          <span className="font-bold">Voltar para Home</span>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 md:p-6 md:mb-8 md:gap-6">
          <div className={`rounded-full h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 flex items-center justify-center font-bold text-4xl sm:text-5xl md:text-6xl bg-blue-600 text-white`}>
            {user?.nome ? user.nome.charAt(0) : <User size={36} className="md:size-48" />}
          </div>
          <div className="flex flex-col text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{user?.nome || 'Usuário'} {user?.sobrenome || ''}</h1>
            <p className="text-base sm:text-base text-gray-600">{user?.email || 'email@example.com'}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <aside className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-4 md:p-6">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveMenu('conta')}
                  className={`flex items-center cursor-pointer gap-3 px-3 py-2 text-base font-semibold rounded-r-lg w-full text-left
                    ${activeMenu === 'conta'
                      ? 'text-blue-700 bg-blue-50 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-l-4 hover:border-blue-300'
                    }`}
                >
                  <User size={18} className="md:size-4" />
                  Informações de Conta
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveMenu('endereco')}
                  className={`flex items-center cursor-pointer gap-3 px-3 py-2 text-base font-semibold rounded-r-lg w-full text-left
                    ${activeMenu === 'endereco'
                      ? 'text-blue-700 bg-blue-50 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-l-4 hover:border-blue-300'
                    }`}
                >
                  <MapPin size={18} className="md:size-4" />
                  Endereços de Entrega
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveMenu('comprar_novamente')}
                  className={`flex items-center cursor-pointer gap-3 px-3 py-2 text-base font-semibold rounded-r-lg w-full text-left
                    ${activeMenu === 'comprar_novamente'
                      ? 'text-blue-700 bg-blue-50 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-l-4 hover:border-blue-300'
                    }`}
                >
                  <ShoppingCart size={18} className="md:size-4" />
                  Meus Pedidos
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveMenu('pagamento')}
                  className={`flex items-center gap-3 cursor-pointer px-3 py-2 text-base font-semibold rounded-r-lg w-full text-left
                    ${activeMenu === 'pagamento'
                      ? 'text-blue-700 bg-blue-50 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-l-4 hover:border-blue-300'
                    }`}
                >
                  <CreditCard size={18} className="md:size-4" />
                  Opções de Pagamento
                </button>
              </li>
            </ul>
          </aside>

          <main className="w-full md:w-3/4 bg-white rounded-lg shadow-md p-4 md:p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;