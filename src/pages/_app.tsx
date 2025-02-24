import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider, useUser } from '@clerk/nextjs'
import {useEffect } from "react";
import { useRouter } from "next/router";


const ProtectedRoutes = ({ children }:any) => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  
  const publicRoutes = ["/"];

  useEffect(() => {
    if (isLoaded && !isSignedIn && !publicRoutes.includes(router.pathname)) {
      router.push("/");
    }
  }, [isSignedIn, isLoaded, router]);

  if (!isLoaded) return null; 

  return children;
};

const MyApp: AppType = ({ Component, pageProps }) => {
  return (<ClerkProvider {...pageProps} publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
    <ProtectedRoutes></ProtectedRoutes>
  <Component {...pageProps} /> </ClerkProvider>
  )
;
};

export default api.withTRPC(MyApp);
