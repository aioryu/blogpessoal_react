import Popup from 'reactjs-popup';
import FormPostagem from '../formpostagem/FormPostagem';

import 'reactjs-popup/dist/index.css'; //Folha de Estilos CSS padrão da Biblioteca
import './ModalPostagem.css' //Folha de Estilos CSS customizada criada

function ModalPostagem() {
    return (
        <>
            <Popup
                trigger={ //Quando importarmos o componente Modal, esse botão ficará visível na renderização do Componente que o importou para o usuário clicar e abrir o Modal na tela
                    <button 
                        className='border rounded px-4 py-2 hover:bg-sky-600 cursor-pointer'>
                        Nova Postagem
                    </button>
                }
                modal //propriedade Modal, no Componente Popup, que indica que o modelo de PopUp que estamos usando é o modelo Modal
            >
                <FormPostagem /> {/*Componente FormPostagem importado, que será exibido dentro do Modal */}
            </Popup>
        </>
    );
}

export default ModalPostagem;