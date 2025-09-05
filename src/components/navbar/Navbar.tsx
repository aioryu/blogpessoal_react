import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {

    const navigate = useNavigate();

    const { handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        alert('O Usuário foi desconectado com sucesso!')
        navigate('/')
    }
    
    return (
        <>
            <div className='w-full bg-indigo-900 text-white
                flex justify-center py-4'>

                <div className="container flex justify-between text-lg">
                    <Link to='/home' className="text-2xl font-bold hover:text-sky-500">Blog Pessoal do Vitor</Link>

                    <div className='flex gap-4'>
                        <Link to='/postagens' className='hover:text-sky-400'>Postagens</Link>
                        <Link to='/temas' className="hover:text-sky-400">Temas</Link>
                        <Link to='/cadastrartema' className="hover:text-sky-500">Cadastrar tema</Link>
                        <Link to='/perfil' className='hover:text-sky-500'>Perfil</Link>
                        <Link to='' onClick={logout} className="hover:text-sky-400">Sair</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar