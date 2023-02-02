
import { formatearFecha } from "../helpers/formatearFecha"
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"

const Tarea = ({ tarea }) => {


    const admin = useAdmin()
    
    const { handleModalEditarTarea, handleEliminarTarea, completarTarea } = useProyectos()

    const { descripcion, nombre, prioridad, fechaEntrega, _id, estado} = tarea

    return (

        <div className="border-b p-5 flex justify-between items-center">

            <div >
                <p className="text-xl uppercase">{nombre}</p>
                <p className="text-xl text-gray-400">{descripcion}</p>
                <p className="text-xl">{formatearFecha(fechaEntrega)}</p>
                <p className="text-xl text-gray-400">{prioridad}</p>
                {estado && <p className="bg-green-400 uppercase rounded-lg text-xs font-bold">Completada por: {tarea.completado.primernombre} {tarea.completado.primerapellido}
                <p>{tarea.completado.celular}</p></p>}
            </div>

            <div className="flex gap-2">
                {admin && (
                    <button className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                        onClick={() => handleModalEditarTarea(tarea)}
                    >Editar</button>
                )}


                <button className={`${estado ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
                    onClick={() => completarTarea(_id)}>
                    {estado ? 'Completa' : 'Incompleta'}</button>

                {admin && (
                    <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                        onClick={() => handleEliminarTarea(tarea)}>Eliminar</button>
                )}



            </div>

        </div>
    )

}


export default Tarea