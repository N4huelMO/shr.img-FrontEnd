import { useAppContext } from "@/context/AppProvider";
import { useState } from "react";

const Url = () => {
  const { url } = useAppContext();

  const [copySuccess, setCopySuccess] = useState<string>("");

  return (
    <div className="text-center">
      <p className="text-3xl uppercase font-bold mb-5">Your URL is:</p>
      <p className="text-xl font-semibold">{`${process.env.NEXT_PUBLIC_FRONTEND_URL}/link/${url}`}</p>

      <button
        type="button"
        className="bg-neutral-800 font-bold uppercase w-full md:w-[30rem] px-4 py-2 mt-5 hover:bg-neutral-700 duration-150"
        onClick={() => {
          navigator.clipboard.writeText(
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}/link/${url}`
          );
          setCopySuccess("Copied!");
        }}
      >
        {copySuccess ? copySuccess : "Copy to clipboard"}
      </button>
    </div>
  );
};

export default Url;
