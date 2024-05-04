import "@/styles/globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import lightTheme from '../themes/lightTheme';
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}