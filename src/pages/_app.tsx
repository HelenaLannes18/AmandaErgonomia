import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { AppProps } from "next/app";
import Script from "next/script";
import { theme } from "../styles/theme"
import { ChakraProvider } from '@chakra-ui/react'
import "../styles/globals.css";
import { Toaster } from 'react-hot-toast';
import { ptBR } from "@clerk/localizations";

export const metadata: Metadata = {
  title: "Next.js Clerk Template",
  description:
    "A simple and powerful Next.js template featuring authentication and user management powered by Clerk.",
  openGraph: { images: ["/og.png"] },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ClerkProvider
        localization={ptBR}
        appearance={{
          variables: { colorPrimary: "#000000" },
          elements: {
            formButtonPrimary:
              "bg-blue border border-blue border-solid hover:bg-white hover:text-blue",
            socialButtonsBlockButton:
              "bg-white border-gray-200 hover:bg-transparent hover:border-blue text-gray-600 hover:text-blue",
            socialButtonsBlockButtonText: "font-semibold",
            formButtonReset:
              "bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-blue text-gray-500 hover:text-blue",
            membersPageInviteButton:
              "bg-blue border border-blue border-solid hover:bg-white hover:text-blue",
            card: "bg-[#fafafa]",
          },
        }}
      >

        <Toaster position="top-right" />
        <ChakraProvider theme={theme} resetCSS>
          <Component {...pageProps} />
        </ChakraProvider>
      </ClerkProvider>

      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js" />
    </>
  );
}

export default MyApp;
