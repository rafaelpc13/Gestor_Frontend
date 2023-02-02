import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const PreviewProyecto = ({proyecto}) => {

    const {auth} =useAuth()
    const {nombre,_id,cliente,creador}=proyecto
    return (
<>
<div className="border-b p-5 flex justify-between">
    <div>
    <p className="flex-1">
            
            {nombre}
        <span className="text-sm text-gray-500 uppercase">{' '} {cliente} </span>
        </p>

        <div >
            <span >
        {auth._id !==  creador && (
            <p className="text-xs text-black-800 uppercase font-bold bg-red-400 rounded-lg w-50%">Colaborador</p> 
        ) }
</span>
        </div>
    </div>
       
       

        <Link to={`${_id}`} className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold">
        Ver proyecto
        </Link>
        
        </div>

      
</>
    

    )
}
    export default PreviewProyecto