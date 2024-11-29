import './globals.css';

export const metadata = {
  title: 'Doces da Gabi',
  description: 'Gerenciamento de usuários e login para Doces da Gabi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen bg-background text-text">
        <header className="bg-primary text-white font-bold text-xl p-4 flex justify-between items-center">
          <div>Doces da Gabi</div>
          <nav className="flex gap-4">
            <a
              href="/admin/cardapio"
              className="bg-secondary px-4 py-2 rounded hover:bg-secondary-dark transition"
            >
              Cardápios
            </a>
            <a
              href="/admin/pedidos"
              className="bg-secondary px-4 py-2 rounded hover:bg-secondary-dark transition"
            >
              Pedidos
            </a>
            <a
              href="/admin/produtos"
              className="bg-secondary px-4 py-2 rounded hover:bg-secondary-dark transition"
            >
              Produtos
            </a>
          </nav>
        </header>
        <main className="flex-grow flex items-center justify-center p-4">
          {children}
        </main>
        <footer className="bg-secondary text-white text-center p-4">
          &copy; 2024 Doces da Gabi - Todos os direitos reservados.
        </footer>
      </body>
    </html>
  );
}
