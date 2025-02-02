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

function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch("https://trabalho-frameworks.onrender.com/produtos")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((error) => console.error("Erro ao carregar produtos:", error));
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