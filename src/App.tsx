import { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import logo from './assets/ok.png';

type ProdutoType = {
  id: number;
  nome: string;
  preco: string;
  descricao: string;
  imagem: string;
  imagemSecundaria: string;
  estoque: number;
};

type PistaType = {
  id: number;
  nome: string;
  preco: string;
  descricao: string;
  imagem: string;
  imagemSecundaria: string;
  estoque: number;
};

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const [pistas, setPistas] = useState<PistaType[]>([]);
  const [activeImage, setActiveImage] = useState<{ [key: number]: number }>({});
  const [isHovered, setIsHovered] = useState<{ [key: number]: boolean }>({});

  const handleLoginClick = () => {
    setShowLogin(!showLogin);
  };

  const handleLoginSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`Usuário: ${usuario} \nSenha: ${senha}`);
    setShowLogin(false);
  };

  const handleImageChange = (produtoId: number, index: number) => {
    setActiveImage((prevState) => ({
      ...prevState,
      [produtoId]: index, // Atualiza o índice da imagem ativa para esse produto
    }));
  };

  const handleMouseEnter = (produtoId: number) => {
    setIsHovered((prevState) => ({
      ...prevState,
      [produtoId]: true,
    }));
  };

  const handleMouseLeave = (produtoId: number) => {
    setIsHovered((prevState) => ({
      ...prevState,
      [produtoId]: false,
    }));
  };

  useEffect(() => {
    fetch('https://trabalho-frameworks.onrender.com/produtos')
      .then((resposta) => resposta.json())
      .then((dados) => setProdutos(dados));
  }, []);

  useEffect(() => {
    fetch('https://trabalho-frameworks.onrender.com/pistas')
      .then((resposta) => resposta.json())
      .then((dados) => setPistas(dados));
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
              <button type="submit" className="submit-button">
                Entrar
              </button>
            </form>
          </div>
        </div>
      )}

      <header className="site-header">
        <img src={logo} width={150} height={70} alt="Logo" />
        <nav className="navigation">
          <ul>
            <li>
              <a href="#veiculos">Veículos</a>
            </li>
            <li>
              <a href="#monster_trucks">Monster Trucks</a>
            </li>
            <div className="barra-pesquisa-container">
              <input
                type="text"
                className="campo-pesquisa"
                placeholder="Digite sua pesquisa aqui"
              />
              <button className="botao-pesquisa">🔍</button>
            </div>
            <li>
              <Link to="/cadastro-pista">Pistas</Link>
            </li>
            <li>
              <a href="#conjuntos_e_expansoes_de_pistas">Conjuntos e Expansões</a>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <button className="login-button" onClick={handleLoginClick}>
            Login
          </button>
        </div>
      </header>

      <div className="produtos-container">
        <h1 className="titulo-produto">Carrinhos</h1>
        <div className="produtos-list">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="produto-item"
              onMouseEnter={() => handleMouseEnter(produto.id)}
              onMouseLeave={() => handleMouseLeave(produto.id)}
            >
              <h3 className="produto-nome">{produto.nome}</h3>
              <div className="container-imagem">
                <div className="image-container">
                  {/* Exibindo a primeira imagem normalmente */}
                  <img
                    src={produto.imagem}
                    alt="Imagem do produto"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: activeImage[produto.id] === 0 ? 'block' : 'none',
                    }}
                  />
                  {/* Exibindo a imagem secundária com base no estado */}
                  {activeImage[produto.id] === 1 && (
                    <img
                      src={produto.imagemSecundaria}
                      alt="Imagem secundária do produto"
                      style={{
                        width: '100%',
                        height: 'auto',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                      }}
                    />
                  )}
                  {/* Botão de flecha para passar para a imagem secundária */}
                  {isHovered[produto.id] && (
                    <button
                      className="next-image-button"
                      onClick={() => handleImageChange(produto.id, 1)} // Passa para a imagem secundária
                      style={{
                        position: 'absolute',
                        top: '50%',
                        right: '10px',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <div className="arrow-button">➡️</div>
                    </button>
                  )}
                  {/* Botão de flecha para voltar à imagem inicial */}
                  {isHovered[produto.id] && (
                    <button
                      className="previous-image-button"
                      onClick={() => handleImageChange(produto.id, 0)} // Volta para a imagem inicial
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '10px',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <div className="arrow-button">⬅️</div>
                    </button>
                  )}
                </div>
              </div>
              <p className="produto-descricao"> {produto.descricao} <p></p> (Disponiveis: {produto.estoque} unidades)
              </p>
              <p className="produto-preco">{produto.preco}</p>
              <button
                className="botao-comprar"
                disabled={produto.estoque <= 0}
              >
                {produto.estoque > 0 ? 'Comprar' : 'Indisponível'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="produtos-container">
        <h1 className="titulo-produto">Pistas</h1>
        <div className="produtos-list">
          {pistas.map((pista) => (
            <div
              key={pista.id}
              className="produto-item"
              onMouseEnter={() => handleMouseEnter(pista.id)}
              onMouseLeave={() => handleMouseLeave(pista.id)}
            >
              <h3 className="produto-nome">{pista.nome}</h3>
              <div className="container-imagem">
                <div className="image-container">
                  {/* Exibindo a primeira imagem normalmente */}
                  <img
                    src={pista.imagem}
                    alt="Imagem da pista"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: activeImage[pista.id] === 0 ? 'block' : 'none',
                    }}
                  />
                  {/* Exibindo a imagem secundária com base no estado */}
                  {activeImage[pista.id] === 1 && (
                    <img
                      src={pista.imagemSecundaria}
                      alt="Imagem secundária da pista"
                      style={{
                        width: '100%',
                        height: 'auto',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                      }}
                    />
                  )}
                  {/* Botão de flecha para passar para a imagem secundária */}
                  {isHovered[pista.id] && (
                    <button
                      className="next-image-button"
                      onClick={() => handleImageChange(pista.id, 1)} // Passa para a imagem secundária
                      style={{
                        position: 'absolute',
                        top: '50%',
                        right: '10px',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <div className="arrow-button">➡️</div>
                    </button>
                  )}
                  {/* Botão de flecha para voltar à imagem inicial */}
                  {isHovered[pista.id] && (
                    <button
                      className="previous-image-button"
                      onClick={() => handleImageChange(pista.id, 0)} // Volta para a imagem inicial
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '10px',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <div className="arrow-button">⬅️</div>
                    </button>
                  )}
                </div>
              </div>
              <p className="produto-descricao"> {pista.descricao} <p></p> (Disponiveis: {pista.estoque} unidades)
              </p>
              <p className="produto-preco">{pista.preco}</p>
              <button
                className="botao-comprar"
                disabled={pista.estoque <= 0}
              >
                {pista.estoque > 0 ? 'Comprar' : 'Indisponível'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;