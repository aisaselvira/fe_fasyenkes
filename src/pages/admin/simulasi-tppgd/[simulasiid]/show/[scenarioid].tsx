import Head from "next/head";
import ShowSkenariottpgd from "@/components/template/admin/page-show-skenario/skenario-tppgd";  
export default function Home() {
    return (
        <>
            <Head>
                <title>Detail skenario TPPGD</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ShowSkenariottpgd/>
        </>
    );
}