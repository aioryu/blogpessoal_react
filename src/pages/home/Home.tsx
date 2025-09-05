import ListaPostagens from "../../components/postagens/listapostagens/ListaPostagens"
import ModalPostagem from "../../components/postagens/modalpostagem/ModalPostagem"

function Home() { /*estrutura básica de um Componente Funcional do React*/
    return ( /*retornará o componente Home. Um Componente React é uma função JavaScript/TypeScript, que retorna código HTML e CSS*/
        <> 
            <div className="bg-indigo-900 flex justify-center">{/*Ao invés de utilizarmos a propriedade style(CSS), utilizamos a propriedade className*/}
                <div className='container grid grid-cols-2 text-white'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className='text-5xl font-bold'>
                            Seja Bem Vinde!
                    </h2>
                    <p className='text-xl'>
                            Expresse aqui seus pensamentos e opniões
                    </p>

                   <div className="flex justify-around gap-4">
                            <div className="flex justify-around gap-4">
                                <ModalPostagem />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center ">
                        <img
                            src="https://ik.imagekit.io/illaoi/thought%20fofo.gif?updatedAt=1753907940511"
                            alt="Imagem da páginag Home"
                            className='w-2/3'
                        />
                    </div>
                </div>
            </div>
            <ListaPostagens />
        </>
    )
}

export default Home