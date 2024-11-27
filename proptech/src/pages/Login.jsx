import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import LogoFinancia from "../assets/LogoFinancia.png";
// import Context from "../../context/Context";

const Login = () => {
  // const { loginUser } = useContext(Context);

  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log("DATA::", data);
    const { email, password } = data;
    try {
      // await loginUser(email, password);
    } catch (error) {
      console.log("error", error);
    }
  });
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="card w-96 bg-white shadow-lg rounded-lg">
          <div className="card-body items-center text-center">
            <h2 className="card-title">
              <img
                src={LogoFinancia}
                alt="Protech logo"
                className="lg:max-h-[40rem] lg:w-full"
              />
            </h2>
            <p className="text-gray-500">
              Inicie sesión en su cuenta para aprovechar todas las
              funcionalidades de la plataforma.
            </p>

            <form onSubmit={onSubmit} className="flex flex-col gap-9">
              <div className="flex flex-col gap-5 pb-3">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-worksans"
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="ejemplo@ejemplo.com"
                    className="w-11/12 mt-1 px-4 py-2 bg-base-200 border border-primary rounded-md focus:outline-none focus:border-primary"
                    {...register("email", { required: true })}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-worksans"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="********"
                    className="w-11/12 mt-1 px-4 py-2 bg-base-200 border border-primary rounded-md focus:outline-none focus:border-primary"
                    {...register("password", { required: true })}
                  />
                  <div className="text-sm mt-2"></div>
                </div>
              </div>
              <a
                className="text-sm text-l text-start -m-10 ml-3 text-info"
                href="#"
              >
                ¿Olvidó su contraseña?
              </a>
              <div className="flex flex-col gap-4 card-actions">
                <div className="flex justify-start gap-2 items-center">
                  <button
                    type="submit"
                    className="btn bg-primary ml-3 mt-4 font-semibold text-white text-[#1c0505b3]"
                  >
                    Iniciar sesión
                  </button>
                  <div className="text-sm text-center mt-5 ml-4">
                    ¿No tienes una cuenta?{" "}
                    <Link className="text-sm mx-2 text-primary" to="/register">
                      Registro
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
