// app/layout.js
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
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
          {/* Correct placement: CartProvider wraps its children */}
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}