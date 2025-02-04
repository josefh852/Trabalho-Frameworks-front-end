import { FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';

function CadastroProduto() {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [imagem, setImagem] = useState("");
    const [imagem2, setImagem2] = useState("");
    const [estoque, setEstoque] = useState("");

    async function handleForm(event: FormEvent) {
        event.preventDefault();
        try {
            // Montando o objeto do produto
            const produto = {
                id,
                nome,
                descricao,
                preco,
                imagem,
                imagem2,
                estoque
            };

            const resposta = await fetch(`https://trabalho-frameworks.onrender.com/produtos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(produto)
            });

            if (resposta.ok) {
                alert("Produto cadastrado com sucesso!");
                navigate("/");
            } else {
                const mensagem = await resposta.text();
                alert("Erro ao cadastrar produto: " + mensagem);
            }
        } catch (e) {
            alert("Erro: Servidor não está respondendo.");
        }
    }

    return (
        <>
            <form onSubmit={handleForm}>
                <div>
                    <label htmlFor="id">Id</label>
                    <input placeholder="Id" type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="nome">Nome</label>
                    <input placeholder="Nome" type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="descricao">Descrição</label>
                    <input placeholder="Descrição" type="text" id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="preco">Preço</label>
                    <input placeholder="Preço" type="text" id="preco" value={preco} onChange={(e) => setPreco(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="imagem">URL Imagem</label>
                    <input placeholder="URL Imagem" type="text" id="imagem" value={imagem} onChange={(e) => setImagem(e.target.value)} />
                    {imagem && <img className="imagem-produto-reduzida" src={imagem} alt="Imagem do Produto" />}
                </div>
                <div>
                    <label htmlFor="imagem2">URL Imagem2</label>
                    <input placeholder="URL Imagem2" type="text" id="imagem2" value={imagem2} onChange={(e) => setImagem2(e.target.value)} />
                    {imagem2 && <img className="imagem2-produto-reduzida" src={imagem2} alt="Imagem do Produto2" />}
                </div>
                <div>
                    <label htmlFor="estoque">Estoque</label>
                    <input placeholder="Estoque" type="text" id="estoque" value={estoque} onChange={(e) => setEstoque(e.target.value)} />
                </div>
                <input type="submit" className="alterar-botao" value="Cadastrar" />
            </form>
        </>
    );
}

export default CadastroProduto;
