import Link from "next/link";

const Info = () => {
  return (
    <div className="text-center md:text-left md:w-2/3 h-ful flex flex-col mt-5 sm:mt-0">
      <h2 className="text-3xl sm:text-4xl">
        Share images easily, privately and securely
      </h2>
      <p className="my-5 text-base sm:text-lg">
        <strong className="text-neutral-600 uppercase">shr.img</strong> allows
        you to share images with end-to-end encryption to provide the best
        security for your files. <br />
        Also, images can be sent it with the highest quality and you can keep
        your sharing privately and securely because the link and file are
        deleted once downloads are completed.
      </p>

      <Link
        href="/login"
        className="mt-auto text-center bg-neutral-800 p-3 text-sm sm:text-base rounded hover:bg-neutral-700 duration-150"
      >
        Create an account to get benefits
      </Link>

      <p className="text-xs text-neutral-400/25 font-bold text-center mt-2">
        If you get an account, can upload larger images and edit some download
        values.
      </p>
    </div>
  );
};

export default Info;
