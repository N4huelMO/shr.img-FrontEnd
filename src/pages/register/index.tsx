import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";

import { useAppContext } from "@/context/AppProvider";

import Input from "@/components/Input";

import { IFormValues } from "@/interfaces/interfaces";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Register = () => {
  const { message, error, createUser, loading } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    createUser(data);
  };

  return (
    <>
      <Head>
        <title>shr.img - Register</title>
      </Head>

      <div className="w-full sm:w-1/2 xl:w-1/4 mx-auto flex justify-center items-center flex-col py-5 bg-black/20 shadow-md">
        <h1 className="text-3xl font-bold">Register</h1>

        <form
          className="flex flex-col gap-8 mt-10 w-full px-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset className="flex flex-col">
            <Input
              label="name"
              register={register}
              required
              errors={errors.name}
              minLength={4}
              message="The name must be at least 4 characters"
              type="text"
            />

            <Input
              label="email"
              register={register}
              required
              errors={errors.email}
              type="email"
            />

            <Input
              label="password"
              register={register}
              required
              errors={errors.password}
              minLength={6}
              message="The password must be at least 6 characters"
              type="password"
            />
          </fieldset>

          {message && (
            <p
              className={`font-bold text-center py-2  ${
                error ? "bg-red-500" : "bg-emerald-500"
              }`}
            >
              {message}
            </p>
          )}

          {message && !error ? (
            <p className="text-center font-bold">Redirecting to Login..</p>
          ) : (
            <button
              type="submit"
              className="bg-neutral-700 w-full py-2 hover:bg-neutral-600 duration-150 uppercase font-bold tracking-wide"
              disabled={loading}
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin text-2xl w-full" />
              ) : (
                "Register"
              )}
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Register;
