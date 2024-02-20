import axiosClient from "@/config/axiosClient";
import { useAppContext } from "@/context/AppProvider";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import AcceptedFiles from "./AcceptedFiles";
import Info from "./Info";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Dropzone = () => {
  const {
    file,
    setFile,
    setAlert,
    user,
    acceptedFile,
    setAcceptedFile,
    loading,
    setLoading,
  } = useAppContext();

  const onDropRejected = () => {
    setAlert({
      msg: "The limit for unregistered users is 1MB, register to access larger files uploads",
      error: true,
    });

    setTimeout(() => {
      setAlert({
        msg: "",
        error: false,
      });
    }, 4000);
  };

  const onDropAccepted = useCallback(async (acceptedFiles: File[]) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("file", acceptedFiles[0]);

    const response = await axiosClient.post("/api/files", formData);

    setFile({
      ...file,
      name: response.data.file,
      original_name: acceptedFiles[0].name,
    });

    setAcceptedFile([...acceptedFile, ...acceptedFiles]);
    setLoading(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    onDropRejected,
    maxSize: user ? 100000000 : 1000000,
  });

  return (
    <div className="flex flex-col gap-4 md:flex-row bg-black/70 xl:w-2/3 2xl:w-1/2 m-auto p-3">
      <div className="w-full h-[20rem] sm:h-[35rem] border-neutral-800 border-2 border-dashed flex justify-center items-center">
        {acceptedFile.length ? (
          <AcceptedFiles />
        ) : loading ? (
          <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
        ) : (
          <div
            {...getRootProps({
              className: `h-full w-full flex flex-col items-center justify-center px-10 bg-neutral-700/15 hover:bg-neutral-700/20 duration-150 ${
                isDragActive && "bg-neutral-700/20"
              }`,
            })}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-2xl">Drop the image here...</p>
            ) : (
              <>
                <p className="text-2xl hidden sm:block">
                  Drag &apos;n&apos; drop some image here
                </p>

                <p className="uppercase text-neutral-700 font-bold">or</p>

                <button
                  className="bg-neutral-800 w-full py-3 rounded my-2 hover:bg-neutral-700 duration-150 font-semibold"
                  type="button"
                >
                  Select image to upload
                </button>
              </>
            )}
          </div>
        )}
      </div>
      <Info />
    </div>
  );
};

export default Dropzone;
