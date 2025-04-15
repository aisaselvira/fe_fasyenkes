import Head from "next/head";
import FormSkenarioTpprj from "@/components/template/admin/form-skenario/form-tpprj";  
export default function Home() {
    return (
        <>
            <Head>
                <title>Form Skenario TPPRJ</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <FormSkenarioTpprj/>
        </>
    );
}