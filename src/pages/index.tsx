import { useEffect } from "react";
import Head from "next/head";

import { useAppContext } from "@/context/AppProvider";

import Alert from "@/components/Alert";
import Dropzone from "@/components/Dropzone/Dropzone";
import Url from "@/components/Url";

export default function Home() {
  const { alert, url, getUser } = useAppContext();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Head>
        <title>shr.img</title>
      </Head>

      {alert.msg && <Alert />}

      {url ? <Url /> : <Dropzone />}
    </>
  );
}
