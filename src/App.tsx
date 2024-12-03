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

type PistaType = {
  id: number,
  nome: string,
  preco: string,
  descricao: string,
  imagem: string
}

function App() {
  
  const [produtos, setProdutos] = useState<ProdutoType[]>([])
  useEffect(() => {

    fetch("https://trabalho-frameworks.onrender.com/produtos")
      .then(resposta => resposta.json())
      .then(dados => setProdutos(dados))
  }, [])

  const [pistas, setPistas] = useState<PistaType[]>([])
  useEffect(() => {

    fetch("https://trabalho-frameworks.onrender.com/pistas")
      .then(resposta => resposta.json())
      .then(dados => setPistas(dados))
  }, [])


 
  return (
    <>
      <header className="site-header">
        <img src="ok.png" width={150} height={70}></img>
        <nav className="navigation">
          <ul>
            <li><a href="#login">Login</a></li>
            <li><a href="#veiculos">Veículos </a></li>
            <li><a href="#monster_trucks">Monster Trucks</a></li>
            <li><a href="#conjuntos_e_expanções_de_pistas">Conjuntos e Expansões de Pistas</a></li>
          </ul>
        </nav>
        <div className="header-actions">
          <button className="login-button">Login</button>
        </div>
      </header>

      {/* Listagem de Produtos */}
      <div className="produtos-container">
        <h1 className="titulo-produto">Carrinhos</h1>
        <div className="produtos-list">
          {produtos.map(produto => (
            <div key={produto.id} className="produto-item">
              <h3 className="produto-nome">{produto.nome}</h3>
              <div className="container-imagem">
                <img src={produto.imagem} alt="Imagem do produto" />
              </div>
              <p className="produto-preco">{produto.preco}</p>
              <p className="produto-descricao">{produto.descricao}</p>
              <button className="botao-comprar">Comprar</button>
            </div>
          ))}
        </div>
      </div>

      <div className="produtos-container">
  <h1 className="titulo-produto">Pistas</h1>
  <div className="produtos-list">
    {pistas.map((pista) => (
      <div key={pista.id} className="produto-item">
        <h3 className="produto-nome">{pista.nome}</h3>
        <div className="container-imagem">
          <img src={pista.imagem} alt="Imagem da pista" />
        </div>
        <p className="produto-preco">{pista.preco}</p>
        <p className="produto-descricao">{pista.descricao}</p>
        <button className="botao-comprar">Comprar</button>
      </div>
    ))}
  </div>
</div>

    </>
  )
}


export default App


