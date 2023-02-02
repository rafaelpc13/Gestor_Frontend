import { Link } from 'react-router-dom'
import { useState } from 'react';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

const Registrar = () => {

    const [primernombre, setPrimernombre] = useState('')
    const [segundonombre, setSegundoNombre] = useState('')
    const [segundoapellido, setSegundoApellido] = useState('')
    const [primerapellido, setPrimerApellido] = useState('')
    const [celular, setCelular] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')
    const [alerta, setAlerta] = useState('')


    const handleSubmit = async e => {
        e.preventDefault();
        //comprobar si los campos estan llenos
        if ([primernombre, primerapellido, segundoapellido,celular,email, password, repetirPassword].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        //comprobar si las contraseñas son iguales
        if (password != repetirPassword) {
            setAlerta({
                msg: 'Las contraseñas no son iguales',
                error: true
            })
            return
        }
        //comprobar el tamaño de la contraseña
        if (password.length < 6) {
            setAlerta({
                msg: 'Contraseña muy corta agraga minimo 6 caracteres',
                error: true
            })
            return
        }
        setAlerta({})

        //crear el usuario en la API
        try {
            const { data } = await clienteAxios.post(`/usuarios`, { primernombre,segundonombre,primerapellido, segundoapellido, celular,email, password });
            setAlerta({
                msg: data.msg,
                error: false
            })
        setPrimernombre('')
        setSegundoNombre('')
        setPrimerApellido('')
        setSegundoApellido('')
        setCelular('')
            setEmail('')
            setPassword('')
            setRepetirPassword('')
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }
    const { msg } = alerta
    return (
        <>
            <h1 className="text-sky-600 font-black text-5xl">Crea tu cuenta y Administra tus
                <span className="text-slate-700"> Proyectos</span>  </h1>
            {msg && <Alerta alerta={alerta} />}
            <form className="my-10 bg-white shadow rounded-lg px-10 py-5"
                onSubmit={handleSubmit}>
                <div className='flex w-full gap-2'>
                    <div className=' w-full'>
                        <label className="block text-l font-bold">Primer Nombre</label>
                        <input type="text" id="nombre"
                            placeholder="Ingresa tu P.Nombre"
                            className="w-full mt-3 p-3 border-2 rounded-2xl"
                            value={primernombre}
                            onChange={e => setPrimernombre(e.target.value)} />
                    </div>
                    <div className=' w-full'>
                        <label className="block text-l font-bold"> Segundo Nombre</label>
                        <input type="text" id="nombre"
                            placeholder="Ingresa tu S.Nombre"
                            className="w-full mt-3 p-3 border-2 rounded-2xl"
                            value={segundonombre}
                            onChange={e => setSegundoNombre(e.target.value)} />
                    </div>
                </div>

                <div className='flex w-full gap-2'>
                <div className=' w-full'>
                    <label className="block text-l font-bold">Primer Apellido</label>
                    <input type="text" id="nombre"
                        placeholder="Ingresa tu P.Apellido"
                        className="w-full mt-3 p-3 border-2 rounded-2xl"
                        value={primerapellido}
                        onChange={e => setPrimerApellido(e.target.value)} />
                </div>

                <div className=' w-full'>
                    <label className="block text-l font-bold">Segundo Apellido</label>
                    <input type="text" id="nombre"
                        placeholder="Ingresa tu S.Apellido"
                        className="w-full mt-3 p-3 border-2 rounded-2xl"
                        value={segundoapellido}
                        onChange={e => setSegundoApellido(e.target.value)} />
                </div>

                </div>
                <div>
                    <label className="block text-l font-bold my-2">Celular</label>
                    <input type="number" id="email"
                        placeholder="Numero de Celular"
                        className="w-full mt-1 p-3 border-2 rounded-2xl"
                        value={celular}
                        onChange={e => setCelular(e.target.value)} />
                </div>
              

                <div>
                    <label className="block text-l font-bold my-2">Email</label>
                    <input type="email" id="email"
                        placeholder="Email de Registro"
                        className="w-full mt-1 p-3 border-2 rounded-2xl"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="my-5">
                    <label className="block text-l font-bold">Password</label>
                    <input type="Password" id="Password"
                        placeholder="Password de Registro"
                        className="w-full mt-3 p-3 border-2 rounded-2xl"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                </div>

                <div className="my-5">
                    <label className="block text-l font-bold">Repetir Password</label>
                    <input type="Password" id="Password2"
                        placeholder="Repetir Password"
                        className="w-full mt-3 p-3 border-2 rounded-2xl"
                        value={repetirPassword}
                        onChange={e => setRepetirPassword(e.target.value)} />
                </div>

                <input
                    type="submit"
                    value="Crear cuenta"
                    className="bg-gray-500 w-full py-3 text-white font-bold
                     uppercase rounded hover:cursor-pointer hover:bg-sky-800 rounded-3xl"
                />
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">
                    ¿Ya tienes una cuenta? Inicia Sesión
                </Link>

                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/olvide-password">
                    Olvide mi password
                </Link>

            </nav>
        </>
    )
}

export default Registrar;
