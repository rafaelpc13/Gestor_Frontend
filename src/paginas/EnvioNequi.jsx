
import FormularioProyecto from "../components/FormularioProyecto";
import EnvioPush from "../components/EnvioPush";

const NuevoProyecto = () => {

    return (
        <>
            <h1 className="text-4xl font-black">Crear Proyecto</h1>

            <div className="mt-10 flex justify-center">
                <EnvioPush></EnvioPush>
            </div>
        </>
    )
}

export default NuevoProyecto;