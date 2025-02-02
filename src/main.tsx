import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import CadastroProduto from './componentes/cadastroproduto/CadastroProduto.tsx';
import CadastroPista from './componentes/cadastropista/CadastroPista.tsx';
import AlterarProduto from './componentes/alterarproduto/AlterarProduto.tsx';
import Header from './componentes/heder/Header.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/cadastro-produto',
    element: <CadastroProduto />,
  },
  {
    path: "/alterar-produto/:id",
    element: <><Header/><AlterarProduto/></>,
  },
  {
    path: '/cadastro-pista',
    element: <CadastroPista />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);