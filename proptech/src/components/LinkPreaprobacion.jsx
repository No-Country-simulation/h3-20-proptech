import { Link } from "react-router-dom"

function LinkPreaprobacion(){
    return(
    <>
        <div class="tab-container items-center">
            <Link to="/preaprobacionDatosPersonales" class="tab">Personal</Link>
            <Link to="/preaprobacionGarante" class="tab">Garante uno</Link>
            <Link to="/preaprobacionGaranteServicios" class="tab">Garante dos</Link>
        </div>
    </>
            )
}
export default LinkPreaprobacion