
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})
    const { setAuth } = useAuth();

    const navigate =useNavigate()

    //console.log(auth)
    //console.log(cargando)

    const handleSubmit = async e => {
        e.preventDefault();
        if ([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return
        }

        try {
            const { data } = await clienteAxios.post(`/usuarios/login`, { email, password });
            localStorage.setItem('token', data.token)
            setAuth(data)
           navigate('/proyectos')
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
            <h1 className="text-sky-600 font-black text-5xl">Inicia sesion y Administra tus
                <span className="text-slate-700"> Proyectos</span>  </h1>

            {msg && <Alerta alerta={alerta} />}

            <form className="my-10 bg-white shadow rounded-lg px-10 py-5"
                onSubmit={handleSubmit}>
                <div>
                    <label className="block text-l font-bold">Email</label>
                    <input type="email" id="email"
                        placeholder="Email de Registro"
                        className="w-full mt-3 p-3 border-2"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="my-5">
                    <label className="block text-l font-bold">Password</label>
                    <input type="Password" id="Password"
                        placeholder="Password de Registro"
                        className="w-full mt-3 p-3 border-2"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                </div>

                <input
                    type="submit"
                    value="Iniciar Sesión"
                    className="bg-gray-500 w-full py-3 text-white font-bold uppercase rounded
hover:cursor-pointer hover:bg-sky-800"
                />
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/registrar">
                    ¿No tienes una cuenta? Registrate
                </Link>

                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/olvide-password">
                    Olvide mi password
                </Link>

            </nav>
        </>
    )
}

export default Login;
