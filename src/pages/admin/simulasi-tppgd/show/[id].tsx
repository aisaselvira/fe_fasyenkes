import Head from "next/head";
import ShowSimulasittpgd from "@/components/template/admin/page-show-simulasi/simulasi-tppgd";  
export default function Home() {
    return (
        <>
            <Head>
                <title>Detail Simulasi TPPGD</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ShowSimulasittpgd/>
        </>
    );
}