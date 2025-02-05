import { useParams, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";

function AlterarProduto() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Estados para armazenar os dados do produto
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [imagem, setImagem] = useState("");
    const [imagem2, setImagem2] = useState("");
    const [estoque, setEstoque] = useState("");

    // Buscar dados do produto ao carregar a página
    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const resposta = await fetch(`https://trabalho-frameworks.onrender.com/produtos/${id}`);
                if (!resposta.ok) {
                    throw new Error(`Erro ao buscar produto: ${resposta.statusText}`);
                }
                const dados = await resposta.json();

                // Atualiza os estados com os dados do produto
                setNome(dados.nome);
                setDescricao(dados.descricao);
                setPreco(dados.preco);
                setImagem(dados.imagem);
                setImagem2(dados.imagem2);
                setEstoque(dados.estoque);
            } catch (erro) {
                alert("Erro ao carregar os dados do produto.");
                console.error(erro);
            }
        };

        if (id) {
            fetchProduto();
        }
    }, [id]); // useEffect depende do 'id'

    // Função para manipular o envio do formulário
    async function handleForm(event: FormEvent) {
        event.preventDefault();
        try {
            const resposta = await fetch(`https://trabalho-frameworks.onrender.com/produtos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome,
                    descricao,
                    preco,
                    imagem,
                    imagem2,
                    estoque,
                }),
            });

            if (!resposta.ok) {
                const mensagem = await resposta.text();
                alert("Erro ao Alterar Produto - Error: " + mensagem);
            } else {
                alert("Produto Alterado com Sucesso");
                navigate("/");
            }
        } catch (e) {
            alert("Servidor não está respondendo.");
        }
    }

    // Funções para manipular mudanças nos campos de entrada
    function handleInputChange(setState: React.Dispatch<React.SetStateAction<string>>) {
        return (event: ChangeEvent<HTMLInputElement>) => setState(event.target.value);
    }

    return (
        <>
            <form onSubmit={handleForm}>
                <div>
                    <label htmlFor="id">Id</label>
                    <input type="text" id="id" value={id} readOnly />
                </div>
                <div>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" value={nome} onChange={handleInputChange(setNome)} />
                </div>
                <div>
                    <label htmlFor="descricao">Descrição</label>
                    <input type="text" id="descricao" value={descricao} onChange={handleInputChange(setDescricao)} />
                </div>
                <div>
                    <label htmlFor="preco">Preço</label>
                    <input type="text" id="preco" value={preco} onChange={handleInputChange(setPreco)} />
                </div>
                <div>
                    <label htmlFor="imagem">URL Imagem</label>
                    <input type="text" id="imagem" value={imagem} onChange={handleInputChange(setImagem)} />
                    {imagem && <img className="imagem-produto-reduzida" src={imagem} alt="Imagem do Produto" />}
                </div>
                <div>
                    <label htmlFor="imagem2">URL Imagem2</label>
                    <input type="text" id="imagem2" value={imagem2} onChange={handleInputChange(setImagem2)} />
                    {imagem2 && <img className="imagem2-produto-reduzida" src={imagem2} alt="Imagem do Produto" />}
                </div>
                <div>
                    <label htmlFor="estoque">Estoque</label>
                    <input type="text" id="estoque" value={estoque} onChange={handleInputChange(setEstoque)} />
                </div>
                <div>
                    <input type="submit" className="alterar-botao" value="Alterar" />
                </div>
            </form>
        </>
    );
}

export default AlterarProduto;


