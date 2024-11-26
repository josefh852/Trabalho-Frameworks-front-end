import { useEffect, useState } from 'react'
import './App.css'
// Tipo para produtos
type ProdutoType = {
  id: number,
  nome: string,
  preco: string,
  descricao: string,
  imagem: string
}

function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([])

  // useEffect para carregar produtos e usuários
  useEffect(() => {
    // Buscar os produtos
    fetch("https://trabalho-frameworks.onrender.com/produtos")
      .then(resposta => resposta.json())
      .then(dados => setProdutos(dados))
  }, [])

  return (
    <>


<header className="site-header">
/
        <nav className="navigation">
          <ul>
            <li><a href="#login">Login</a></li>
            <li><a href="#veiculos">Veículos </a></li>
            <li><a href="#monster_trucks">Monster Trucks</a></li>
            <li><a href="#conjuntos_e_expanções_de_pistas">Conjuntos e Expanções de Pistas</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="login-button">Login</button>
        </div>
      </header>
      {/* Listagem de Produtos */}
      <div className="produtos-container">
        <h1 className='titulo-produto'>Produtos</h1>
        <div className="produtos-list">
          {
            produtos.map(produto => (
              <div key={produto.id} className="produto-item">
                <h3 className="produto-nome">{produto.nome}</h3> {/* Use h3 para o nome do produto */}
                <div className='container-imagem'>
                  <img src={produto.imagem} alt="Imagem do produto" />
                </div>
                <p className="produto-preco">{produto.preco}</p>
                <p className="produto-descricao">{produto.descricao}</p>
                <button className="botao-comprar">Comprar</button>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App