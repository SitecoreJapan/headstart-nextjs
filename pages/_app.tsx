import { AppProps } from "next/app";
import { ApiRole } from "ordercloud-javascript-sdk";
import Layout from "@/components/Layout";
import OcProvider from "@/ordercloud/redux/ocProvider";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";

const clientId = process.env.NEXT_PUBLIC_OC_CLIENT_ID || "";
const scope = process.env.NEXT_PUBLIC_OC_SCOPE
  ? (process.env.NEXT_PUBLIC_OC_SCOPE.split(",") as ApiRole[])
  : [];
const baseApiUrl = process.env.NEXT_PUBLIC_OC_BASE_API_URL;
const allowAnonymous = Boolean(process.env.NEXT_PUBLIC_OC_ALLOW_ANONYMOUS);

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <OcProvider
      config={{
        clientId,
        scope,
        baseApiUrl,
        allowAnonymous,
        cookieOptions: {
          prefix: "hds-nextjs",
          path: "/",
        },
      }}
    >
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </OcProvider>
  );
}

export default MyApp;
