import { Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import useAuth from "../hooks/useAuth";
import {Combobox, Dialog,Transition } from '@headlessui/react'
import { useState } from "react";
const Header = () => {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const [ busqueda, setBusqueda] = useState ('')
    const {handleBuscador,proyectos,cerrarSesion} =useProyectos()
    const {cerrarSesionAuth}= useAuth()

    const proyectosFiltrados = busqueda === '' ? [] : proyectos.filter (proyecto => proyecto.nombre.toLowerCase().includes(busqueda.toLowerCase()))


    const handleCerrarSesion = ()=>{
        cerrarSesion()
        cerrarSesionAuth()
        localStorage.removeItem('token')
    }

    return (
        <header className="px-4 py-5bg-white border-b">
            <div className="md: flex md:justify-between">
                <h2 className="text-4xl text-sky-500 font-black">
                    Gestor de Proyectos
                </h2>

                    <div className="flex items-center gap-4">
                        <Combobox   as="div"
                    className="transform divide-y divide-gray-100 overflow-hidden 
                     rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
                     onChange={(proyecto)=>(window.location=`/proyectos/${proyecto._id}`)}
                     >

                        <Combobox.Input
                            className="h-8 w-full border-0  pl-4 pr-4 text-white-800 placeholder-white-400 focus:ring-0 sm:text-sm"
                            placeholder="Buscar Proyectos..."
                            onChange={e => setBusqueda(e.target.value)}
                        />
                        {proyectosFiltrados.length > 0 && (
                        <Combobox.Options static className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                            {proyectosFiltrados.map(proyecto => (
                                <Combobox.Option
                                key={proyecto._id}
                                value={proyecto}
                                className ={({active}) =>
                                 classNames('cursor-default select-none px-3 py-2', active && 'bg-sky-600 text-white') }
                                >
                                    {proyecto.nombre}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    )}
                        </Combobox>
                       
                        <Link to="/proyectos"
                        className="font-bold uppercase">
                            Proyectos
                        </Link>

                        <button type="button"
                        className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
                        onClick={handleCerrarSesion}>Cerrar Sesión</button>
                    </div>
            </div>
        </header >
    )
}

export default Header;