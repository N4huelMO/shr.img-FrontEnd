import { useAppContext } from "@/context/AppProvider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LuLink } from "react-icons/lu";

const nav = [
  { name: "login", href: "/login" },
  { name: "register", href: "/register" },
];

const Header = () => {
  const { user, cleanStates, logout } = useAppContext();

  const router = useRouter();
  const path = usePathname();

  const redirect = () => {
    if (path !== "/") {
      router.push("/");

      return;
    }

    router.refresh();
  };

  return (
    <header className="w-full bg-black/20 flex items-center justify-between py-3">
      <div className="sm:w-4/5 w-full px-3 flex justify-between items-center mx-auto">
        <div
          onClick={() => {
            redirect();
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <LuLink size={30} />
          <h1 className="text-2xl font-bold">shr.img</h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-5 text-sm sm:text-base font-bold uppercase">
          {user ? (
            <>
              <p>Hi, {user.name}</p>

              <button
                type="button"
                className="uppercase bg-neutral-800 px-4 py-1 hover:bg-neutral-700 duration-150 rounded"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {nav.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  onClick={() => {
                    cleanStates();
                  }}
                  className="bg-neutral-800 px-4 py-1 hover:bg-neutral-700 duration-150 rounded"
                >
                  {link.name}
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
