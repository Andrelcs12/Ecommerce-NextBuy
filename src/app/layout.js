import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext"; // Importe o ToastProvider
import "./globals.css";

export const metadata = {
  title: 'Next buy',
  description: 'Tudo o que quiser na palma da sua mão.',
  openGraph: {
    images: [
      {
        url: '/image.png',
        width: 800,
        height: 600,
        alt: 'Next buy logo',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <AuthProvider>
          <CartProvider>
            <ToastProvider> {/* Adicione o ToastProvider aqui */}
              {children}
            </ToastProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}