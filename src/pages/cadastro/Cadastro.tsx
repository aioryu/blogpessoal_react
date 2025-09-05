import { useState, useEffect, type FormEvent, type ChangeEvent,} from 'react'
import { useNavigate } from 'react-router-dom'
import { cadastrarUsuario } from '../../services/Service'
import './Cadastro.css'
import { RotatingLines } from 'react-loader-spinner'
import type Usuario from '../../models/Usuario'

function Cadastro() {

  const navigate = useNavigate() // redireciona o usuário para outras rotas da aplicação
  
  const [isLoading, setIsLoading] = useState<boolean>(false) //Enquanto a Requisição não receber uma Resposta, o Estado permanecerá com o valor true, exibindo o Loader. Finaliza com false

  const[confirmaSenha, setConfirmaSenha] = useState<string>("") //comparação entre os valores do inputs onde??

  const [usuario, setUsuario] = useState<Usuario>({ //Estado usuario, do tipo Usuario (Interface Model), inicializados com o valor vazio ou zero
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  useEffect(() => {
    if (usuario.id !== 0){
      retornar()
    }
  }, [retornar, usuario])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function retornar(){ //usuário cadastrado com sucesso(ID!=0), redireciona o usuário para a página de login
    navigate('/login')
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){ //Este argumento 'e' vem de event.target, que refere-se ao elemento do formulário, que disparou o evento onChange, que no caso do Componente Cadastro, serão elementos input (HTMLInputElement)
    setUsuario({
      ...usuario, //O Operador Spread ... permite copiar rapidamente todo ou parte de objeto existente para um novo objeto, além de permitir a combinação de vários objetos em um único objeto. Dá para criar novos objetos, baseados em objetos existentes, com algumas alterações em relação aos objetos originais
      [e.target.name]: e.target.value //O atributo event.target.name refere-se a propriedade name (nome) do elemento input do formulário, que acionou o evento onChange
    }) //Já o event.target.value refere-se a propriedade value (valor), que armazena o novo valor do elemento input do formulário, que acionou o evento onChange, ou seja, o valor que foi digitado pelo usuário

  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){ //atualiza o Estado confirmaSenha
    setConfirmaSenha(e.target.value)
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>){ //lida com os eventos de mudança de valores no elemento form, como um todo
    e.preventDefault() //executa a lógica necessária, sem recarregar a página e perder os dados digitados pelo usuário

    if(confirmaSenha === usuario.senha && usuario.senha.length >= 8){

      setIsLoading(true)

      try{
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
        alert('Usuário cadastrado com sucesso!')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      }catch(error){
        alert('Erro ao cadastrar o usuário!')
      }
    }else{
      alert('Dados do usuário inconsistentes! Verifique as informações do cadastro.')
      setUsuario({...usuario, senha: ''})
      setConfirmaSenha('')
    }

    setIsLoading(false)
  }


  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen 
            place-items-center font-bold">
        <div className="fundoCadastro hidden lg:block"></div>
        <form className='flex justify-center items-center flex-col w-2/3 gap-3' 
          onSubmit={cadastrarNovoUsuario}>{/*Qndo o usuário enviar o formulário, este evento irá disparar a função*/}
          <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-slate-700 rounded p-2"
              value = {usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}             
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 border-slate-700 rounded p-2"
              value = {usuario.usuario} /*valor de input */
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} //ao digitarmos alguma coisa nesse input, o seu Estado será modificado, e o evento onChange() será acionado
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="border-2 border-slate-700 rounded p-2"
              value = {usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
              value = {usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={confirmaSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button 
                type='reset' //do tipo reset, para impedir que o formulário seja enviado
                className='rounded text-white bg-red-400 
                hover:bg-red-700 w-1/2 py-2'
                onClick={retornar}>Cancelar
            </button>
            <button 
                type='submit'
                className='rounded text-white bg-indigo-400 
                           hover:bg-indigo-900 w-1/2 py-2
                           flex justify-center' 
               >
                  {isLoading ? <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                  /> :
                    <span>Cadastrar</span>
                  }              
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Cadastro