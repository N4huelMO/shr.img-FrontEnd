import { AxiosError } from "axios";
import axiosClient from "@/config/axiosClient";
import tokenAuth from "@/config/tokenAuth";

import {
  AlertProps,
  FileProps,
  IFormValues,
  UserProps,
} from "@/interfaces/interfaces";

import {
  createContext,
  useState,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

type ContextProps = {
  file: FileProps;
  setFile: Dispatch<SetStateAction<FileProps>>;
  alert: AlertProps;
  setAlert: Dispatch<SetStateAction<AlertProps>>;
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
  getLink: () => {};
  getUser: () => {};
  user: UserProps | null;
  cleanStates: () => void;
  logout: () => void;
  message: string;
  error: boolean;
  createUser: (data: IFormValues) => Promise<void>;
  login: (data: IFormValues) => Promise<void>;
  acceptedFile: File[];
  setAcceptedFile: Dispatch<SetStateAction<File[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const AppContext = createContext<ContextProps | null>(null);

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [file, setFile] = useState<FileProps>({
    name: "",
    original_name: "",
    downloads: 1,
    password: "",
    author: null,
  });
  const [alert, setAlert] = useState<AlertProps>({
    msg: "",
    error: false,
  });
  const [url, setUrl] = useState<string>("");
  const [user, setUser] = useState<UserProps | null>(null);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [acceptedFile, setAcceptedFile] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const { reset } = useForm<IFormValues>();

  useEffect(() => {
    setAcceptedFile([]);
  }, [user]);

  const createUser = async (data: IFormValues) => {
    setLoading(true);

    try {
      const response = await axiosClient.post("/api/users", data);

      setMessage(response.data.msg);
      setError(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      if (error instanceof AxiosError) {
        setMessage(error.response?.data.msg);
        setError(true);
      }

      setTimeout(() => {
        setMessage("");
        setError(false);
      }, 3000);

      return;
    }

    reset({
      name: "",
      email: "",
      password: "",
    });

    setTimeout(() => {
      setMessage("");
      setError(false);

      router.push("/login");
    }, 2000);
  };

  const login = async (data: IFormValues) => {
    setLoading(true);

    try {
      const response = await axiosClient.post("/api/auth", data);

      setMessage(response.data.msg);
      setError(false);

      localStorage.setItem("token", response.data.token);

      router.push("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);

      if (error instanceof AxiosError) {
        setMessage(error.response?.data.msg);
        setError(true);
      }

      setTimeout(() => {
        setMessage("");
        setError(false);
      }, 3000);

      return;
    }
  };

  const getLink = async () => {
    const { data } = await axiosClient.post("/api/links", file);

    setUrl(data.msg);
  };

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }

    try {
      const { data } = await axiosClient("/api/auth");

      setUser(data.user);
    } catch (error) {}
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);

    setAcceptedFile([]);
  };

  const cleanStates = () => {
    setFile({
      name: "",
      original_name: "",
      downloads: 1,
      password: null,
      author: null,
    });

    setUrl("");
  };

  return (
    <AppContext.Provider
      value={{
        file,
        setFile,
        alert,
        setAlert,
        url,
        setUrl,
        getLink,
        getUser,
        user,
        cleanStates,
        logout,
        message,
        error,
        createUser,
        login,
        acceptedFile,
        setAcceptedFile,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a ThemeProvider");
  }
  return context;
}

export { AppProvider };

export default AppContext;
