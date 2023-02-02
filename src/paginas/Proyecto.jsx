import { Link, useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"
import { useEffect } from "react"
import ModalFormularioTarea from "../components/ModalFormularioTarea"
import EliminarTarea from "../components/EliminarTarea"
import Alerta from "../components/Alerta"
import Tarea from "../components/Tarea"
import Colaborador from "../components/Colaborador"
import EliminarColaborador from "../components/EliminarColaborador"
import { io } from "socket.io-client"

let socket;

const Proyecto = () => {
    const params = useParams()

    const { obtenerProyecto, proyecto, cargando, handleModalTarea, 
        alerta,submitTareasProyecto,eliminarTareaProyecto, editarTareaProyecto,cambiarEstado} = useProyectos()
    const admin = useAdmin()

    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
        socket.emit("abrir proyecto", params.id)
    }, [])

    useEffect(() => {
        socket.on('tarea agregada', tareanueva => {
            if(tareanueva.proyecto === proyecto._id){
                submitTareasProyecto(tareanueva)
            }
        })

        socket.on('tarea eliminada', tareaEliminada => {
            if(tareaEliminada.proyecto === proyecto._id){
                eliminarTareaProyecto(tareaEliminada)
            }
        })

        socket.on('tarea actualizada', tareaActualizada => {
            if(tareaActualizada.proyecto._id === proyecto._id){
                editarTareaProyecto(tareaActualizada)
            }
        })

        socket.on('nuevo estado', nuevoEstado => {
            if(nuevoEstado.proyecto._id === proyecto._id){
                cambiarEstado(nuevoEstado)
            }
        })


    })

    const { nombre, descripcion } = proyecto
    console.log(proyecto)
    if (cargando) return (
        <div className="border border-blue-300 shadow rounded-md p-4  w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div> </div>)

    const { msg } = alerta

    return (
        msg && alerta.error ? <Alerta alerta={alerta} /> : (
            <>
                {admin && (

                    <>
                        <div className="flex justify-between">
                            <h1 className="text-4xl font-black">{nombre}</h1>

                            <div className="flex items-center text-gray-400 gap-3 hover:text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                <Link to={`/proyectos/editar/${params.id}`}>Editar</Link>
                            </div>


                        </div>
                        <div>
                            <p className="text-xm font-black">{descripcion}</p>
                        </div>

                        <button
                            onClick={handleModalTarea}
                            type="button"
                            className="text-sm px-5 py-3 w-full md:w-auto 
             rounded-lg uppercase font-bold bg-red-400 text-white text-center mt-5">
                            Nueva Tarea
                        </button>


                    </>
                )}

                <p className="font-bold text-xl mt-10">Tareas del Proyecto</p>

                <div className="flex justify-center">
                    {msg && <Alerta alerta={alerta} />}
                </div>

                <div className="bg-white shadow mt-10 rounded-lg">
                    {proyecto.tareas?.length ? proyecto.tareas?.map(tarea => (
                        <Tarea
                            key={tarea._id}
                            tarea={tarea} />
                    )) :
                        <p className="text-center my-5 p-10">No hay tareas en este proyecto</p>}
                </div>

                {admin && (
                    <>
                        <div className="flex justify-between mt-10">

                            <p className="font-bold text-xl ">Colaboradores</p>

                            <div className="flex items-center text-gray-400 gap-3 hover:text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                <Link to={`/proyectos/nuevo-colaborador/${proyecto._id}`}>Añadir</Link>
                            </div>
                        </div>
                        <div className="bg-white shadow mt-10 rounded-lg">
                            {proyecto.colaboradores?.length ? proyecto.colaboradores?.map(colaborador => (
                                <Colaborador
                                    key={colaborador._id}
                                    colaborador={colaborador}
                                />
                            )) :
                                <p className="text-center my-5 p-10">No hay Colaboradores en este proyecto</p>}
                        </div>
                    </>
                )}



                <ModalFormularioTarea />
                <EliminarTarea />
                <EliminarColaborador />
            </>
        )
    )
}
export default Proyecto