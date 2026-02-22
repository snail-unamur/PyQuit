import "@/global.css";
import type { AppProps } from "next/app";
import { AppLayout } from "@/components/Layout";
import { AppHeader } from "@/components/header";
import { ThemeProvider } from "@/providers/theme-provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppLayout header={<AppHeader />}>
        <article className="prose">
          <Component {...pageProps} />
        </article>
      </AppLayout>
    </ThemeProvider>
  );
}
