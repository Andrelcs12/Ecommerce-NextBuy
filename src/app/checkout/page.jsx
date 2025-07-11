
'use client';

import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/footer";
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { useRouter } from 'next/navigation';
import { CreditCard, Truck, Home, ShoppingCart } from 'lucide-react';
import { descontoAplicado } from '../utils/descontoAplicado';
import { useToast }  from "../context/ToastContext"

import Link from "next/link"
export default function CheckoutPage() {
  const { showToast }  = useToast();
  const { cartItems, getSubtotalPrice, clearCart, loadingCart } = useCart();
  const { user, saveUserOrder } = useAuth(); // Get saveUserOrder from AuthContext
  const router = useRouter();

  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [shippingCost, setShippingCost] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (!loadingCart && cartItems.length === 0 && !orderPlaced) {
      router.push('/carrinho');
    }
    if (cartItems.length > 0) {
      setShippingCost(15.00);
    } else {
      setShippingCost(0);
    }
  }, [cartItems, loadingCart, orderPlaced, router]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = () => {
    if (!user) {
      showToast("Você precisa estar logado para finalizar a compra.");
      router.push('/login');
      return;
    }
    if (cartItems.length === 0) {
      showToast("Seu carrinho está vazio. Adicione itens antes de finalizar a compra.");
      router.push('/');
      return;
    }

    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode) {
      showToast("Por favor, preencha todos os campos obrigatórios do endereço.");
      return;
    }

    const newOrder = {
      items: cartItems,
      shippingAddress,
      paymentMethod,
      subtotal: getSubtotalPrice(),
      shippingCost,
      total: getSubtotalPrice() + shippingCost,
      orderDate: new Date().toISOString(),
      status: 'Pendente',
      userId: user.email,
    };

    const orderSaved = saveUserOrder(newOrder); 

    if (orderSaved) {
      showToast("Pedido processado:", newOrder);
      clearCart(); 
      setOrderPlaced(true);
      router.push("/checkout/sucess")
    } else {
      showToast("Ocorreu um erro ao finalizar o pedido. Tente novamente.");
    }
  };

  const subtotal = getSubtotalPrice();
  const total = subtotal + shippingCost;

  if (loadingCart) {
    return <p className="text-center py-10 text-xl text-blue-600">Carregando informações do pedido...</p>;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 pt-28 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-extrabold text-green-700 mb-6">Pedido Realizado com Sucesso!</h1>
          <p className="text-xl text-gray-700 mb-8">Obrigado pela sua compra. Seu pedido foi processado e será enviado em breve.</p>
          <Link href="/myProducts" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300 shadow-lg">
            Ver Meus Pedidos
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto  py-8 pt-4">
        <h1 className="md:text-4xl text-2xl font-extrabold text-gray-900 mb-8  px-6 border-b-2 border-blue-200 pb-4">
          Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 bg-white rounded-lg shadow-md  p-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-3 flex items-center">
              <ShoppingCart size={24} className="mr-2 text-blue-600" /> Resumo do Pedido
            </h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center mb-4 pb-4 border-b border-gray-100 last:border-b-0">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  width={60}
                  height={60}
                  className="object-contain rounded-md mr-4 flex-shrink-0"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/60x60/E0E0E0/333333?text=No+Image`; }}
                />
                <div className="flex-grow">
                  <p className="md:text-lg text-md font-semibold text-gray-800">{item.title}</p>
                  <p className="md:text-lg text-sm text-gray-600">Quantidade: {item.quantity}</p>
                </div>
                <span className="font-bold text-blue-700 md:text-xl ">
                  {descontoAplicado(item.price, item.discountPercentage)}
                </span>
              </div>
            ))}
            <div className="mt-6 pt-4 border-t-2 border-blue-200">
              <div className="flex justify-between items-center text-md md:text-xl font-medium text-gray-700 mb-2">
                <span>Subtotal:</span>
                <span>{(subtotal * 6).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
              </div>
              <div className="flex justify-between items-center text-md md:text-xl font-medium text-gray-700 mb-2">
                <span>Frete:</span>
                <span>{(shippingCost * 6).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
              </div>
              <div className="flex justify-between items-center text-lg md:text-2xl font-bold text-gray-900 mt-4">
                <span>Total:</span>
                <span>{(total * 6).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 flex flex-col gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-3 flex items-center">
                <Home size={24} className="mr-2 text-blue-600" /> Endereço de Entrega
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Rua</label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={shippingAddress.street}
                    onChange={handleAddressChange}
                    className="w-full md:p-3 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                  <input
                    type="number"
                    id="number"
                    name="number"
                    value={shippingAddress.number}
                    onChange={handleAddressChange}
                    className="w-full md:p-3 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="complement" className="block text-sm font-medium text-gray-700 mb-1">Complemento</label>
                  <input
                    type="text"
                    id="complement"
                    name="complement"
                    value={shippingAddress.complement}
                    onChange={handleAddressChange}
                    className="w-full md:p-3 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                  <input
                    type="text"
                    id="neighborhood"
                    name="neighborhood"
                    value={shippingAddress.neighborhood}
                    onChange={handleAddressChange}
                    className="w-full md:p-3 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleAddressChange}
                    className="w-full md:p-3 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleAddressChange}
                    className="w-full md:p-3 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={shippingAddress.zipCode}
                    onChange={handleAddressChange}
                    className="w-full md:p-3 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-3 flex items-center">
                <CreditCard size={24} className="mr-2 text-blue-600" /> Método de Pagamento
              </h2>
              <div className="space-y-4">
                <label className="flex items-center md:p-3 p-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={paymentMethod === 'credit_card'}
                    onChange={handlePaymentChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-3 text-lg text-gray-800">Cartão de Crédito</span>
                </label>
                <label className="flex items-center  md:p-3 p-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="boleto"
                    checked={paymentMethod === 'boleto'}
                    onChange={handlePaymentChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-3 text-lg text-gray-800">Boleto Bancário</span>
                </label>
                <label className="flex items-center  md:p-3 p-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="pix"
                    checked={paymentMethod === 'pix'}
                    onChange={handlePaymentChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-3 text-lg text-gray-800">PIX</span>
                </label>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className=" bg-green-600 cursor-pointer mx-8 md:mx-0
               text-white py-4 rounded-lg font-bold md:text-xl text-md gap-2
                hover:bg-green-700 transition duration-300 shadow-lg flex items-center justify-center"
            >
              <Truck size={24}/>
              Finalizar Pedido
            </button>
          </div>
        </div>
      </main>
      
    </div>
  );
}