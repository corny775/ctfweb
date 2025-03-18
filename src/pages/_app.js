import "@/styles/globals.css";
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js"
        strategy="beforeInteractive"
        id="leaflet-script"
      />
      <Component {...pageProps} />
    </>
  );
}