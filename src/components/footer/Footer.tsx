import { LinkedinLogo } from '@phosphor-icons/react'
import { GithubLogo } from '@phosphor-icons/react/dist/ssr'

function Footer() {

    const data = new Date().getFullYear()

    return (
        <>
            <div className="flex justify-center bg-indigo-900 text-white">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-xl font-bold'>
                            Blog pessoal do Vitor| Projeto guiado pela Generation Brasil 💙 | Copyright: {data}
                    </p>
                    <p className='text-lg'>Conecte-se Comigo!</p>
                    <div className='flex gap-2'>
                        <a href="https://www.linkedin.com/in/vitor-nazareth/" target="_blank">
                            <LinkedinLogo size={48} className="hover:text-sky-400 transition-colors" />
                        </a>
                        <a href="https://github.com/aioryu" target="_blank">
                            <GithubLogo  size={48} className="hover:text-sky-400 transition-colors" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer