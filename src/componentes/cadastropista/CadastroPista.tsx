import {  ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

function CadastroPista(){
    const navigate = useNavigate()
    const [id,setId] = useState("")
    const [nome,setNome] = useState("")
    const [descricao,setDescricao] = useState("")
    const [preco,setPreco] = useState("")
    const [imagem,setImagem] = useState("")
    async function handleForm(event:FormEvent){
        event.preventDefault()
       await fetch("http://localhost:8000/pistas",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:id,
                nome:nome,
                descricao:descricao,
                preco:preco,
                imagem:imagem
            })
        }).then(async(resposta)=>{
            if(resposta.status!=500){
            alert("Pista cadastrado com sucesso")
            navigate("/")
            }else{
                alert("Erro ao cadastar pista"+resposta.body)
            }
        })
        .catch(()=>{
            console.log("Erro ao cadastrar pistas")
        })
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
    return(
        <>
            <h1>Meu Componente de Cadastro de Pistas</h1>
            <form onSubmit={handleForm}>
                <div>
                    <input placeholder="Id" type="text" name="id" id="id" onChange={handleId} />
                </div>
                <div>
                    <input placeholder="Nome" type="text" name="nome" id="nome" onChange={handleNome} />
                </div>
                <div>
                    <input placeholder="Descrição" type="text" name="descricao" id="descricao" onChange={handleDescricao} />
                </div>
                <div>
                    <input placeholder="Preço" type="text" name="preco" id="preco" onChange={handlePreco} />
                </div>
                <div>
                    <input placeholder="URL Imagem" type="text" name="imagem" id="imagem" onChange={handleImagem} />
                </div>
                <input type="submit" value="Cadastrar" />
            </form>
        </>
    )
}

export default CadastroPista