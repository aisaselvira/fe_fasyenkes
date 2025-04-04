import Head from "next/head";
import HomePage from "@/components/template/user/home-page";

export default function Home() {
    return (
        <>
            <Head>
                <title>Open MRI</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HomePage />
        </>
    );
}
