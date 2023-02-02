
import { formatearFecha } from "../helpers/formatearFecha"
import useProyectos from "../hooks/useProyectos"

const Colaborador = ({ colaborador }) => {

    const { handleEliminarColaborador, handleEliminarTarea } = useProyectos()

    const {  primernombre,email,primerapellido,celular} = colaborador

    return (

        <div className="border-b p-5 flex justify-between items-center">

            <div >
                <p className="text-xl uppercase">{primernombre+" "+primerapellido}</p>
                <p className="text-xl text-gray-400">{email}</p>
                
            </div>

            <div className="flex gap-2">
                <button className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                //onClick={() => handleModalEditarTarea(tarea)}
                >Editar</button>
               
                <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                onClick={() => handleEliminarColaborador(colaborador)}
                >Eliminar</button>

            </div>

        </div>
    )

}


export default Colaborador