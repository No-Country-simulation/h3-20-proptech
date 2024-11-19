import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
  // const { registerUser } = useContext(Context);

  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log("DATA::", data);
    const { email, password } = data;
    try {
      // await registerUser(email, password, username, firstName, lastName);
    } catch (error) {
      console.log("error", error);
    }
  });
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="card w-120 bg-white shadow-lg rounded-lg">
          <div className="card-body items-center text-center">
            <h2 className="card-title">
              <img
                src=""
                alt="Protech logo"
                className="lg:max-h-[40rem] lg:w-full"
              />
            </h2>
            <p className="text-gray-500">
              Registrese en nuestra plataforma y aprovecha todas las
              funcionalidades de la plataforma.
            </p>

            <form onSubmit={onSubmit} className="flex flex-col gap-9 mt-6">
              <div className="grid grid-cols-2 gap-6 items-center">
                {/* Column 1 */}
                <div className="flex flex-col items-center text-center">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-start text-gray-700 font-worksans ml-3"
                    >
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="ejemplo@ejemplo.com"
                      className="min-w-36 mt-1 px-4 py-2 bg-base-200 border border-primary rounded-md focus:outline-none focus:border-primary"
                      {...register("email", { required: true })}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-start text-gray-700 font-worksans ml-3"
                    >
                      Nombre de usuario
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Juan davila"
                      className="min-w-36 mt-1 px-4 py-2 bg-base-200 border border-primary rounded-md focus:outline-none focus:border-primary"
                      {...register("username", { required: true })}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-start text-gray-700 font-worksans ml-3"
                    >
                      Contraseña
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="********"
                      className="min-w-36 mt-1 px-4 py-2 bg-base-200 border border-primary rounded-md focus:outline-none focus:border-primary"
                      {...register("password", { required: true })}
                    />
                  </div>
                </div>
                {/* End column 1 */}

                {/* Column 2 */}
                <div className="flex flex-col items-center text-center">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-start text-gray-700 font-worksans ml-3"
                    >
                      Primeiro nombre
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Juan"
                      className="min-w-36 mt-1 px-4 py-2 bg-base-200 border border-primary rounded-md focus:outline-none focus:border-primary"
                      {...register("firstName", { required: true })}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-start text-gray-700 font-worksans ml-3"
                    >
                      Apellido
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Juan"
                      className="min-w-36 mt-1 px-4 py-2 bg-base-200 border border-primary rounded-md focus:outline-none focus:border-primary"
                      {...register("lastName", { required: true })}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="rePassword"
                      className="block text-start text-gray-700 font-worksans ml-3"
                    >
                      Repetir contraseña
                    </label>
                    <input
                      type="password"
                      id="rePassword"
                      name="rePassword"
                      placeholder="**********"
                      className="min-w-36 mt-1 px-4 py-2 bg-base-200 border border-primary rounded-md focus:outline-none focus:border-primary"
                      {...register("rePassword", { required: true })}
                    />
                  </div>
                </div>
                {/* End column 2 */}
              </div>

              <div className="flex flex-col gap-4 card-actions">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Estoy de acuerdo</span>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox checkbox-primary ml-4"
                    />
                  </label>
                </div>
                <div className="flex justify-start gap-2 items-center">
                  <button
                    type="submit"
                    className="btn bg-primary ml-3 mt-4 font-semibold text-white text-[#1c0505b3]"
                  >
                    Iniciar sesión
                  </button>
                  <div className="text-sm text-center mt-5 ml-4">
                    ¿Ya tienes una cuenta?{" "}
                    <Link className="text-sm mx-2 text-primary" to="/login">
                      Login
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

export default Register;
