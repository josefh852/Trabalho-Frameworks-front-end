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
  imagem2: string;
  estoque: number;
};

type PistaType = {
  id: number;
  nome: string;
  preco: string;
  descricao: string;
  imagem: string;
  imagem2: string;
  estoque: number;
};

function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const [pistas, setPistas] = useState<PistaType[]>([]);
  const [activeProdutoImage, setActiveProdutoImage] = useState<{ [key: number]: number }>({});
  const [activePistaImage, setActivePistaImage] = useState<{ [key: number]: number }>({});
  const [isHovered, setIsHovered] = useState<{ [key: number]: boolean }>({});
  const [searchText, setSearchText] = useState('');

  const handleProdutoImageChange = (produtoId: number, index: number) => {
    setActiveProdutoImage((prevState) => ({
      ...prevState,
      [produtoId]: index,
    }));
  };

  const handlePistaImageChange = (pistaId: number, index: number) => {
    setActivePistaImage((prevState) => ({
      ...prevState,
      [pistaId]: index,
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
      .then((dados) => setProdutos(dados))
      .catch((erro) => console.error('Erro ao carregar produtos:', erro));
  }, []);

  useEffect(() => {
    fetch('https://trabalho-frameworks.onrender.com/pistas')
      .then((resposta) => resposta.json())
      .then((dados) => setPistas(dados))
      .catch((erro) => console.error('Erro ao carregar pistas:', erro));
  }, []);
  
  const filteredProdutos = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredPistas = pistas.filter((pista) =>
    pista.nome.toLowerCase().includes(searchText.toLowerCase())
  );
  const handleDeleteProduto = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;
  
    try {
      const resposta = await fetch(`https://trabalho-frameworks.onrender.com/produtos/${id}`, {
        method: "DELETE",
      });
  
      if (resposta.ok) {
        alert("Produto excluído com sucesso!");
        setProdutos(produtos.filter((produto) => produto.id !== id)); // Atualiza a lista removendo o item deletado
      } else {
        alert("Erro ao excluir produto.");
      }
    } catch (erro) {
      console.error("Erro ao excluir produto:", erro);
    }
  };

  return (
    <>
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
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="botao-pesquisa">🔍</button>
            </div>
            <li>
              <Link to="/cadastro-pista">Pistas</Link>
            </li>
            <li>
              <a href="#conjuntos_e_expansoes_de_pistas">Conjunto e Expansões</a>
            </li>
            <li>
              <Link to="/cadastro-produto">Cadastrar</Link>
            </li>
          </ul>
        </nav>

      </header>

      <div className="produtos-container">
        <h1 className="titulo-produto">Carrinhos</h1>
        <div className="produtos-list">
          {filteredProdutos.map((produto) => (
            <div
              key={produto.id}
              className="produto-item"
              onMouseEnter={() => handleMouseEnter(produto.id)}
              onMouseLeave={() => handleMouseLeave(produto.id)}
            >
              <h3 className="produto-nome">{produto.nome}</h3>
              <div className="container-imagem">
                <div className="image-container">
                  <img
                    src={produto.imagem}
                    alt="Imagem do produto"
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                  {activeProdutoImage[produto.id] === 1 && (
                    <img
                      src={produto.imagem2}
                      alt="Imagem secundária do produto"
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                      }}
                    />
                  )}
                  {isHovered[produto.id] && (
                    <>
                      <button
                        className="next-image-button"
                        onClick={() => handleProdutoImageChange(produto.id, 1)}
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
                      <button
                        className="previous-image-button"
                        onClick={() => handleProdutoImageChange(produto.id, 0)}
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
                    </>
                  )}
                </div>
              </div>
              <p className="produto-descricao">
                {produto.descricao} <br /> (Disponíveis: {produto.estoque} unidades)
              </p>
              <p className="produto-preco">{produto.preco}</p>
              <button className="botao-comprar" disabled={produto.estoque <= 0}>
                {produto.estoque > 0 ? 'Comprar' : 'Indisponível'}
              </button>
              <button onClick={() => handleDeleteProduto(produto.id)}>Excluir</button>
              <Link to={`/alterar-produto/${produto.id}`} className="botao-editar">Alterar</Link>
            </div>
          ))}
        </div>
      </div>

      <div className="produtos-container">
        <h1 className="titulo-produto">Pistas</h1>
        <div className="produtos-list">
          {filteredPistas.map((pista) => (
            <div
              key={pista.id}
              className="produto-item"
              onMouseEnter={() => handleMouseEnter(pista.id)}
              onMouseLeave={() => handleMouseLeave(pista.id)}
            >
              <h3 className="produto-nome">{pista.nome}</h3>
              <div className="container-imagem">
                <div className="image-container">
                  <img
                    src={pista.imagem}
                    alt="Imagem da pista"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                  {activePistaImage[pista.id] === 1 && (
                    <img
                      src={pista.imagem2}
                      alt="Imagem secundária da pista"
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                      }}
                    />
                  )}
                  {isHovered[pista.id] && (
                    <>
                      <button
                        className="next-image-button"
                        onClick={() => handlePistaImageChange(pista.id, 1)}
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
                      <button
                        className="previous-image-button"
                        onClick={() => handlePistaImageChange(pista.id, 0)}
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
                    </>
                  )}
                </div>
              </div>
              <p className="produto-descricao">
                {pista.descricao} <br /> (Disponíveis: {pista.estoque} unidades)
              </p>
              <p className="produto-preco">{pista.preco}</p>
              <button className="botao-comprar" disabled={pista.estoque <= 0}>
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