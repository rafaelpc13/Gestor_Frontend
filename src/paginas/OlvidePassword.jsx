import { Link } from 'react-router-dom'
import { useState } from 'react';
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios';

const OlvidePassword = () => {

    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e => {
        e.preventDefault();

        if (email === '' || email.length < 6) {
            setAlerta({
                msg: 'El Email es obligatorio',
                error: true

            });
            return
        }
        try{
            const {data} = await clienteAxios.post(`/usuarios/olvide-password`,{email});
            setAlerta({
                msg:data.msg,
                error:false
            })
             
        }catch(error){
            setAlerta({
                msg:error.response.data.msg,
                error:true
                
        })
    }
}

    const {msg}=alerta
    return (
        <>
            <h1 className="text-sky-600 font-black text-5xl">Recupera tu acceso
            </h1>
            {msg && <Alerta alerta={alerta} />}

            <form className="my-10 bg-white shadow rounded-lg px-10 py-5"
                onSubmit={handleSubmit}>


                <div>
                    <label className="block text-l font-bold my-5">Email</label>
                    <input type="email" id="email"
                        placeholder="Email de Registro"
                        className="w-full mt-3 p-3 border-2"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                </div>


                <input
                    type="submit"
                    value="Enviar Instrucciones"
                    className="bg-gray-500 w-full py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800"

                />
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">
                    ¿Ya tienes una cuenta? Inicia Sesión
                </Link>



            </nav>
        </>
    )
}

export default OlvidePassword;
