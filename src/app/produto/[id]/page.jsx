
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Header from "../../components/Header";
import { ShoppingCart, Star, Minus, Plus, ShieldCheck, RefreshCcw, Truck } from 'lucide-react';
import { descontoAplicado } from "../../utils/descontoAplicado"
import Footer from "../../components/footer"
import Link from "next/link"
import { useCart } from '../../context/CartContext'; 
import { useRouter} from "next/navigation"
import {useToast } from "../../context/ToastContext"
export default function ProdutoPage() {
  const router = useRouter();
  const { showToast} = useToast();

  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [recomenda, setRecomenda] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentLightboxImage, setCurrentLightboxImage] = useState('');
  const [quantidade, setQuantidade] = useState(1);

  const { addItemToCart } = useCart(); 

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantidade(prev => prev + 1);
    } else if (type === 'decrement' && quantidade > 1) {
      setQuantidade(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (produto) {
      addItemToCart(produto, quantidade);
      showToast(`${quantidade}x ${produto.title} adicionado(s) ao carrinho!`);
    }
  };

  const handleBuy = () => {
    if (produto) {
      addItemToCart(produto, quantidade);
      router.push("/carrinho")
      showToast(`${quantidade}x ${produto.title} adicionado(s) ao carrinho!`);

    }
  }

  useEffect(() => {
    const fetchProdutoAndRecommendations = async () => {
      setLoading(true);
      setErro(null);
      try {
        const productResponse = await fetch(`https://dummyjson.com/products/${id}`);
        if (!productResponse.ok) {
          throw new Error('Erro ao buscar produto.');
        }
        const productData = await productResponse.json();
        setProduto(productData);
        setMainImage(productData.thumbnail);

        if (productData.category) {
          const recommendationsResponse = await fetch(`https://dummyjson.com/products/category/${productData.category}?limit=5`); 
          if (!recommendationsResponse.ok) {
            console.warn('Erro ao buscar recomendações para a categoria:', productData.category);
            setRecomenda([]);
          } else {
            const recommendationsData = await recommendationsResponse.json();
            const filteredRecommendations = recommendationsData.products.filter(
              (item) => item.id !== productData.id
            );
            setRecomenda(filteredRecommendations.slice(0, 4)); 
          }
        }
      } catch (err) {
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProdutoAndRecommendations();
    }
  }, [id]);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setLightboxOpen(false);
      }
    };

    if (lightboxOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      document.removeEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [lightboxOpen]);

  if (loading) return <p className="text-center py-10 text-xl text-blue-600">Carregando produto...</p>;
  if (erro) return <p className="text-center text-red-600 py-10 text-xl">{erro}</p>;
  if (!produto) return null;

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className='fixed top-0 left-0 w-full z-50 '>
        <Header />
      </div>

      <div className="p-4 sm:p-8 lg:px-12 lg:pt-40">
        <div className="rounded-xl overflow-hidden flex flex-col lg:flex-row gap-8 lg:gap-10 p-2 mt-16 md:p-8">
          <div className="flex flex-col-reverse lg:flex-row gap-4 w-full lg:w-4/5 items-center lg:items-start">
            <div className="flex flex-row lg:flex-col gap-3 sm:gap-4 justify-center flex-wrap lg:flex-nowrap">
              {produto.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 ${mainImage === image ? 'border-2 border-blue-600' : ''}`}
                  onClick={() => {
                    setMainImage(image);
                  }}
                >
                  <img
                    src={image}
                    alt={`${produto.title} - Imagem ${index + 1}`}
                    width={150}
                    height={150}
                    className="object-contain sm:p-2 w-full h-full"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x100/E0E0E0/333333?text=No+Image`; }}
                  />
                </div>
              ))}
            </div>

            <div className="relative w-full max-w-md lg:max-w-none lg:flex-grow bg-gray-100 rounded-lg shadow-md overflow-hidden">
              <img
                src={mainImage}
                alt={produto.title}
                width={500}
                height={500}
                className="object-contain w-full h-auto max-h-[200px] md:max-h-[500px] cursor-pointer"
                onClick={() => {
                  setLightboxOpen(true);
                  setCurrentLightboxImage(mainImage);
                }}
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/500x500/E0E0E0/333333?text=No+Image`; }}
              />
            </div>
          </div>

          <div className="flex flex-col justify-between pt-4 w-full lg:w-3/5">
            <div>
              <p className="text-blue-600 text-sm font-semibold uppercase mb-2">{produto.category}</p>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">{produto.title}</h1>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-b border-blue-200 pb-2">Descrição</h2>
              </div>
              <p className="text-gray-700 text-md sm:text-lg mb-6 leading-relaxed">{produto.description}</p>

              
              <p className="text-gray-600 text-sm md:mt-4 mt-0">ID de Verificação: <span className="font-medium text-gray-800">{produto.meta.barcode}</span></p>
            </div>

            <div className="mt-4">
              <div className="flex flex-col items-baseline gap-1 md:gap-4 mb-4">
                {produto.discountPercentage > 0 && (
                  <span className="text-gray-500 line-through text-md sm:text-5xl">
                    {(produto.price * 6).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </span>
                )}
                <span className="text-blue-700 text-lg sm:text-3xl font-bold">
                  {descontoAplicado(produto.price, produto.discountPercentage)}
                </span>
                {produto.discountPercentage > 0 && (
                  <span className="text-green-600 font-semibold md:text-lg text-md">
                    ({produto.discountPercentage}% OFF)
                  </span>
                )}
              </div>

              <div className='flex flex-col sm:flex-row gap-4'>
                <button onClick={handleBuy} className="flex-1 bg-black text-white hover:bg-zinc-700 cursor-pointer py-3 sm:py-4 px-6 rounded-lg font-bold text-sm sm:text-lg transition duration-300 shadow-lg">
                  Comprar
                </button>
                <button
                  onClick={handleAddToCart} 
                  className="flex-1 bg-blue-700 hover:bg-blue-500 cursor-pointer text-white py-3 sm:py-4 px-6 rounded-lg font-bold text-sm sm:text-lg transition duration-300 shadow-lg flex items-center justify-center"
                >
                  <ShoppingCart className="inline-block mr-2 sm:mr-3" size={20} />
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mb-12">
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">Detalhes do Produto</h2>
              <ul className="text-md sm:text-lg space-y-2 text-gray-700">
                <li><span className="font-semibold text-gray-800">Marca:</span> {produto.brand}</li>
                <li><span className="font-semibold text-gray-800">Modelo:</span> {produto.title}</li>
                <li><span className="font-semibold text-gray-800">Disponibilidade:</span> {produto.stock > 0 ? <span className="text-green-600 font-bold">Em Estoque</span> : <span className="text-red-600 font-bold">Indisponível</span>}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">Dimensões</h2>
              <ul className="text-md sm:text-lg space-y-2 text-gray-700">
                <li><span className="font-semibold text-gray-800">Comprimento:</span> {produto.dimensions.width} cm</li>
                <li><span className="font-semibold text-gray-800">Largura:</span> {produto.dimensions.depth} cm</li>
                <li><span className="font-semibold text-gray-800">Altura:</span> {produto.dimensions.height} cm</li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">Avaliações dos Clientes</h2>
            <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
              <div className="mr-6 mb-6 md:mb-0 text-center md:text-left flex flex-col items-center">
                <p className="text-4xl sm:text-8xl font-extrabold text-blue-700 leading-none flex items-baseline justify-center md:justify-start">
                  {produto.rating}
                  <span className="text-2xl sm:text-3xl font-semibold text-gray-600 ml-2">/ 5</span>
                </p>
              </div>
              <div className="flex-1 flex-col w-full">
                <h3 className="md:text-xl text-lg font-bold text-gray-800 mb-4 text-center md:text-left">Comentários ({produto.reviews.length})</h3>
                {produto.reviews && produto.reviews.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {produto.reviews.map((review, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50">
                        <div className="flex items-center mb-2">
                          <span className="text-yellow-500 text-md md:text-lg">{"★".repeat(review.rating)}</span>
                          <span className="ml-3 text-sm md:text-md text-gray-500">{new Date(review.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <h4 className="font-semibold text-gray-800 text-md md:text-lg mb-1">{review.reviewerName}</h4>
                        <p className="text-gray-600 text-sm mb-2">{review.reviewerEmail}</p>
                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic text-center md:text-left">Nenhuma avaliação disponível ainda. Seja o primeiro a avaliar!</p>
                )}

                
              </div>
            </div>
          </div>

          <div className="mt-14">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2 text-center">Você também pode gostar</h2>
            {recomenda.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recomenda.map((recProduto) => (
                  <Link href={`/produto/${recProduto.id}`} key={recProduto.id} className="block">
                    <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform">
                      <img
                        src={recProduto.thumbnail}
                        alt={recProduto.title}
                        className=" w-36 md:w-80 object-contain mb-4 rounded-md"
                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/150x150/D1E9FF/1C3AA9?text=Sem+Imagem`; }}
                      />
                      <h3 className="md:text-lg text-md font-semibold text-gray-900 mb-1">{recProduto.title}</h3>
                      <p className="text-blue-700 font-bold text-xl">
                        {descontoAplicado(recProduto.price, recProduto.discountPercentage)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic text-center">Nenhuma recomendação disponível no momento.</p>
            )}
          </div>

          <div className="mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">Garantias e Políticas</h2>
            <div className="flex flex-wrap justify-center md:justify-between gap-8 lg:gap-12">
              <div className="bg-blue-50 flex-1 min-w-[100px] md:min-w-[280px] p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                <ShieldCheck size={100} className="text-blue-700 mb-4" />
                <h3 className="md:text-2xl text-md  font-semibold text-gray-800 mb-2">Garantia</h3>
                {produto.warrantyInformation ? (
                  <p className="text-gray-700 text-md md:text-lg">{produto.warrantyInformation}</p>
                ) : (
                  <p className="text-gray-500 italic">Informação de garantia não disponível.</p>
                )}
              </div>

              <div className="bg-blue-50 flex-1 min-w-[100px] md:min-w-[280px] p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                <RefreshCcw size={100} className="text-blue-700 mb-4" />
                <h3 className="md:text-2xl text-md  font-semibold text-gray-800 mb-2">Política de Devolução</h3>
                {produto.returnPolicy ? (
                  <p className="text-gray-700 text-md md:text-lg">{produto.returnPolicy}</p>
                ) : (
                  <p className="text-gray-500 italic">Política de devolução não disponível.</p>
                )}
              </div>

              <div className="bg-blue-50 flex-1 w-[140px] md:min-w-[280px] p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                <Truck size={100} className="text-blue-700 mb-4 text-md" />
                <h3 className="md:text-2xl text-md  font-semibold text-gray-800 mb-2">Informações de Envio</h3>
                {produto.shippingInformation ? (
                  <p className="text-gray-700 text-md md:text-lg">{produto.shippingInformation}</p>
                ) : (
                  <p className="text-gray-500 italic">Informação de envio não disponível.</p>
                )}
              </div>
            </div>

            {produto.meta.qrCode && (
              <div className="mt-6 text-center">
                <p className="text-gray-600 md:text-2xl text-md mb-2">Escaneie para mais informações:</p>
                <img
                  src={produto.meta.qrCode}
                  alt="QR Code"
                  width={150}
                  height={150}
                  className="mx-auto rounded-lg shadow-md w-32 md:w-40"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-full bg-white rounded-lg shadow-2xl overflow-hidden p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-800 text-3xl font-bold p-2 leading-none hover:text-gray-600 transition-colors duration-200"
              onClick={() => setLightboxOpen(false)}
            >
              &times;
            </button>
            <img
              src={currentLightboxImage}
              alt="Imagem em destaque"
              style={{ objectFit: 'contain' }}
              className="max-h-[80vh] w-auto mx-auto"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}