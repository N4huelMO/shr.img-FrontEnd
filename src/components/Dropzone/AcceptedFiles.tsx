import { useAppContext } from "@/context/AppProvider";
import { useEffect, useState } from "react";

const AcceptedFiles = () => {
  const { getLink, user, file, setFile, acceptedFile } = useAppContext();

  const [hasPassword, setHasPassword] = useState<boolean>(false);

  useEffect(() => {
    setFile({ ...file, password: "" });
  }, [hasPassword]);

  return (
    <div className="w-full flex flex-col justify-center items-center mx-5 sm:mx-0">
      <h4 className="mb-5 text-2xl font-bold">File</h4>

      <div className="bg-neutral-800 px-5 py-2 rounded w-full sm:w-1/2 shadow-md">
        <p className="font-bold text-xl">{acceptedFile[0].name}</p>
        <p className="text-sm text-neutral-500 mt-1">
          {(acceptedFile[0].size / Math.pow(1024, 2)).toFixed(2)} MB
        </p>
      </div>

      {user && (
        <div className="sm:w-1/2 mx-auto mt-3">
          <div className="flex gap-2">
            <label htmlFor="downloads" className="text-lg">
              Downloads:
            </label>
            <input
              onChange={(e) => {
                setFile({ ...file, downloads: parseInt(e.target.value) });
              }}
              defaultValue={1}
              type="number"
              id="downloads"
              className="text-black w-10 text-center rounded-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          <div className="mt-2">
            <div className="flex justify-between">
              <label htmlFor="password" className="text-lg">
                Protect with Password
              </label>

              <input
                type="checkbox"
                onClick={() => {
                  setHasPassword(!hasPassword);
                }}
              />
            </div>

            {hasPassword && (
              <input
                onChange={(e) => {
                  setFile({ ...file, password: e.target.value });
                }}
                type="password"
                id="password"
                className="text-black w-full mt-1 py-1 px-2 rounded-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        className="bg-neutral-800 py-3 px-5 rounded mt-10 hover:bg-neutral-700 duration-150 font-semibold w-full sm:w-1/2"
        onClick={getLink}
      >
        Create link
      </button>
    </div>
  );
};

export default AcceptedFiles;
