/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import CardTemas from "../cardtemas/CardTemas";
import { buscar } from "../../../services/Service";
import type Tema from "../../../models/Tema";
import { Hourglass } from "react-loader-spinner";

function ListaTemas() {

    const navigate = useNavigate(); //redireciona de um Componente para outro, através das rotas definidas no Componente App

    const [temas, setTemas] = useState<Tema[]>([])

    const { usuario, handleLogout } = useContext(AuthContext) //hook useContext informa qual o contexto que ele deve acessar. Através de desestruturação foi possível selecionar apenas as propriedades usuario (usuário autenticado) e handleLogout e atribui-las a variáveis com o mesmo nome
    const token = usuario.token

    async function buscarTemas() {
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [navigate, token])

    useEffect(() => {
        buscarTemas()    
    }, [buscarTemas, temas.length]) //Sempre que esse tamanho mudar, a função buscarTemas() será executada. Garante que a lista de temas do Componente ListaTemas seja atualizada automaticamente sempre que houver alguma mudança no número de temas
    
    return (
        <>
        {temas.length === 0 && (
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
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                       {temas.map((tema) => (
                            <CardTemas key={tema.id} tema={tema} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListaTemas;