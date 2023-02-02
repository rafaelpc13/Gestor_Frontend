
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {


    const [password, setPassword] = useState('')
    const [tokenvalido, setTokenValido] = useState(false)
    const [alerta, setAlerta] = useState({})
    const [passwordModificado, setPasswordModificado] = useState(false)
    const params = useParams()
    const { token } = params
    //console.log(params)
    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`)

                setTokenValido(true)
            }

            catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true

                })
            }
        }
        comprobarToken()
    }, [])


    const handleSubmit = async e => {
        e.preventDefault();

        if (password.length < 6) {
            setAlerta({
                msg: 'El password debe ser meyor a 6 caracteres',
                error: true

            });
            return
        }
        try {
            const url = (`/usuarios/olvide-password/${token}`);
            const { data } = await clienteAxios.post(url, { password });
           // console.log(data)
            setAlerta({
                msg: data.msg,
                error: false
            })
            setPasswordModificado(true)
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
            <h1 className="text-sky-600 font-black text-5xl">
                <span className="text-slate-700"> Reestablece tu Password</span>
            </h1>
            {msg && <Alerta alerta={alerta} />}
            {tokenvalido && (
                <form className="my-10 bg-white shadow rounded-lg px-10 py-5"
                    onSubmit={handleSubmit}>

                    <div className="my-5">
                        <label className="block text-l font-bold"> Nuevo Password</label>
                        <input type="Password" id="Password"
                            placeholder="Escribe tu Nuevo Password"
                            className="w-full mt-3 p-3 border-2"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Guardar tu nuevo password"
                        className="bg-gray-500 w-full py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800"
                    />
                </form>
            )}

            {passwordModificado && (
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">
                    Inicia Sesión</Link>)}

        </>
    )
}

export default NuevoPassword;
