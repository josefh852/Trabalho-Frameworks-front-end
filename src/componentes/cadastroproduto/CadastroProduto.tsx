import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';

function CadastroProduto(){
    const navigate = useNavigate()
    const [id,setId] = useState("")
    const [nome,setNome] = useState("")
    const [descricao,setDescricao] = useState("")
    const [preco,setPreco] = useState("")
    const [imagem,setImagem] = useState("")
    const [imagem2,setImagem2] = useState("")
    const [estoque,setEstoque] = useState("")
    async function handleForm(event:FormEvent){
        event.preventDefault()
        try{
            const resposta = await fetch(`https://trabalho-frameworks.onrender.com/produtos`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    id:id,
                    nome:nome,
                    descricao:descricao,
                    preco:preco,
                    imagem:imagem,
                    imagem2:imagem2,
                    estoque:estoque
                })
            })
            if(resposta.status!=500){
                alert("Produto Cadastro com Sucesso")
                navigate("/")
            }
            else{
                const mensagem = await resposta.text()
                alert("Erro ao Cadastrar Produto - Error: "+mensagem)
            }
        }
        catch(e){
            alert("Servidor não está respondendo.")
        }
        
    }
    function handleId(event:ChangeEvent<HTMLInputElement>){
        setId(event.target.value)
    }
    function handleNome(event:ChangeEvent<HTMLInputElement>){
        setNome(event.target.value)
    }
    function handleDescricao(event:ChangeEvent<HTMLInputElement>){
        setDescricao(event.target.value)
    }
    function handlePreco(event:ChangeEvent<HTMLInputElement>){
        setPreco(event.target.value)
    }
    function handleImagem(event:ChangeEvent<HTMLInputElement>){
        setImagem(event.target.value)
    }
    function handleImagem2(event:ChangeEvent<HTMLInputElement>){
        setImagem2(event.target.value)
    }
    function handleEstoque(event:ChangeEvent<HTMLInputElement>){
        setEstoque(event.target.value)
    }
    return(
        <>
            <form onSubmit={handleForm}>
                <div>
                <label htmlFor="id">Id</label>
                    <input placeholder="Id" type="text" name="id" id="id" onChange={handleId} />
                </div>
                <div>
                <label htmlFor="nome">Nome</label>
                    <input placeholder="Nome" type="text" name="nome" id="nome" onChange={handleNome} />
                </div>
                <div>
                <label htmlFor="descricao">Descrição</label>
                    <input placeholder="Descrição" type="text" name="descricao" id="descricao" onChange={handleDescricao} />
                </div>
                <div>
                <label htmlFor="preco">Preço</label>
                    <input placeholder="Preço" type="text" name="preco" id="preco" onChange={handlePreco} />
                </div>
                <div>
                <label htmlFor="imagem">URL Imagem</label>
                    <input placeholder="URL Imagem" type="text" name="imagem" id="imagem" onChange={handleImagem} />
                    {imagem && <img className="imagem-produto-reduzida" src={imagem} alt="Imagem do Produto" />}
                </div>
                <div>
                <label htmlFor="imagem2">URL Imagem2</label>
                    <input placeholder="URL Imagem2" type="text" name="imagem2" id="imagem2" onChange={handleImagem2} />
                    {imagem && <img className="imagem2-produto-reduzida" src={imagem2} alt="Imagem do Produto" />}
                </div>
                <div>
                <label htmlFor="estoque">Estoque</label>
                    <input placeholder="Estoque" type="text" name="estoque" id="estoque" onChange={handleEstoque} />
                </div>
                <input type="submit" className="alterar-botao" value="Cadastrar" />
            </form>
        </>
    )
}

export default CadastroProduto;