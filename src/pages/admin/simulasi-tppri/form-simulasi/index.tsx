import Head from "next/head";
import FormSimulasiTppri from "@/components/template/admin/form-simulasi/form-tppri";  
export default function Home() {
    return (
        <>
            <Head>
                <title>Form Simulasi TPPRI</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <FormSimulasiTppri/>
        </>
    );
}