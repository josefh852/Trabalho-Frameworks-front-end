import { useEffect, useState } from 'react'
import './App.css'
import  {Link}  from "react-router-dom";
import logo from './assets/ok.png'

type ProdutoType = {
  id: number,
  nome: string,
  preco: string,
  descricao: string,
  imagens: string[],
  estoque: number,
}

type PistaType = {
  id: number,
  nome: string,
  preco: string,
  descricao: string,
  imagens: string[],
  estoque: number,
}

function App() {
  
  const [showLogin, setShowLogin] = useState(false); // Controla a exibição do login
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLoginClick = () => {
    setShowLogin(!showLogin); // Alterna entre mostrar e esconder o formulário de login
  };

  const handleLoginSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`Usuário: ${usuario} \nSenha: ${senha}`); // Apenas um exemplo simples de como capturar as informações
    setShowLogin(false); // Fecha o login após submissão
  };

  const [produtos, setProdutos] = useState<ProdutoType[]>([])
  useEffect(() => {
    fetch("https://trabalho-frameworks.onrender.com/produtos")
      .then(resposta => resposta.json())
      .then(dados => setProdutos(dados))
  }, []);

  const [pistas, setPistas] = useState<PistaType[]>([])
  useEffect(() => {
    fetch("https://trabalho-frameworks.onrender.com/pistas")
      .then(resposta => resposta.json())
      .then(dados => setPistas(dados))
  }, []);

  return (
    <>
      {showLogin && (
  <div className="login-form-container">
    <div className="login-form-content">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <div className="form-group">
          <label htmlFor="usuario">Usuário</label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Entrar</button>
      </form>
    </div>
  </div>
)}

<header className="site-header">
  <img src={logo} width={150} height={70} alt="Logo" />
  <nav className="navigation">
    <ul>
      <li><a href="#veiculos">Veículos</a></li>
      <li><a href="#monster_trucks">Monster Trucks</a></li>
      <div className="barra-pesquisa-container">
    <input type="text" className="campo-pesquisa" placeholder="Digite sua pesquisa aqui" />
    <button className="botao-pesquisa">🔍</button></div>
      <li><Link to="/cadastro-pista">pistas</Link></li>
      <li><a href="#conjuntos_e_expansoes_de_pistas">Conjuntos e Expansões</a></li>
    </ul>
  </nav>
  <div className="header-actions">
    <button className="login-button" onClick={handleLoginClick}>Login</button>
  </div>
</header>

      <div className="produtos-container">
        <h1 className="titulo-produto">Carrinhos</h1>
        <div className="produtos-list">
          {produtos.map(produto => (
            <div key={produto.id} className="produto-item">
              <h3 className="produto-nome">{produto.nome}</h3>
              <div className="container-imagem">
                <img src={produto.imagens} alt="Imagem do produto" />
              </div>
              <p className="produto-descricao">{produto.descricao} <p></p> (Disponiveis: {produto.estoque} unidades)</p>
              <p className="produto-preco">{produto.preco}</p>
      <button
        className="botao-comprar"
        disabled={produto.estoque <= 0} // Desativa o botão se o estoque for zero
      >
        {produto.estoque > 0 ? "Comprar" : "Indisponível"} {/* Texto dinâmico */}
      </button>
    </div>
          ))}
        </div>
      </div>

      <div className="produtos-container">
        <h1 className="titulo-produto">Pistas</h1>
        <div className="produtos-list">
          {pistas.map(pista => (
            <div key={pista.id} className="produto-item">
              <h3 className="produto-nome">{pista.nome}</h3>
              <div className="container-imagem">
                <img src={pista.imagens} alt="Imagem do produto" />
              </div>
              <p className="produto-descricao">{pista.descricao} <p></p> (Disponiveis: {pista.estoque} unidades)</p>
              <p className="produto-preco">{pista.preco}</p>
      <button
        className="botao-comprar"
        disabled={pista.estoque <= 0} // Desativa o botão se o estoque for zero
      >
        {pista.estoque > 0 ? "Comprar" : "Indisponível"}
      </button>
    </div>
    ))}
  </div>
</div>

    </>
  )
}

export default App