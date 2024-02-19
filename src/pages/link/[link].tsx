import Alert from "@/components/Alert";
import axiosClient from "@/config/axiosClient";
import { useAppContext } from "@/context/AppProvider";
import { FilePageProps, ServerSideParams } from "@/interfaces/interfaces";
import { AxiosError } from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export const getServerSideProps = async ({ params }: ServerSideParams) => {
  const { link } = params;

  try {
    const { data } = await axiosClient.get(`/api/links/${link}`);

    return {
      props: {
        dataFetched: data,
      },
    };
  } catch (err) {
    if (err instanceof AxiosError) {
      const error = {
        isError: true,
        msg: err.response?.data.msg,
      };

      return {
        props: {
          dataFetched: error,
        },
      };
    }
  }
};

export const getServerSidePaths = async () => {
  const { data } = await axiosClient.get(`/api/links`);

  const paths = data.enlaces.map((link: { url: string }) => ({
    params: { link: link.url },
  }));

  return {
    paths,
    fallback: false,
  };
};

const File = ({ dataFetched }: FilePageProps) => {
  const { alert, setAlert } = useAppContext();

  const [hasPassword, setHasPassword] = useState<boolean | null>(
    dataFetched?.password || null
  );
  const [password, setPassword] = useState<string>("");
  const [fileLink, setFileLink] = useState(dataFetched?.file || null);

  const router = useRouter();

  const checkPassword = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axiosClient.post(
        `/api/links/${dataFetched.link}`,
        {
          password,
        }
      );

      setHasPassword(data.password);
      setFileLink(data.file);
    } catch (error) {
      if (error instanceof AxiosError) {
        setAlert({
          msg: error.response?.data.msg,
          error: true,
        });

        setTimeout(() => {
          setAlert({
            msg: "",
            error: false,
          });
        }, 4000);
      }
    }
  };

  if (dataFetched.isError) {
    return (
      <>
        <Head>
          <title>shr.img - Link Doesn&apos;t Exist</title>
        </Head>

        <p className="text-center text-4xl font-semibold">{dataFetched.msg}</p>

        <button
          className="flex justify-center items-center mx-auto uppercase bg-neutral-800 py-3 px-5 rounded hover:bg-neutral-700 duration-150 font-semibold mt-10"
          type="button"
          onClick={() => {
            router.push("/");
          }}
        >
          go to home
        </button>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>shr.img - File Download</title>
      </Head>

      {alert.msg && <Alert />}

      {hasPassword ? (
        <>
          <p className="text-center text-xl">
            This link has been protected with password.
            <br />
            Please enter the password below.
          </p>

          <div className="w-full sm:w-1/2 xl:w-1/4 mx-auto flex justify-center items-center flex-col py-5 bg-black/20 shadow-md mt-10">
            <form
              className="flex flex-col gap-5 w-full px-5"
              onSubmit={checkPassword}
            >
              <fieldset className="flex flex-col">
                <label htmlFor="password" className="text-lg">
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  className="text-black w-full mt-1 py-1 px-2 rounded-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
              </fieldset>

              <button
                type="submit"
                className="bg-neutral-800 py-3 px-5 rounded hover:bg-neutral-700 duration-150 font-semibold w-full"
              >
                Check password
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-center text-4xl">Download your file:</h1>
          <div className="flex justify-center mt-10">
            <Link
              href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/${fileLink}`}
              download
              className="bg-neutral-800 text-center w-full sm:w-auto uppercase font-bold py-3 px-10 hover:bg-neutral-700 duration-150 "
            >
              Download
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default File;
