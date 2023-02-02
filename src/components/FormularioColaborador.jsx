
import { useState } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"


const FormularioColaborador = () => {

    const [email, setEmail] = useState('')

    const {mostrarAlerta,alerta,submitColaborador}=useProyectos()

    const handleSubmit = e =>{
        e.preventDefault();
        if(email===''){
            mostrarAlerta({
                msg: 'El Email es obligatorio',
                error: true
            })
    
            return

        }
        submitColaborador(email)
    }
    const { msg } = alerta
    return (
        <>
            <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg"
            onSubmit={handleSubmit}>

                {msg && <Alerta alerta={alerta} />}
                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="nombre">Email Colaborador</label>
                    <input id="email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        type="email"
                        placeholder="Email de Usuario"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                </div>
                <input
                    type="submit"
                    value='buscar colaborador'
                    className='bg-sky-600 w-full p-3 uppercase font-bold 
                    text-white rounded cursor-pointer transition-color hover:bg-gray-400' 
                   
                    />

            </form>

            <div></div>

        </>


    )

}

export default FormularioColaborador