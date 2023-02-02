import { useEffect } from "react";
import useProyectos from "../hooks/useProyectos";
import PreviewProyecto from "../components/PreviewProyecto";
import io from 'socket.io-client'



const Proyectos = () => {

  const { proyectos } = useProyectos()
  //console.log(proyectos)
/*   useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('prueba', proyectos)

    socket.on("respuesta",()=>{
      console.log("desde el fronend")
    })
  }) */
  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>

      <div className="bg-white shadow mt-10 rounded-lg ">
        {proyectos.length ?
          proyectos.map(proyecto => (
            <PreviewProyecto
              key={proyecto._id}
              proyecto={proyecto} />
          ))
          :
          <p className="text-center text-gray-500 uppercase p-5">No hay proyectos aun Create uno</p>}
      </div>
    </>
  )
}

export default Proyectos;