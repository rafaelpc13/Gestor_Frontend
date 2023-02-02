
import { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const FormularioProyecto = () => {

    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')

    const params = useParams();
    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();
    useEffect(() => {
        if (params.id) {
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)

        } else {
            console.log('Nuevo proyecto')
        }
    }, [])



    const handleSubmit = async e => {
        e.preventDefault();
        if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })

            return
        }
        //para pasar los datos hacia el provider
        await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente })
        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
    }
    const { msg } = alerta

    return (


        <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg"
            onSubmit={handleSubmit}>
            {msg && <Alerta alerta={alerta} />}
            <div className="mb-5">
                <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="nombre">Nombre Proyecto</label>
                <input id="nombre"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    type="text"
                    placeholder="Nombre del Proyecto"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />

            </div>

            <div className="mb-5">
                <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="descripcion">Descripcion</label>
                <textarea
                    id="descripcion"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Descripcion del Proyecto"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />

            </div>

            <div className="mb-5">
                <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="fecha-entrega">Fecha Entrega</label>
                <input
                    id="fecha-entrega"
                    type="date"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Descripcion del Proyecto"
                    value={fechaEntrega}
                    onChange={e => setFechaEntrega(e.target.value)}
                />

            </div>

            <div className="mb-5">
                <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="cliente">Nombre Cliente</label>
                <input id="cliente"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    type="text"
                    placeholder="Nombre del Cliente"
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}
                />

            </div>

            <input
                type="submit"
                value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
                className='bg-sky-600 w-full p-3 uppercase font-bold text-white
rounded cursor-pointer transition-color hover:bg-gray-400' />

        </form>
    )
}

export default FormularioProyecto;