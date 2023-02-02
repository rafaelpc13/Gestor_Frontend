
import { useEffect,useState } from "react";
import { useParams,Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {

    const params = useParams();
    const {id}=params

    const [alerta, setAlerta] = useState({})
    const [cuentaConfirmada,setCuentaConfirmada]= useState(false)
   

    useEffect(() => {

const confirmarCuenta = async () =>{
try {
    const url = `/usuarios/confirmar/${id}`
    const {data} = await clienteAxios(url)

    setAlerta({
        msg: data.msg,
        error:false
       })
       setCuentaConfirmada(true)
} catch (error) {
 setAlerta({
    msg: error.response.data.msg,
    error:true
 })
}
}
confirmarCuenta();
    }, [])

    const {msg}=alerta
    return (
       <>
        <h1 className="text-sky-600 font-black text-5xl">
    <span className="text-slate-700"> Confirma tu cuenta</span>  </h1>

    <div>
        {msg && <Alerta alerta={alerta}/>}

        {cuentaConfirmada && ( 
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">
        Inicia Sesión</Link>)}
    </div>
       </>
    )
}

export default ConfirmarCuenta;
