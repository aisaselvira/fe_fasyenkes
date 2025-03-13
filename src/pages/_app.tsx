import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {Poppins} from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-poppins", // Gunakan CSS Variable agar lebih stabil
});

export default function App({Component, pageProps}: AppProps) {
    return (
        <div className={poppins.variable}>
            <Component {...pageProps} />
        </div>
    );
}
