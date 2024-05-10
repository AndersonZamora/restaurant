import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import lightTheme from '../themes/lightTheme';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import type { AppProps } from "next/app";
import { AuthProvider, UiProvider } from "../context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <UiProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UiProvider>
      </AuthProvider>
    </SessionProvider>

  )
}