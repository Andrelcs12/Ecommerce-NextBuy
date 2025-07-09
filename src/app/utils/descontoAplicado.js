
export const valorConvertido = (price) => {
  const novoValor = parseFloat(price) * 6;
  return novoValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export const descontoAplicado = (preco, porcentagem) => {
    const valorConvertido = parseFloat(preco) || 0;
    const porcentagemDesconto = parseFloat(porcentagem) || 0;

    const descontoValido = Math.max(0, Math.min(100, porcentagemDesconto));

    const fatorDesconto = 1 - descontoValido / 100;
    const valorComDesconto = valorConvertido * fatorDesconto;

    const valorEmReais = valorComDesconto * 6; 

    return valorEmReais.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };