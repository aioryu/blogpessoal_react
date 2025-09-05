/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import CardPostagens from "../cardpostagens/CardPostagens";
import { useContext, useEffect, useState } from "react";
import type Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import { Hourglass } from "react-loader-spinner";
import { AuthContext } from "../../../contexts/AuthContext";

function ListaPostagens() {

    const navigate = useNavigate(); //para retornar a página de login se não estiver logado

    const [postagens, setPostagens] = useState<Postagem[]>([]); //para mudar o estado

    const { usuario, handleLogout } = useContext(AuthContext); //para pegar o usuário e o token do context
    const token = usuario.token;

    async function buscarPostagens() {
        try {
            await buscar('/postagens', setPostagens, {
                headers: {
                    Authorization: token,
                },
            })

        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }
    
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado')
            navigate('/');
        }
    }, [navigate, token])

    useEffect(() => {
            buscarPostagens()    
        }, [buscarPostagens, postagens.length]) //Sempre que esse tamanho mudar, a função buscarTemas() será executada. Garante que a lista de temas do Componente ListaTemas seja atualizada automaticamente sempre que houver alguma mudança no número de temas
        
        return (
            <>
            {postagens.length === 0 && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center', // centraliza horizontalmente
                    alignItems: 'flex-start', // alinha no topo verticalmente
                    height: '100vh',          // ocupa a altura inteira da tela
                    paddingTop: '20px',       // distância do topo
                    }}>
                    <Hourglass
                        visible={true}
                        height="600"
                        width="250"
                        ariaLabel="hourglass-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        colors={['#4B0082', '#8A2BE2']}
                    />
                    </div>    
            )}

            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col mx-2">
                    <div className='container mx-auto my-4 
                        grid grid-cols-1 md:grid-cols-2 
                        lg:grid-cols-3 gap-4'>
                        {postagens.map((postagem) => (
                            <CardPostagens key={postagem.id} postagem={postagem} />
                        ))}   
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaPostagens;