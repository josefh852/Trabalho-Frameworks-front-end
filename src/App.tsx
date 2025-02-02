import { useState, useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import logo from "./assets/ok.png";

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
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const [pistas, setPistas] = useState<PistaType[]>([]);
<<<<<<< HEAD
  const [searchText, setSearchText] = useState("");
=======
  const [activeProdutoImage, setActiveProdutoImage] = useState<{ [key: number]: number }>({});
  const [activePistaImage, setActivePistaImage] = useState<{ [key: number]: number }>({});
  const [isHovered, setIsHovered] = useState<{ [key: number]: boolean }>({});
  const [searchText, setSearchText] = useState('');
  const [showSenha, setShowSenha] = useState(false); // Adiciona o estado para mostrar/esconder a senha

  const handleLoginClick = () => {
    setShowLogin(!showLogin);
  };

  const handleLoginSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // A alteração aqui foi apenas na mensagem do login
    if (usuario && senha) {
      alert(`Login realizado com sucesso! Bem-vindo, ${usuario}`);
    } else {
      alert("Por favor, preencha os campos de usuário e senha.");
    }
    setShowLogin(false);
  };

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
>>>>>>> c5afc0fe652ae3da1c9da8c2560d55b8fa93b1a1

  useEffect(() => {
    fetch("https://trabalho-frameworks.onrender.com/produtos")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((error) => console.error("Erro ao carregar produtos:", error));

    fetch("https://trabalho-frameworks.onrender.com/pistas")
      .then((res) => res.json())
      .then((data) => setPistas(data))
      .catch((error) => console.error("Erro ao carregar pistas:", error));
  }, []);

  // Função para editar produto
  const handleEditProduto = async (id: number) => {
    const novoNome = prompt("Novo nome do produto:");
    const novaDescricao = prompt("Nova descrição:");
    const novoPreco = prompt("Novo preço:");
    const novaImagem = prompt("Nova URL da imagem:");

    if (!novoNome || !novaDescricao || !novoPreco || !novaImagem) return;

    try {
      const resposta = await fetch(`https://trabalho-frameworks.onrender.com/produtos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: novoNome,
          descricao: novaDescricao,
          preco: novoPreco,
          imagem: novaImagem,
        }),
      });

      if (resposta.ok) {
        alert("Produto atualizado com sucesso!");
        setProdutos(
          produtos.map((produto) =>
            produto.id === id
              ? { ...produto, nome: novoNome, descricao: novaDescricao, preco: novoPreco, imagem: novaImagem }
              : produto
          )
        );
      } else {
        alert("Erro ao atualizar produto.");
      }
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  // Função para deletar produto
  const handleDeleteProduto = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;

    try {
      const resposta = await fetch(`https://trabalho-frameworks.onrender.com/produtos/${id}`, {
        method: "DELETE",
      });

      if (resposta.ok) {
        alert("Produto excluído com sucesso!");
        setProdutos(produtos.filter((produto) => produto.id !== id));
      } else {
        alert("Erro ao excluir produto.");
      }
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  const filteredProdutos = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
<<<<<<< HEAD
=======
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
                <div className="senha-container">
                  <input
                    type={showSenha ? 'text' : 'password'} // Controla a visibilidade da senha
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="eye-button"
                    onClick={() => setShowSenha(!showSenha)} // Alterna a visibilidade da senha
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                  >
                    {showSenha ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              <button type="submit" className="submit-button">
                Entrar
              </button>
            </form>
          </div>
        </div>
      )}

>>>>>>> c5afc0fe652ae3da1c9da8c2560d55b8fa93b1a1
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
              <a href="#conjuntos_e_expansoes_de_pistas">Conjuntos e Expansões</a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="produtos-container">
        <h1 className="titulo-produto">Carrinhos</h1>
        <div className="produtos-list">
          {filteredProdutos.map((produto) => (
            <div key={produto.id} className="produto-item">
              <h3 className="produto-nome">{produto.nome}</h3>
              <div className="container-imagem">
                <img src={produto.imagem} alt="Imagem do produto" style={{ width: "100%", height: "auto" }} />
              </div>
              <p className="produto-descricao">{produto.descricao}</p>
              <p className="produto-preco">{produto.preco}</p>
              <button className="botao-comprar" disabled={produto.estoque <= 0}>
                {produto.estoque > 0 ? "Comprar" : "Indisponível"}
              </button>
              <button onClick={() => handleEditProduto(produto.id)} className="botao-editar">
                ✏️ Editar
              </button>
              <button onClick={() => handleDeleteProduto(produto.id)} className="botao-deletar">
                🗑️ Excluir
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
<<<<<<< HEAD
=======
 /**/ 
>>>>>>> c5afc0fe652ae3da1c9da8c2560d55b8fa93b1a1
