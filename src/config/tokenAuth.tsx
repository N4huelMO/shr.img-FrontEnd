import axiosClient from "./axiosClient";

const tokenAuth = (token: string) => {
  if (token) {
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosClient.defaults.headers.common["Authorization"];
  }
};

export default tokenAuth;
